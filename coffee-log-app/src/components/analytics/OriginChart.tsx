'use client'

import { Doughnut } from 'react-chartjs-2'
import { OriginAnalytics } from '@/types/analytics'
import { chartColors, darkChartColors, multiColorPalette } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: OriginAnalytics[]
  loading?: boolean
}

export default function OriginChart({ data, loading }: Props) {
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
          原産地別分析
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
    labels: data.map(origin => origin.origin),
    datasets: [
      {
        data: data.map(origin => origin.count),
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
            const origin = data[context.dataIndex]
            return [
              `${context.label}: ${context.parsed}杯`,
              `平均評価: ${origin.averageRating}点`
            ]
          }
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
        原産地別分析
      </h3>
      <div style={{ height: '16rem' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
} 