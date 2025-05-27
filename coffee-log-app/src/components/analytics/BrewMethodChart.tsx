'use client'

import { Bar } from 'react-chartjs-2'
import { BrewMethodAnalytics } from '@/types/analytics'
import { BREW_METHOD_LABELS } from '@/utils/analytics'
import { chartColors, darkChartColors, getChartOptions, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: BrewMethodAnalytics[]
  loading?: boolean
}

export default function BrewMethodChart({ data, loading }: Props) {
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
          抽出方法別分析
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

  const chartData = {
    labels: data.map(item => BREW_METHOD_LABELS[item.brewMethod as keyof typeof BREW_METHOD_LABELS] || item.brewMethod),
    datasets: [
      {
        label: '消費回数',
        data: data.map(item => item.count),
        backgroundColor: [
          '#D4AF37', // Gold
          '#C0C0C0', // Silver
          '#CD7F32', // Bronze
          '#B8860B', // Dark Goldenrod
          '#DAA520', // Goldenrod
          '#FFD700'  // Gold
        ].slice(0, data.length),
        borderColor: [
          '#D4AF37',
          '#C0C0C0',
          '#CD7F32',
          '#B8860B',
          '#DAA520',
          '#FFD700'
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
          text: '抽出方法',
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
        抽出方法別分析
      </h3>
      <div style={{ height: '16rem' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
} 