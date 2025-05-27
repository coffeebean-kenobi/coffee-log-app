'use client'

import { AnalyticsData } from '@/types/analytics'
import { BREW_METHOD_LABELS } from '@/utils/analytics'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: AnalyticsData
  loading?: boolean
}

export default function StatsSummary({ data, loading }: Props) {
  const styles = useThemeStyles()

  if (loading) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: styles.spacing('md'), 
        marginBottom: styles.spacing('lg') 
      }}>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            style={{
              backgroundColor: styles.color('background.paper'),
              padding: styles.spacing('md'),
              borderRadius: styles.borderRadius('md'),
              border: `1px solid ${styles.color('secondary.light')}`,
              boxShadow: styles.shadows('sm')
            }}
          >
            <div style={{ 
              height: '1rem', 
              backgroundColor: styles.color('secondary.light'), 
              borderRadius: styles.borderRadius('sm'),
              marginBottom: styles.spacing('sm'),
              opacity: 0.3
            }}></div>
            <div style={{ 
              height: '2rem', 
              backgroundColor: styles.color('secondary.light'), 
              borderRadius: styles.borderRadius('sm'),
              opacity: 0.3
            }}></div>
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
      label: '主要原産地',
      value: data.mostCommonOrigin || '未記録',
      icon: '🌍'
    }
  ]

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: styles.spacing('md'), 
      marginBottom: styles.spacing('lg') 
    }}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          style={{
            backgroundColor: styles.color('background.paper'),
            padding: styles.spacing('md'),
            borderRadius: styles.borderRadius('md'),
            border: `1px solid ${styles.color('secondary.light')}`,
            boxShadow: styles.shadows('sm')
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: styles.spacing('sm'), 
            marginBottom: styles.spacing('sm') 
          }}>
            <span style={{ fontSize: '1.125rem' }}>{stat.icon}</span>
            <p style={{ 
              fontSize: styles.typography('fontSize.sm'),
              color: styles.color('text.secondary'),
              fontWeight: styles.typography('fontWeight.medium'),
              margin: 0
            }}>
              {stat.label}
            </p>
          </div>
          <p style={{ 
            fontSize: styles.typography('fontSize.xl'),
            fontWeight: styles.typography('fontWeight.bold'),
            color: styles.color('text.primary'),
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
} 