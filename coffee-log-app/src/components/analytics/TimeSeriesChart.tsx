'use client'

import { Line } from 'react-chartjs-2'
import { TimeSeriesEntry } from '@/types/analytics'
import { chartColors, darkChartColors, getChartOptions } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { useThemeStyles } from '@/theme/utils'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Props {
  data: TimeSeriesEntry[]
  loading?: boolean
}

export default function TimeSeriesChart({ data, loading }: Props) {
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
          コーヒー消費履歴
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
        コーヒー消費履歴
      </h3>
      <div style={{ height: '16rem' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
} 