# 09. 収益最適化とA/Bテスト機能の実装

## 概要
Google AdSenseの収益を月$20達成に向けて最適化するため、A/Bテスト機能、Google Analytics連携、収益ダッシュボードを実装します。データドリブンな収益改善を実現します。

## 前提条件
- 06_adsense_foundation.mdの実装が完了していること
- 07_privacy_policy.mdの実装が完了していること
- 08_ad_placement.mdの実装が完了していること

## 実装する機能
1. A/Bテストフレームワーク
2. Google Analytics 4連携
3. 収益パフォーマンス追跡
4. 自動最適化アルゴリズム
5. 管理者向け収益ダッシュボード

## 必要なファイル作成

### 1. A/Bテスト管理フック: `src/hooks/useABTest.ts`
```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ABTestVariant {
  id: string
  name: string
  weight: number // 配分比率（0-1）
  config: Record<string, any>
}

export interface ABTest {
  id: string
  name: string
  description: string
  variants: ABTestVariant[]
  isActive: boolean
  startDate: Date
  endDate?: Date
  targetMetric: string
}

interface ABTestResult {
  variantId: string
  impressions: number
  clicks: number
  revenue: number
  ctr: number
  rpm: number
}

const STORAGE_KEY = 'coffee-log-ab-tests'
const USER_VARIANT_KEY = 'coffee-log-user-variants'

// デフォルトA/Bテスト設定
const defaultTests: ABTest[] = [
  {
    id: 'ad-density-test',
    name: '広告密度最適化',
    description: 'フィード内広告の配置間隔を最適化',
    variants: [
      { id: 'low', name: '低密度（7間隔）', weight: 0.33, config: { adInterval: 7 } },
      { id: 'medium', name: '中密度（5間隔）', weight: 0.34, config: { adInterval: 5 } },
      { id: 'high', name: '高密度（3間隔）', weight: 0.33, config: { adInterval: 3 } }
    ],
    isActive: true,
    startDate: new Date(),
    targetMetric: 'rpm'
  },
  {
    id: 'sidebar-position-test',
    name: 'サイドバー広告位置',
    description: 'サイドバー広告の最適な位置を検証',
    variants: [
      { id: 'top', name: '上部配置', weight: 0.5, config: { sidebarPosition: 'top' } },
      { id: 'middle', name: '中央配置', weight: 0.5, config: { sidebarPosition: 'middle' } }
    ],
    isActive: true,
    startDate: new Date(),
    targetMetric: 'clicks'
  }
]

export function useABTest() {
  const [tests, setTests] = useState<ABTest[]>(defaultTests)
  const [userVariants, setUserVariants] = useState<Record<string, string>>({})
  const [isInitialized, setIsInitialized] = useState(false)

  // ユーザーバリアント情報の読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedVariants = localStorage.getItem(USER_VARIANT_KEY)
      if (savedVariants) {
        setUserVariants(JSON.parse(savedVariants))
      }
    } catch (error) {
      console.warn('A/Bテストバリアント読み込みエラー:', error)
    }

    setIsInitialized(true)
  }, [])

  // ユーザーバリアント情報の保存
  const saveUserVariants = useCallback((variants: Record<string, string>) => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(USER_VARIANT_KEY, JSON.stringify(variants))
      setUserVariants(variants)
    } catch (error) {
      console.error('A/Bテストバリアント保存エラー:', error)
    }
  }, [])

  // テストのバリアント割り当て
  const assignVariant = useCallback((testId: string): string => {
    // 既に割り当て済みの場合は既存のバリアントを返す
    if (userVariants[testId]) {
      return userVariants[testId]
    }

    const test = tests.find(t => t.id === testId && t.isActive)
    if (!test) {
      return 'control'
    }

    // 重み付きランダム選択
    const random = Math.random()
    let cumulativeWeight = 0

    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        const newVariants = { ...userVariants, [testId]: variant.id }
        saveUserVariants(newVariants)
        return variant.id
      }
    }

    // フォールバック
    const firstVariant = test.variants[0]?.id || 'control'
    const newVariants = { ...userVariants, [testId]: firstVariant }
    saveUserVariants(newVariants)
    return firstVariant
  }, [tests, userVariants, saveUserVariants])

  // バリアント設定の取得
  const getVariantConfig = useCallback((testId: string): Record<string, any> => {
    const variantId = assignVariant(testId)
    const test = tests.find(t => t.id === testId)
    const variant = test?.variants.find(v => v.id === variantId)
    
    return variant?.config || {}
  }, [tests, assignVariant])

  // テスト結果の記録
  const recordEvent = useCallback((testId: string, event: string, value?: number) => {
    if (!isInitialized) return

    const variantId = userVariants[testId]
    if (!variantId) return

    // Google Analytics 4にイベント送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_event', {
        test_id: testId,
        variant_id: variantId,
        event_type: event,
        value: value || 1,
        custom_parameter_1: 'coffee_log_ab_test'
      })
    }

    // 独自の分析システムがある場合はここで記録
    console.log(`A/Bテストイベント: ${testId}/${variantId}/${event}`, value)
  }, [userVariants, isInitialized])

  return {
    tests,
    userVariants,
    isInitialized,
    assignVariant,
    getVariantConfig,
    recordEvent
  }
}
```

### 2. Google Analytics 4統合: `src/components/analytics/GoogleAnalytics.tsx`
```typescript
'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

    // 同意設定に基づいてGoogleタグを初期化
    window.gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted'
    })

    // 同意があれば許可状態に更新
    if (consent) {
      window.gtag('consent', 'update', {
        'ad_storage': consent.advertising ? 'granted' : 'denied',
        'ad_user_data': consent.advertising ? 'granted' : 'denied',
        'ad_personalization': consent.advertising ? 'granted' : 'denied',
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'functionality_storage': consent.preferences ? 'granted' : 'denied',
        'personalization_storage': consent.preferences ? 'granted' : 'denied'
      })
    }
  }, [consent])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              custom_map: {
                'custom_parameter_1': 'experiment_name'
              }
            });
          `
        }}
      />
    </>
  )
}
```

### 3. 収益追跡フック: `src/hooks/useRevenueTracking.ts`
```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useABTest } from './useABTest'

export interface RevenueMetrics {
  impressions: number
  clicks: number
  revenue: number
  ctr: number
  rpm: number
  period: 'today' | 'week' | 'month' | 'total'
  lastUpdated: Date
}

interface DailyRevenue {
  date: string
  impressions: number
  clicks: number
  revenue: number
}

export function useRevenueTracking() {
  const [metrics, setMetrics] = useState<RevenueMetrics[]>([])
  const [dailyData, setDailyData] = useState<DailyRevenue[]>([])
  const [loading, setLoading] = useState(true)
  const [targetProgress, setTargetProgress] = useState<{
    current: number
    target: number
    percentage: number
    onTrack: boolean
  }>({ current: 0, target: 20, percentage: 0, onTrack: false })

  const { recordEvent } = useABTest()

  // 収益データの取得（実際の実装ではAdSense APIを使用）
  const fetchRevenueData = useCallback(async () => {
    setLoading(true)
    
    try {
      // モックデータ（実際の実装ではAdSense Management APIを使用）
      const mockDailyData: DailyRevenue[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        
        return {
          date: date.toISOString().split('T')[0],
          impressions: Math.floor(Math.random() * 500) + 100,
          clicks: Math.floor(Math.random() * 25) + 5,
          revenue: Number((Math.random() * 2 + 0.5).toFixed(2))
        }
      })

      // 期間別メトリクス計算
      const calculateMetrics = (data: DailyRevenue[], days: number): RevenueMetrics => {
        const filtered = data.slice(-days)
        const totals = filtered.reduce(
          (acc, day) => ({
            impressions: acc.impressions + day.impressions,
            clicks: acc.clicks + day.clicks,
            revenue: acc.revenue + day.revenue
          }),
          { impressions: 0, clicks: 0, revenue: 0 }
        )

        return {
          ...totals,
          ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
          rpm: totals.impressions > 0 ? (totals.revenue / totals.impressions) * 1000 : 0,
          period: days === 1 ? 'today' : days === 7 ? 'week' : days === 30 ? 'month' : 'total',
          lastUpdated: new Date()
        }
      }

      const metricsData = [
        calculateMetrics(mockDailyData, 1),
        calculateMetrics(mockDailyData, 7),
        calculateMetrics(mockDailyData, 30),
        calculateMetrics(mockDailyData, mockDailyData.length)
      ]

      setDailyData(mockDailyData)
      setMetrics(metricsData)

      // 月間目標進捗計算
      const monthlyRevenue = metricsData.find(m => m.period === 'month')?.revenue || 0
      const targetRevenue = 20
      const percentage = (monthlyRevenue / targetRevenue) * 100
      const daysInMonth = new Date().getDate()
      const expectedRevenue = (targetRevenue / 30) * daysInMonth
      const onTrack = monthlyRevenue >= expectedRevenue * 0.8

      setTargetProgress({
        current: monthlyRevenue,
        target: targetRevenue,
        percentage: Math.min(percentage, 100),
        onTrack
      })

    } catch (error) {
      console.error('収益データ取得エラー:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 広告クリックの記録
  const trackAdClick = useCallback((adUnit: string, testId?: string) => {
    // Google Analytics イベント送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        ad_unit: adUnit,
        value: 1
      })
    }

    // A/Bテストイベント記録
    if (testId) {
      recordEvent(testId, 'ad_click')
    }
  }, [recordEvent])

  // 広告インプレッションの記録
  const trackAdImpression = useCallback((adUnit: string, testId?: string) => {
    // Google Analytics イベント送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_unit: adUnit,
        value: 1
      })
    }

    // A/Bテストイベント記録
    if (testId) {
      recordEvent(testId, 'ad_impression')
    }
  }, [recordEvent])

  useEffect(() => {
    fetchRevenueData()
    
    // 定期的にデータを更新（本番環境では1時間ごと）
    const interval = setInterval(fetchRevenueData, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRevenueData])

  return {
    metrics,
    dailyData,
    loading,
    targetProgress,
    trackAdClick,
    trackAdImpression,
    refreshData: fetchRevenueData
  }
}
```

### 4. 収益ダッシュボードコンポーネント: `src/components/ads/RevenueDashboard.tsx`
```typescript
'use client'

import { useRevenueTracking } from '@/hooks/useRevenueTracking'
import { useABTest } from '@/hooks/useABTest'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, DollarSign, Eye, MousePointer, BarChart3 } from 'lucide-react'

export default function RevenueDashboard() {
  const { metrics, loading, targetProgress, dailyData } = useRevenueTracking()
  const { tests, userVariants } = useABTest()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const monthlyMetrics = metrics.find(m => m.period === 'month')
  const weeklyMetrics = metrics.find(m => m.period === 'week')
  const todayMetrics = metrics.find(m => m.period === 'today')

  return (
    <div className="space-y-6">
      {/* 目標達成進捗 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            月間収益目標進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                現在の月間収益
              </span>
              <span className="text-2xl font-bold">
                ${targetProgress.current.toFixed(2)}
              </span>
            </div>
            
            <Progress 
              value={targetProgress.percentage} 
              className="h-3"
            />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                目標: ${targetProgress.target.toFixed(2)}
              </span>
              <span className={`flex items-center gap-1 ${
                targetProgress.onTrack ? 'text-green-600' : 'text-orange-600'
              }`}>
                {targetProgress.onTrack ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {targetProgress.percentage.toFixed(1)}%
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {targetProgress.onTrack 
                ? '順調に目標に向かっています！' 
                : '目標達成にはさらなる最適化が必要です。'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* メトリクスカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              月間インプレッション
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyMetrics?.impressions.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              今週: {weeklyMetrics?.impressions.toLocaleString() || '0'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              月間クリック
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyMetrics?.clicks.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              今週: {weeklyMetrics?.clicks.toLocaleString() || '0'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyMetrics?.ctr.toFixed(2) || '0.00'}%
            </div>
            <p className="text-xs text-muted-foreground">
              今週: {weeklyMetrics?.ctr.toFixed(2) || '0.00'}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${monthlyMetrics?.rpm.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              今週: ${weeklyMetrics?.rpm.toFixed(2) || '0.00'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* A/Bテスト状況 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            実行中のA/Bテスト
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tests.filter(test => test.isActive).map(test => (
              <div key={test.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{test.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    あなたのバリアント: {userVariants[test.id] || '未割り当て'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {test.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {test.variants.map(variant => (
                    <div 
                      key={variant.id} 
                      className={`p-2 border rounded text-sm ${
                        userVariants[test.id] === variant.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-muted-foreground">
                        配分: {(variant.weight * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 収益推移グラフ */}
      <Card>
        <CardHeader>
          <CardTitle>日別収益推移（過去30日）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-1">
            {dailyData.slice(-14).map((day, index) => (
              <div key={day.date} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-primary rounded-t w-full min-h-[2px]"
                  style={{ 
                    height: `${Math.max((day.revenue / 3) * 200, 2)}px` 
                  }}
                  title={`${day.date}: $${day.revenue.toFixed(2)}`}
                />
                <span className="text-xs text-muted-foreground mt-1">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            直近14日間の日別収益（$）
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 5. 拡張された広告バナーコンポーネント: `src/components/ads/AdBanner.tsx`を修正
```typescript
// 既存のAdBannerコンポーネントに追加
import { useRevenueTracking } from '@/hooks/useRevenueTracking'
import { useABTest } from '@/hooks/useABTest'

export default function AdBanner({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adSize,
  className = '',
  fullWidthResponsive = true,
  testId // 新しいprop
}: AdBannerProps & { testId?: string }) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { trackAdImpression, trackAdClick } = useRevenueTracking()
  const { getVariantConfig } = useABTest()

  // A/Bテスト設定の適用
  const testConfig = testId ? getVariantConfig(testId) : {}

  useEffect(() => {
    // 既存のAdSense読み込みロジック...

    // インプレッション追跡
    if (isLoaded) {
      trackAdImpression(adSlot, testId)
    }
  }, [adSlot, isLoaded, trackAdImpression, testId])

  // クリック追跡
  const handleAdClick = useCallback(() => {
    trackAdClick(adSlot, testId)
  }, [adSlot, trackAdClick, testId])

  // 既存のコンポーネントロジック...
  
  return (
    <div 
      className={`ad-container ${className}`}
      style={{ 
        textAlign: 'center',
        margin: '1rem 0',
        minHeight: adSize?.height || 'auto'
      }}
      onClick={handleAdClick}
    >
      {/* 既存の広告表示ロジック... */}
    </div>
  )
}
```

### 6. 管理者ページ: `src/app/admin/revenue/page.tsx`
```typescript
import { Metadata } from 'next'
import Container from '@/components/Container'
import RevenueDashboard from '@/components/ads/RevenueDashboard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '収益管理 | LOGCUP Admin',
  description: 'AdSense収益とA/Bテストの管理画面',
}

// 本番環境では認証チェックを追加
export default function RevenueManagementPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            収益管理ダッシュボード
          </h1>
          <p className="text-muted-foreground">
            AdSense収益の最適化とA/Bテストの管理を行います
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <RevenueDashboard />
        </Suspense>
      </div>
    </Container>
  )
}
```

### 7. レイアウト統合: `src/app/layout.tsx`にGoogleAnalyticsを追加
```typescript
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAdsScript />
        <GoogleAnalytics />
      </head>
      <body>
        {children}
        <CookieConsentBanner />
        <AdPerformanceMonitor />
      </body>
    </html>
  )
}
```

### 8. 環境変数設定: `.env.local`に追加
```bash
# Google Analytics 4
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# 管理者機能（本番環境では適切な認証を実装）
ADMIN_PASSWORD=secure_admin_password_here
```

## 実装指示

1. **フックの作成**:
   - `src/hooks/useABTest.ts`を作成
   - `src/hooks/useRevenueTracking.ts`を作成

2. **コンポーネントの作成**:
   - `src/components/analytics/GoogleAnalytics.tsx`を作成
   - `src/components/ads/RevenueDashboard.tsx`を作成

3. **管理者ページの作成**:
   - `src/app/admin/revenue/page.tsx`を作成

4. **既存コンポーネントの修正**:
   - `AdBanner.tsx`に追跡機能を追加

5. **環境変数の設定**: Google Analytics IDを`.env.local`に追加

6. **レイアウト統合**: GoogleAnalyticsコンポーネントを追加

## A/Bテスト戦略

### テスト項目:
1. **広告密度**: フィード内広告の配置間隔（3/5/7アイテムごと）
2. **サイドバー位置**: 上部/中央配置
3. **バナーサイズ**: デスクトップでの最適サイズ
4. **コンテンツ配置**: 記事上部/下部の効果比較

### 成功指標:
- **RPM（Revenue Per Mille）**: 1000インプレッションあたりの収益
- **CTR（Click Through Rate）**: クリック率
- **ユーザー滞在時間**: UXへの影響測定
- **離脱率**: 広告密度による影響確認

## 注意点

- A/Bテストは統計的有意性を確保するため最低1週間実施
- 複数テストの同時実行時は相互影響を考慮
- Google Analytics連携は適切な同意管理が必要
- 管理者ページは本番環境では認証必須
- AdSenseポリシー遵守を最優先に考慮

## 次のステップ

この収益最適化機能が完成したら、次のプロンプト（10_final_setup.md）で最終設定とドキュメント更新を行います。 