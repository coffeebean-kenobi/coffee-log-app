# 08. 広告配置最適化とユーザーエクスペリエンス維持

## 概要
Google AdSenseの収益最大化とユーザーエクスペリエンス維持のバランスを図るため、戦略的な広告配置を実装します。月$20目標達成に向けた最適な広告レイアウトを構築します。

## 前提条件
- 06_adsense_foundation.mdの実装が完了していること
- 07_privacy_policy.mdの実装が完了していること

## 実装する機能
1. 効果的な広告配置戦略
2. ページ別広告最適化
3. レスポンシブ広告レイアウト
4. パフォーマンス監視
5. A/Bテスト対応

## 必要なファイル作成・修正

### 1. 広告レイアウト管理フック: `src/hooks/useAdLayout.ts`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useCookieConsent } from './useCookieConsent'

export interface AdPlacement {
  id: string
  type: 'banner' | 'sidebar' | 'inArticle' | 'sticky'
  position: 'top' | 'middle' | 'bottom' | 'sidebar'
  enabled: boolean
  priority: number
}

const defaultPlacements: AdPlacement[] = [
  {
    id: 'header-banner',
    type: 'banner',
    position: 'top',
    enabled: false, // ヘッダーは UX を重視して無効
    priority: 1
  },
  {
    id: 'content-top',
    type: 'banner',
    position: 'top',
    enabled: true,
    priority: 2
  },
  {
    id: 'sidebar-main',
    type: 'sidebar',
    position: 'sidebar',
    enabled: true,
    priority: 3
  },
  {
    id: 'content-middle',
    type: 'inArticle',
    position: 'middle',
    enabled: true,
    priority: 4
  },
  {
    id: 'content-bottom',
    type: 'banner',
    position: 'bottom',
    enabled: true,
    priority: 5
  }
]

export function useAdLayout() {
  const { consent } = useCookieConsent()
  const [placements, setPlacements] = useState<AdPlacement[]>(defaultPlacements)
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    // 広告クッキーの同意があり、本番環境の場合のみ広告を表示
    const shouldShowAds = consent?.advertising && process.env.NODE_ENV === 'production'
    setShowAds(shouldShowAds || false)
  }, [consent])

  const getPlacementById = (id: string) => {
    return placements.find(p => p.id === id)
  }

  const isPlacementEnabled = (id: string) => {
    const placement = getPlacementById(id)
    return showAds && placement?.enabled
  }

  const getPlacementsByPosition = (position: AdPlacement['position']) => {
    return placements
      .filter(p => p.position === position && p.enabled && showAds)
      .sort((a, b) => a.priority - b.priority)
  }

  return {
    placements,
    showAds,
    getPlacementById,
    isPlacementEnabled,
    getPlacementsByPosition
  }
}
```

### 2. 戦略的広告配置コンポーネント: `src/components/ads/StrategicAdPlacement.tsx`
```typescript
'use client'

import { useAdLayout } from '@/hooks/useAdLayout'
import ResponsiveAdBanner from './ResponsiveAdBanner'

interface StrategicAdPlacementProps {
  placementId: string
  className?: string
  fallback?: React.ReactNode
}

export default function StrategicAdPlacement({ 
  placementId, 
  className = '',
  fallback = null 
}: StrategicAdPlacementProps) {
  const { isPlacementEnabled, getPlacementById } = useAdLayout()
  
  if (!isPlacementEnabled(placementId)) {
    return fallback ? <>{fallback}</> : null
  }

  const placement = getPlacementById(placementId)
  if (!placement) return null

  return (
    <div className={`strategic-ad-placement ${className}`} data-placement={placementId}>
      <ResponsiveAdBanner 
        type={placement.type as 'banner' | 'sidebar' | 'inArticle'} 
        className="mb-6"
      />
    </div>
  )
}
```

### 3. コーヒー記録詳細ページ広告統合: `src/app/coffee/[id]/page.tsx`を修正
```typescript
// 既存のコーヒー詳細ページに広告を統合
import StrategicAdPlacement from '@/components/ads/StrategicAdPlacement'

export default function CoffeeDetailPage({ params }: { params: { id: string } }) {
  // 既存のコード...

  return (
    <Container>
      <div className="py-8">
        {/* コンテンツ上部広告 */}
        <StrategicAdPlacement placementId="content-top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* 既存のコーヒー詳細コンテンツ */}
            <CoffeeDetailCard coffee={coffee} />
            
            {/* 中間広告（記事内） */}
            <StrategicAdPlacement 
              placementId="content-middle" 
              className="my-8"
            />
            
            {/* 味覚プロファイル等の詳細情報 */}
            <TasteProfileDisplay />
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* サイドバー広告 */}
              <StrategicAdPlacement 
                placementId="sidebar-main"
                className="mb-6"
              />
              
              {/* 既存のサイドバーコンテンツ */}
              <RelatedCoffees />
            </div>
          </div>
        </div>

        {/* コンテンツ下部広告 */}
        <StrategicAdPlacement placementId="content-bottom" className="mt-8" />
      </div>
    </Container>
  )
}
```

### 4. コーヒー記録一覧ページ広告統合: `src/app/coffee/page.tsx`を修正
```typescript
import StrategicAdPlacement from '@/components/ads/StrategicAdPlacement'
import InFeedAdComponent from '@/components/ads/InFeedAdComponent'

export default function CoffeeListPage() {
  // 既存のコード...

  return (
    <Container>
      <div className="py-8">
        {/* ページトップ広告 */}
        <StrategicAdPlacement placementId="content-top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">コーヒー記録</h1>
            
            {/* フィルターコンポーネント */}
            <CoffeeFilter />
            
            {/* コーヒー記録リスト（広告を間に挟む） */}
            <CoffeeListWithAds records={coffeeRecords} />
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <StrategicAdPlacement 
                placementId="sidebar-main"
                className="mb-6"
              />
            </div>
          </div>
        </div>

        {/* ページ下部広告 */}
        <StrategicAdPlacement placementId="content-bottom" className="mt-8" />
      </div>
    </Container>
  )
}
```

### 5. フィード内広告コンポーネント: `src/components/ads/InFeedAdComponent.tsx`
```typescript
'use client'

import { useMemo } from 'react'
import { useAdLayout } from '@/hooks/useAdLayout'
import ResponsiveAdBanner from './ResponsiveAdBanner'

interface InFeedAdComponentProps {
  itemIndex: number
  totalItems: number
  adInterval?: number
  className?: string
}

export default function InFeedAdComponent({
  itemIndex,
  totalItems,
  adInterval = 5, // 5アイテムごとに広告
  className = ''
}: InFeedAdComponentProps) {
  const { showAds } = useAdLayout()

  const shouldShowAd = useMemo(() => {
    // 広告表示が有効で、指定間隔で広告を表示
    return showAds && 
           itemIndex > 0 && 
           (itemIndex + 1) % adInterval === 0 &&
           itemIndex < totalItems - 1 // 最後のアイテムの後には表示しない
  }, [showAds, itemIndex, totalItems, adInterval])

  if (!shouldShowAd) return null

  return (
    <div className={`in-feed-ad ${className}`}>
      <div className="mb-2">
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          広告
        </span>
      </div>
      <ResponsiveAdBanner type="inArticle" />
    </div>
  )
}
```

### 6. コーヒーリスト with 広告: `src/components/coffee/CoffeeListWithAds.tsx`
```typescript
import { CoffeeRecord } from '@/types/coffee'
import CoffeeCard from './CoffeeCard'
import InFeedAdComponent from '@/components/ads/InFeedAdComponent'

interface CoffeeListWithAdsProps {
  records: CoffeeRecord[]
  className?: string
}

export default function CoffeeListWithAds({ 
  records, 
  className = '' 
}: CoffeeListWithAdsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {records.map((record, index) => (
        <div key={record.id}>
          <CoffeeCard coffee={record} />
          
          {/* フィード内広告 */}
          <InFeedAdComponent 
            itemIndex={index}
            totalItems={records.length}
            adInterval={5}
            className="mt-6"
          />
        </div>
      ))}
    </div>
  )
}
```

### 7. 分析ページ広告統合: `src/app/analytics/AnalyticsDashboard.tsx`を修正
```typescript
// 既存の分析ダッシュボードに広告を追加
import StrategicAdPlacement from '@/components/ads/StrategicAdPlacement'

export default function AnalyticsDashboard() {
  // 既存のコード...

  return (
    <Container>
      <div className="py-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">データ分析</h1>
          <p className="text-muted-foreground">
            あなたのコーヒー体験を数値で振り返り、新しい発見をしましょう
          </p>
        </div>

        {/* トップ広告 */}
        <StrategicAdPlacement placementId="content-top" className="mb-8" />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="xl:col-span-3">
            {/* フィルター */}
            <AnalyticsFilter />
            
            {/* 統計サマリー */}
            <StatsSummary data={analyticsData} loading={loading} />

            {/* 中間広告 */}
            <StrategicAdPlacement 
              placementId="content-middle" 
              className="my-8"
            />

            {/* チャート群 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <TimeSeriesChart />
              <ShopChart />
              <CountryChart />
              <RoastLevelChart />
            </div>
          </div>

          {/* サイドバー */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <StrategicAdPlacement 
                placementId="sidebar-main"
                className="mb-6"
              />
            </div>
          </div>
        </div>

        {/* 下部広告 */}
        <StrategicAdPlacement placementId="content-bottom" className="mt-8" />
      </div>
    </Container>
  )
}
```

### 8. パフォーマンス監視コンポーネント: `src/components/ads/AdPerformanceMonitor.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { adsenseConfig } from '@/config/adsense'

interface AdMetrics {
  impressions: number
  clicks: number
  ctr: number
  rpm: number
  lastUpdated: Date
}

export default function AdPerformanceMonitor() {
  const [metrics, setMetrics] = useState<AdMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 開発環境でのみ表示
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }
  }, [])

  // AdSenseパフォーマンス API（実際の実装では Google AdSense Management API を使用）
  useEffect(() => {
    if (!isVisible) return

    const fetchMetrics = async () => {
      // 実際の実装では AdSense Management API からデータを取得
      // ここではモックデータを使用
      const mockMetrics: AdMetrics = {
        impressions: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 50) + 5,
        ctr: Number((Math.random() * 5 + 1).toFixed(2)),
        rpm: Number((Math.random() * 3 + 0.5).toFixed(2)),
        lastUpdated: new Date()
      }

      setMetrics(mockMetrics)
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // 1分ごとに更新

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg text-sm max-w-xs z-40">
      <h4 className="font-semibold text-card-foreground mb-2">
        📊 広告パフォーマンス（開発用）
      </h4>
      <div className="space-y-1 text-muted-foreground">
        <div>インプレッション: {metrics.impressions.toLocaleString()}</div>
        <div>クリック: {metrics.clicks.toLocaleString()}</div>
        <div>CTR: {metrics.ctr}%</div>
        <div>RPM: ${metrics.rpm}</div>
        <div className="text-xs">
          更新: {metrics.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
```

### 9. レイアウト統合: `src/app/layout.tsx`にパフォーマンス監視を追加
```typescript
import AdPerformanceMonitor from '@/components/ads/AdPerformanceMonitor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAdsScript />
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

### 10. 広告パフォーマンス最適化設定: `src/config/adsense.ts`に追加
```typescript
// 既存の設定に追加

// 広告パフォーマンス設定
export const adPerformanceConfig = {
  // 目標指標
  targets: {
    monthlyRevenue: 20, // $20/月
    minRPM: 1.0, // 最低RPM
    maxCTR: 5.0, // 最大CTR（異常値検知）
    minPageviews: 7000 // 月間最低ページビュー
  },
  
  // A/Bテスト設定
  experiments: {
    enabled: process.env.NODE_ENV === 'production',
    variants: {
      'sidebar-position': ['top', 'middle', 'bottom'],
      'ad-density': ['low', 'medium', 'high'],
      'in-feed-interval': [3, 5, 7]
    }
  },
  
  // 配置最適化
  optimization: {
    autoOptimize: true,
    performanceThreshold: 0.8, // パフォーマンス閾値
    testDuration: 7, // テスト期間（日）
    minSampleSize: 1000 // 最小サンプルサイズ
  }
}

// 収益計算ユーティリティ
export function calculateProjectedRevenue(
  dailyPageviews: number,
  rpm: number,
  days: number = 30
): number {
  return (dailyPageviews * rpm * days) / 1000
}

// 目標達成チェック
export function isRevenueTargetOnTrack(
  currentRevenue: number,
  daysElapsed: number,
  targetMonthlyRevenue: number = 20
): boolean {
  const expectedRevenue = (targetMonthlyRevenue / 30) * daysElapsed
  return currentRevenue >= expectedRevenue * 0.8 // 80%のバッファを許容
}
```

## 実装指示

1. **フックの作成**: `src/hooks/useAdLayout.ts`を作成してください。

2. **広告配置コンポーネントの作成**:
   - `StrategicAdPlacement.tsx`
   - `InFeedAdComponent.tsx` 
   - `CoffeeListWithAds.tsx`
   - `AdPerformanceMonitor.tsx`

3. **既存ページの修正**:
   - コーヒー詳細ページ
   - コーヒー一覧ページ  
   - 分析ダッシュボード

4. **設定ファイルの拡張**: `adsense.ts`にパフォーマンス設定を追加してください。

5. **レイアウト統合**: パフォーマンス監視を全体レイアウトに追加してください。

## 広告配置戦略

### 高パフォーマンス配置ポイント:
1. **コンテンツ上部**: ファーストビューで視認性が高い
2. **サイドバー**: スクロール中も常に表示される  
3. **フィード内**: ユーザーの読み流れに自然に組み込まれる
4. **コンテンツ下部**: 記事読了後の高いエンゲージメント

### UX配慮ポイント:
1. **ヘッダー避け**: ナビゲーション妨害を防ぐ
2. **適切な間隔**: コンテンツ密度とのバランス
3. **レスポンシブ**: モバイルでの視認性確保
4. **読み込み速度**: 広告がサイト速度に与える影響を最小化

## 注意点

- AdSenseポリシーに準拠した配置を維持してください
- ユーザーエクスペリエンスを最優先に考慮してください
- 広告密度が高すぎないよう注意してください
- クリック誘導等の違反行為は絶対に行わないでください

## 次のステップ

この広告配置が完成したら、次のプロンプト（09_revenue_optimization.md）で収益最適化とA/Bテスト機能を実装します。 