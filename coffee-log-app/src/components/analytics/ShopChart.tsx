'use client'

import { Bar } from 'react-chartjs-2'
import { ShopAnalytics } from '@/types/analytics'
import { chartColors, darkChartColors, getChartOptions, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: ShopAnalytics[]
  loading?: boolean
}

export default function ShopChart({ data, loading }: Props) {
  const { isDark } = useTheme()
  const styles = useThemeStyles()
  const colors = isDark ? darkChartColors : chartColors

  if (loading) {
    return (
      <div style={{
        backgroundColor: styles.color('background.paper'),
        padding: styles.spacing('lg'),
        borderRadius: styles.borderRadius('md'),
        border: `1px solid ${styles.color('secondary.light')}`,
        boxShadow: styles.shadows('sm')
      }}>
        <div style={{ 
          height: '1rem', 
          backgroundColor: styles.color('secondary.light'), 
          borderRadius: styles.borderRadius('sm'),
          marginBottom: styles.spacing('md'),
          opacity: 0.3
        }}></div>
        <div style={{ 
          height: '16rem', 
          backgroundColor: styles.color('secondary.light'), 
          borderRadius: styles.borderRadius('sm'),
          opacity: 0.3
        }}></div>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div style={{
        backgroundColor: styles.color('background.paper'),
        padding: styles.spacing('lg'),
        borderRadius: styles.borderRadius('md'),
        border: `1px solid ${styles.color('secondary.light')}`,
        boxShadow: styles.shadows('sm')
      }}>
        <h3 style={{ 
          fontSize: styles.typography('fontSize.lg'),
          fontWeight: styles.typography('fontWeight.semibold'),
          marginBottom: styles.spacing('md'),
          color: styles.color('text.primary'),
          margin: `0 0 ${styles.spacing('md')} 0`
        }}>
          ショップ別分析
        </h3>
        <div style={{ 
          height: '16rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: styles.color('text.secondary')
        }}>
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
            return shop.favoriteBrewMethod ? [`お気に入り抽出方法: ${shop.favoriteBrewMethod}`] : []
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
    <div style={{
      backgroundColor: styles.color('background.paper'),
      padding: styles.spacing('lg'),
      borderRadius: styles.borderRadius('md'),
      border: `1px solid ${styles.color('secondary.light')}`,
      boxShadow: styles.shadows('sm')
    }}>
      <h3 style={{ 
        fontSize: styles.typography('fontSize.lg'),
        fontWeight: styles.typography('fontWeight.semibold'),
        marginBottom: styles.spacing('md'),
        color: styles.color('text.primary'),
        margin: `0 0 ${styles.spacing('md')} 0`
      }}>
        ショップ別分析（上位10店舗）
      </h3>
      <div style={{ height: '16rem' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
} 