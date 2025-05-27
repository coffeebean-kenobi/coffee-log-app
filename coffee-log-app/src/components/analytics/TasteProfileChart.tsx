'use client'

import { Radar } from 'react-chartjs-2'
import { TasteProfile } from '@/types/analytics'
import { chartColors, darkChartColors, getRadarOptions } from '@/utils/chartConfig'
import { useTheme } from '@/theme/ThemeProvider'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: TasteProfile
  loading?: boolean
  title?: string
}

export default function TasteProfileChart({ data, loading, title = '味覚プロファイル' }: Props) {
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

  const labels = [
    '酸味',
    'フレーバー',
    'ボディ',
    'バランス',
    '総合評価',
    'アロマ',
    'アフターテイスト'
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: '平均スコア',
        data: [
          data.acidity,
          data.flavor,
          data.body,
          data.balance,
          data.overall,
          data.aroma,
          data.aftertaste
        ],
        backgroundColor: colors.background,
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.primary,
        pointHoverBackgroundColor: colors.accent,
        pointHoverBorderColor: colors.accent
      }
    ]
  }

  const options = getRadarOptions(isDark)

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
        {title}
      </h3>
      <div style={{ height: '16rem' }}>
        <Radar data={chartData} options={options} />
      </div>
    </div>
  )
} 