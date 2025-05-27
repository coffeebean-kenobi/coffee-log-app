# 02. データ可視化チャートコンポーネントの実装

## 概要
Coffee Log AppでChart.jsとreact-chartjs-2を使用して、データ分析結果を視覚化するチャートコンポーネントを実装します。

## 前提条件
- 01_analytics_foundation.mdの実装が完了していること
- chart.js と react-chartjs-2 パッケージがインストール済み（package.jsonで確認済み）

## 実装する機能
1. 統計サマリーカード
2. 時系列グラフ（コーヒー消費量・評価推移）
3. ショップ別分析チャート
4. 原産国別分析チャート
5. 焙煎度別分析チャート
6. 味覚プロファイル比較チャート

## 必要なファイル作成

### 1. Chart.js設定ファイル: `src/utils/chartConfig.ts`
```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Chart.js コンポーネントの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

// テーマに対応したカラーパレット
export const chartColors = {
  primary: '#D4AF37',
  secondary: '#C0C0C0',
  accent: '#B8860B',
  background: 'rgba(212, 175, 55, 0.1)',
  border: 'rgba(212, 175, 55, 0.5)',
  text: '#1F2937',
  grid: 'rgba(128, 128, 128, 0.2)'
}

export const darkChartColors = {
  primary: '#D4AF37',
  secondary: '#C0C0C0',
  accent: '#F4E4BC',
  background: 'rgba(212, 175, 55, 0.2)',
  border: 'rgba(212, 175, 55, 0.6)',
  text: '#F9FAFB',
  grid: 'rgba(156, 163, 175, 0.3)'
}

// カラーパレット配列（複数データ用）
export const multiColorPalette = [
  '#D4AF37', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
  '#B8860B', // Dark Goldenrod
  '#DAA520', // Goldenrod
  '#FFD700', // Gold
  '#F0E68C', // Khaki
  '#BDB76B', // Dark Khaki
  '#808000', // Olive
  '#9ACD32'  // Yellow Green
]

export const getChartOptions = (isDark: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      titleColor: isDark ? darkChartColors.text : chartColors.text,
      bodyColor: isDark ? darkChartColors.text : chartColors.text,
      borderColor: isDark ? darkChartColors.border : chartColors.border,
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      }
    },
    y: {
      ticks: {
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      }
    }
  }
})

export const getRadarOptions = (isDark: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      titleColor: isDark ? darkChartColors.text : chartColors.text,
      bodyColor: isDark ? darkChartColors.text : chartColors.text,
      borderColor: isDark ? darkChartColors.border : chartColors.border,
      borderWidth: 1
    }
  },
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      },
      angleLines: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      },
      pointLabels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        }
      }
    }
  }
})
```

### 2. 統計サマリーコンポーネント: `src/components/analytics/StatsSummary.tsx`
```typescript
'use client'

import { AnalyticsData } from '@/types/analytics'
import { ROAST_LEVEL_LABELS } from '@/utils/analytics'

interface Props {
  data: AnalyticsData
  loading?: boolean
}

export default function StatsSummary({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card p-4 rounded-lg animate-pulse">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const stats = [
    {
      label: '総記録数',
      value: `${data.totalRecords}杯`,
      icon: '☕'
    },
    {
      label: '平均評価',
      value: `${data.averageRating}点`,
      icon: '⭐'
    },
    {
      label: 'お気に入り店舗',
      value: data.favoriteShop || '未記録',
      icon: '🏪'
    },
    {
      label: '主要原産国',
      value: data.mostCommonCountry || '未記録',
      icon: '🌍'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card p-4 rounded-lg shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{stat.icon}</span>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </div>
          <p className="text-2xl font-bold text-card-foreground truncate">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. 時系列チャートコンポーネント: `src/components/analytics/TimeSeriesChart.tsx`
```typescript
'use client'

import { Line } from 'react-chartjs-2'
import { TimeSeriesEntry } from '@/types/analytics'
import { chartColors, darkChartColors, getChartOptions } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Props {
  data: TimeSeriesEntry[]
  loading?: boolean
}

export default function TimeSeriesChart({ data, loading }: Props) {
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

  if (!data.length) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">コーヒー消費履歴</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          データがありません
        </div>
      </div>
    )
  }

  const chartData = {
    labels: data.map(entry => format(parseISO(entry.date), 'M/d', { locale: ja })),
    datasets: [
      {
        label: '消費量（杯）',
        data: data.map(entry => entry.count),
        borderColor: colors.primary,
        backgroundColor: colors.background,
        tension: 0.4,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: '平均評価',
        data: data.map(entry => entry.averageRating),
        borderColor: colors.secondary,
        backgroundColor: 'rgba(192, 192, 192, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    ...getChartOptions(isDark),
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    scales: {
      x: {
        ...getChartOptions(isDark).scales.x,
        title: {
          display: true,
          text: '日付',
          color: colors.text
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '消費量（杯）',
          color: colors.text
        },
        ticks: {
          color: colors.text,
          stepSize: 1
        },
        grid: {
          color: colors.grid
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '平均評価',
          color: colors.text
        },
        min: 0,
        max: 5,
        ticks: {
          color: colors.text,
          stepSize: 1
        },
        grid: {
          drawOnChartArea: false,
          color: colors.grid
        }
      }
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">コーヒー消費履歴</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
```

### 4. ショップ別分析チャート: `src/components/analytics/ShopChart.tsx`
```typescript
'use client'

import { Bar } from 'react-chartjs-2'
import { ShopAnalytics } from '@/types/analytics'
import { chartColors, darkChartColors, getChartOptions, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'

interface Props {
  data: ShopAnalytics[]
  loading?: boolean
}

export default function ShopChart({ data, loading }: Props) {
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

  if (!data.length) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">ショップ別分析</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          データがありません
        </div>
      </div>
    )
  }

  // 上位10店舗のみ表示
  const topShops = data.slice(0, 10)

  const chartData = {
    labels: topShops.map(shop => shop.shopName),
    datasets: [
      {
        label: '消費回数',
        data: topShops.map(shop => shop.count),
        backgroundColor: multiColorPalette.slice(0, topShops.length),
        borderColor: multiColorPalette.slice(0, topShops.length),
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        label: '平均評価',
        data: topShops.map(shop => shop.averageRating),
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        borderWidth: 1,
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    ...getChartOptions(isDark),
    plugins: {
      ...getChartOptions(isDark).plugins,
      tooltip: {
        ...getChartOptions(isDark).plugins.tooltip,
        callbacks: {
          afterBody: (context: any) => {
            const dataIndex = context[0].dataIndex
            const shop = topShops[dataIndex]
            return shop.favoriteRoastLevel ? [`お気に入り焙煎度: ${shop.favoriteRoastLevel}`] : []
          }
        }
      }
    },
    scales: {
      x: {
        ...getChartOptions(isDark).scales.x,
        title: {
          display: true,
          text: 'ショップ名',
          color: colors.text
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '消費回数',
          color: colors.text
        },
        ticks: {
          color: colors.text,
          stepSize: 1
        },
        grid: {
          color: colors.grid
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '平均評価',
          color: colors.text
        },
        min: 0,
        max: 5,
        ticks: {
          color: colors.text,
          stepSize: 1
        },
        grid: {
          drawOnChartArea: false,
          color: colors.grid
        }
      }
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">ショップ別分析（上位10店舗）</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
```

### 5. 原産国別分析チャート: `src/components/analytics/CountryChart.tsx`
```typescript
'use client'

import { Doughnut } from 'react-chartjs-2'
import { CountryAnalytics } from '@/types/analytics'
import { chartColors, darkChartColors, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'

interface Props {
  data: CountryAnalytics[]
  loading?: boolean
}

export default function CountryChart({ data, loading }: Props) {
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

  if (!data.length) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">原産国別分析</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          データがありません
        </div>
      </div>
    )
  }

  const chartData = {
    labels: data.map(country => country.country),
    datasets: [
      {
        data: data.map(country => country.count),
        backgroundColor: multiColorPalette.slice(0, data.length),
        borderColor: multiColorPalette.slice(0, data.length),
        borderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: colors.text,
          font: {
            family: 'Inter, system-ui, sans-serif'
          },
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets
            return chart.data.labels.map((label: string, i: number) => ({
              text: `${label} (${datasets[0].data[i]}杯)`,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].borderColor[i],
              lineWidth: datasets[0].borderWidth,
              index: i
            }))
          }
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#FFFFFF',
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.border,
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const country = data[context.dataIndex]
            return [
              `${context.label}: ${context.parsed}杯`,
              `平均評価: ${country.averageRating}点`
            ]
          }
        }
      }
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">原産国別分析</h3>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}
```

### 6. 焙煎度別分析チャート: `src/components/analytics/RoastLevelChart.tsx`
```typescript
'use client'

import { Bar } from 'react-chartjs-2'
import { RoastLevelAnalytics } from '@/types/analytics'
import { ROAST_LEVEL_LABELS } from '@/utils/analytics'
import { chartColors, darkChartColors, getChartOptions, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'

interface Props {
  data: RoastLevelAnalytics[]
  loading?: boolean
}

export default function RoastLevelChart({ data, loading }: Props) {
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

  if (!data.length) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">焙煎度別分析</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          データがありません
        </div>
      </div>
    )
  }

  const chartData = {
    labels: data.map(item => ROAST_LEVEL_LABELS[item.roastLevel as keyof typeof ROAST_LEVEL_LABELS] || item.roastLevel),
    datasets: [
      {
        label: '消費回数',
        data: data.map(item => item.count),
        backgroundColor: [
          '#F4E4BC', // Light
          '#D4AF37', // Medium
          '#B8860B', // Medium-Dark
          '#8B4513'  // Dark
        ].slice(0, data.length),
        borderColor: [
          '#F4E4BC',
          '#D4AF37',
          '#B8860B',
          '#8B4513'
        ].slice(0, data.length),
        borderWidth: 1
      }
    ]
  }

  const options = {
    ...getChartOptions(isDark),
    plugins: {
      ...getChartOptions(isDark).plugins,
      tooltip: {
        ...getChartOptions(isDark).plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const item = data[context.dataIndex]
            return [
              `${context.label}: ${context.parsed.y}杯`,
              `平均評価: ${item.averageRating}点`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        ...getChartOptions(isDark).scales.x,
        title: {
          display: true,
          text: '焙煎度',
          color: colors.text
        }
      },
      y: {
        ...getChartOptions(isDark).scales.y,
        title: {
          display: true,
          text: '消費回数',
          color: colors.text
        },
        ticks: {
          ...getChartOptions(isDark).scales.y.ticks,
          stepSize: 1
        }
      }
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">焙煎度別分析</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
```

## 実装指示

1. **Chart.js設定ファイルの作成**: `src/utils/chartConfig.ts`を作成し、Chart.jsの初期設定とテーマ対応を実装してください。

2. **統計サマリーコンポーネントの作成**: `src/components/analytics/StatsSummary.tsx`を作成してください。

3. **時系列チャートの作成**: `src/components/analytics/TimeSeriesChart.tsx`を作成してください。

4. **ショップ別分析チャートの作成**: `src/components/analytics/ShopChart.tsx`を作成してください。

5. **原産国別分析チャートの作成**: `src/components/analytics/CountryChart.tsx`を作成してください。

6. **焙煎度別分析チャートの作成**: `src/components/analytics/RoastLevelChart.tsx`を作成してください。

7. **componentディレクトリにanalyticsフォルダを作成**: `src/components/analytics/`ディレクトリを作成してください。

## 注意点

- 既存のテーマシステムと統合すること
- レスポンシブデザインに対応すること
- ローディング状態を適切に表示すること
- データが空の場合の表示を適切に処理すること
- Chart.jsのChart registrationを適切に行うこと
- TypeScriptの型安全性を確保すること

## 次のステップ

これらのチャートコンポーネントが完成したら、次のプロンプト（03_analytics_filters.md）で分析用のフィルタリング機能を実装します。 