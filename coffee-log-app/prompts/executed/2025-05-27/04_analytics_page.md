# 04. 分析ページの作成と統合

## 概要
Coffee Log Appのデータ分析・可視化機能を統合した分析ページを作成し、ナビゲーションに組み込みます。前のプロンプトで作成したすべてのコンポーネントを統合します。

## 前提条件
- 01_analytics_foundation.mdの実装が完了していること
- 02_analytics_charts.mdの実装が完了していること
- 03_analytics_filters.mdの実装が完了していること

## 実装する機能
1. 分析ページのメインレイアウト
2. 全チャートコンポーネントの統合表示
3. フィルター機能の統合
4. エクスポート機能（オプション）
5. ナビゲーションへの分析ページ追加

## 必要なファイル作成・修正

### 1. 分析ページのメインコンポーネント: `src/app/analytics/page.tsx`
```typescript
import { Metadata } from 'next'
import AnalyticsDashboard from './AnalyticsDashboard'

export const metadata: Metadata = {
  title: 'データ分析 | LOGCUP',
  description: 'コーヒー記録のデータ分析・可視化ページ',
}

export default function AnalyticsPage() {
  return <AnalyticsDashboard />
}
```

### 2. 分析ダッシュボードコンポーネント: `src/app/analytics/AnalyticsDashboard.tsx`
```typescript
'use client'

import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters'
import AnalyticsFilter from '@/components/analytics/AnalyticsFilter'
import FilterStats from '@/components/analytics/FilterStats'
import StatsSummary from '@/components/analytics/StatsSummary'
import TimeSeriesChart from '@/components/analytics/TimeSeriesChart'
import ShopChart from '@/components/analytics/ShopChart'
import CountryChart from '@/components/analytics/CountryChart'
import RoastLevelChart from '@/components/analytics/RoastLevelChart'
import TasteProfileChart from '@/components/analytics/TasteProfileChart'
import Container from '@/components/Container'

export default function AnalyticsDashboard() {
  const { filters, updateFilters } = useAnalyticsFilters()
  const { analyticsData, records, loading, error } = useAnalyticsData(filters)

  if (error) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-destructive mb-4">エラーが発生しました</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              再読み込み
            </button>
          </div>
        </div>
      </Container>
    )
  }

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

        {/* フィルター */}
        <AnalyticsFilter 
          onFilterChange={updateFilters}
          initialFilters={filters}
        />

        {/* フィルター統計 */}
        <FilterStats 
          filters={filters}
          totalRecords={records.length}
          filteredRecords={analyticsData.totalRecords}
        />

        {/* データが存在しない場合 */}
        {!loading && analyticsData.totalRecords === 0 && (
          <div className="bg-card p-12 rounded-lg shadow-sm border border-border text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              {records.length === 0 ? 'まだコーヒー記録がありません' : '条件に一致する記録がありません'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {records.length === 0 
                ? 'コーヒーを記録して、データ分析を始めましょう！'
                : 'フィルター条件を変更して再度お試しください。'
              }
            </p>
            {records.length === 0 && (
              <a 
                href="/coffee/add"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                初回コーヒー記録を作成する
              </a>
            )}
          </div>
        )}

        {/* 分析結果表示 */}
        {analyticsData.totalRecords > 0 && (
          <div className="space-y-8">
            {/* 統計サマリー */}
            <StatsSummary data={analyticsData} loading={loading} />

            {/* メインチャート群 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* 時系列チャート */}
              <div className="xl:col-span-2">
                <TimeSeriesChart data={analyticsData.timeSeriesData} loading={loading} />
              </div>

              {/* ショップ分析 */}
              <ShopChart data={analyticsData.shopData} loading={loading} />

              {/* 原産国分析 */}
              <CountryChart data={analyticsData.countryData} loading={loading} />

              {/* 焙煎度分析 */}
              <RoastLevelChart data={analyticsData.roastLevelData} loading={loading} />

              {/* 味覚プロファイル分析 */}
              <TasteProfileChart data={analyticsData.tasteProfile} loading={loading} />
            </div>

            {/* 詳細データセクション */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">詳細データ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-card-foreground mb-2">ショップ別統計</h3>
                  <div className="space-y-2">
                    {analyticsData.shopData.slice(0, 5).map((shop, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate">{shop.shopName}</span>
                        <span className="text-card-foreground">{shop.count}杯</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-card-foreground mb-2">原産国別統計</h3>
                  <div className="space-y-2">
                    {analyticsData.countryData.slice(0, 5).map((country, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate">{country.country}</span>
                        <span className="text-card-foreground">{country.count}杯</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-card-foreground mb-2">焙煎度別統計</h3>
                  <div className="space-y-2">
                    {analyticsData.roastLevelData.map((roast, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate">{roast.roastLevel}</span>
                        <span className="text-card-foreground">{roast.count}杯</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
```

### 3. 味覚プロファイルチャートコンポーネント: `src/components/analytics/TasteProfileChart.tsx`
```typescript
'use client'

import { Radar } from 'react-chartjs-2'
import { TasteProfile } from '@/types/analytics'
import { chartColors, darkChartColors, getRadarOptions } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'

interface Props {
  data: TasteProfile
  loading?: boolean
}

const TASTE_LABELS = {
  acidity: '酸味',
  flavor: '風味',
  sweetness: '甘味',
  mouthfeel: '口当たり',
  body: 'ボディ',
  clean_cup: 'クリーンカップ',
  balance: 'バランス'
}

export default function TasteProfileChart({ data, loading }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const colors = isDark ? darkChartColors : chartColors

  if (loading) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <div className="h-4 bg-muted rounded mb-4"></div>
        <div className="h-64 bg-muted rounded animate-pulse"></div>
      </div>
    )
  }

  const chartData = {
    labels: Object.values(TASTE_LABELS),
    datasets: [
      {
        label: '平均評価',
        data: [
          data.acidity,
          data.flavor,
          data.sweetness,
          data.mouthfeel,
          data.body,
          data.clean_cup,
          data.balance
        ],
        backgroundColor: colors.background,
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.primary,
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  }

  const options = getRadarOptions(isDark)

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">味覚プロファイル分析</h3>
      <div className="h-64">
        <Radar data={chartData} options={options} />
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        あなたが好むコーヒーの傾向を表示しています
      </div>
    </div>
  )
}
```

### 4. ナビゲーション修正: 既存の `src/components/layout/Header.tsx` を修正
```typescript
// 既存のHeaderコンポーネントのナビゲーション部分に追加
// NavLinksコンポーネント内に以下を追加：

<NavLink href="/analytics" icon="📊">
  分析
</NavLink>
```

### 5. ナビゲーションリンクコンポーネント: `src/components/layout/NavLink.tsx`（新規作成）
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  href: string
  icon?: string
  children: ReactNode
  className?: string
}

export default function NavLink({ href, icon, children, className = '' }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }
        ${className}
      `}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </Link>
  )
}
```

### 6. エクスポート機能コンポーネント: `src/components/analytics/ExportButton.tsx`（オプション）
```typescript
'use client'

import { AnalyticsData } from '@/types/analytics'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Props {
  data: AnalyticsData
  disabled?: boolean
}

export default function ExportButton({ data, disabled }: Props) {
  const handleExport = () => {
    const csvData = generateCSV(data)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `coffee-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const generateCSV = (data: AnalyticsData): string => {
    const headers = ['項目', '値']
    const rows = [
      ['総記録数', `${data.totalRecords}`],
      ['平均評価', `${data.averageRating}`],
      ['お気に入り店舗', data.favoriteShop || ''],
      ['主要原産国', data.mostCommonCountry || ''],
      ['主要焙煎度', data.mostCommonRoastLevel || ''],
      ['', ''],
      ['味覚プロファイル', ''],
      ['酸味', `${data.tasteProfile.acidity}`],
      ['風味', `${data.tasteProfile.flavor}`],
      ['甘味', `${data.tasteProfile.sweetness}`],
      ['口当たり', `${data.tasteProfile.mouthfeel}`],
      ['ボディ', `${data.tasteProfile.body}`],
      ['クリーンカップ', `${data.tasteProfile.clean_cup}`],
      ['バランス', `${data.tasteProfile.balance}`]
    ]

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
  }

  return (
    <button
      onClick={handleExport}
      disabled={disabled || data.totalRecords === 0}
      className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      📊 CSVエクスポート
    </button>
  )
}
```

## 実装指示

1. **分析ページディレクトリの作成**: `src/app/analytics/`ディレクトリを作成してください。

2. **分析ページの作成**: `src/app/analytics/page.tsx`と`src/app/analytics/AnalyticsDashboard.tsx`を作成してください。

3. **味覚プロファイルチャートの作成**: `src/components/analytics/TasteProfileChart.tsx`を作成してください。

4. **ナビゲーションリンクコンポーネントの作成**: `src/components/layout/NavLink.tsx`を作成してください。

5. **エクスポート機能の作成**（オプション）: `src/components/analytics/ExportButton.tsx`を作成してください。

6. **既存ナビゲーションの修正**: 分析ページへのリンクを既存のヘッダーナビゲーションに追加してください。

## 注意点

- 全てのチャートコンポーネントが正しくインポートされていることを確認すること
- エラーハンドリングを適切に実装すること
- ローディング状態を適切に表示すること
- レスポンシブデザインに対応すること
- データが存在しない場合の表示を適切に処理すること
- 既存のテーマシステムとの整合性を保つこと

## 完成後の確認事項

1. `/analytics`ページにアクセスできること
2. 全てのチャートが正常に表示されること
3. フィルター機能が正常に動作すること
4. ナビゲーションが正しく動作すること
5. エラーハンドリングが適切に動作すること
6. ローディング状態が適切に表示されること

## 次のステップ

このプロンプトが完了すると、Coffee Log Appのデータ分析・可視化機能が完全に実装されます。ユーザーは「振り返る・発見する」機能を使用して、自分のコーヒー体験を深く分析できるようになります。 