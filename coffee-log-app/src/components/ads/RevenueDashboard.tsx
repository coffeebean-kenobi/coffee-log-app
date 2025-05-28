'use client'

import { useRevenueTracking } from '@/hooks/useRevenueTracking'
import { useABTest } from '@/hooks/useABTest'
import { Card } from '@/components/Card'
import { Typography } from '@/components/Typography'
import { useThemeStyles } from '@/theme/utils'

export default function RevenueDashboard() {
  const { metrics, loading, targetProgress, dailyData } = useRevenueTracking()
  const { tests, userVariants } = useABTest()
  const styles = useThemeStyles()

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('xl') }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: styles.spacing('lg') 
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} style={{ padding: styles.spacing('lg') }}>
              <div style={{ 
                height: '20px', 
                backgroundColor: styles.color('background.accent'),
                borderRadius: styles.borderRadius('sm'),
                marginBottom: styles.spacing('md')
              }}></div>
              <div style={{ 
                height: '32px', 
                backgroundColor: styles.color('background.accent'),
                borderRadius: styles.borderRadius('sm'),
                marginBottom: styles.spacing('sm')
              }}></div>
              <div style={{ 
                height: '16px', 
                backgroundColor: styles.color('background.accent'),
                borderRadius: styles.borderRadius('sm'),
                width: '60%'
              }}></div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('xl') }}>
      {/* 目標達成進捗 */}
      <Card style={{ padding: styles.spacing('xl') }}>
        <Typography variant="h3" style={{ marginBottom: styles.spacing('lg') }}>
          💰 月間収益目標進捗
        </Typography>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('lg') }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" style={{ color: styles.color('text.secondary') }}>
              現在の月間収益
            </Typography>
            <Typography variant="h2" style={{ fontWeight: 'bold' }}>
              ${targetProgress.current.toFixed(2)}
            </Typography>
          </div>
          
          {/* プログレスバー */}
          <div style={{ 
            width: '100%', 
            height: '12px', 
            backgroundColor: styles.color('background.accent'),
            borderRadius: styles.borderRadius('lg'),
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                height: '100%',
                backgroundColor: targetProgress.onTrack ? '#10b981' : '#f59e0b',
                width: `${targetProgress.percentage}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
              目標: ${targetProgress.target.toFixed(2)}
            </Typography>
            <Typography 
              variant="body2" 
              style={{ 
                color: targetProgress.onTrack ? '#10b981' : '#f59e0b',
                fontWeight: 'medium'
              }}
            >
              {targetProgress.onTrack ? '📈' : '📉'} {targetProgress.percentage.toFixed(1)}%
            </Typography>
          </div>
          
          <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
            {targetProgress.onTrack 
              ? '順調に目標に向かっています！' 
              : '目標達成にはさらなる最適化が必要です。'}
          </Typography>
        </div>
      </Card>

      {/* メトリクスカード */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: styles.spacing('lg') 
      }}>
        <Card style={{ padding: styles.spacing('lg') }}>
          <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>
            👁️ 月間インプレッション
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: styles.spacing('sm') }}>
            {monthlyMetrics?.impressions.toLocaleString() || '0'}
          </Typography>
          <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
            今週: {weeklyMetrics?.impressions.toLocaleString() || '0'}
          </Typography>
        </Card>

        <Card style={{ padding: styles.spacing('lg') }}>
          <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>
            🖱️ 月間クリック
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: styles.spacing('sm') }}>
            {monthlyMetrics?.clicks.toLocaleString() || '0'}
          </Typography>
          <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
            今週: {weeklyMetrics?.clicks.toLocaleString() || '0'}
          </Typography>
        </Card>

        <Card style={{ padding: styles.spacing('lg') }}>
          <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>
            📊 CTR
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: styles.spacing('sm') }}>
            {monthlyMetrics?.ctr.toFixed(2) || '0.00'}%
          </Typography>
          <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
            今週: {weeklyMetrics?.ctr.toFixed(2) || '0.00'}%
          </Typography>
        </Card>

        <Card style={{ padding: styles.spacing('lg') }}>
          <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>
            💵 RPM
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: styles.spacing('sm') }}>
            ${monthlyMetrics?.rpm.toFixed(2) || '0.00'}
          </Typography>
          <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
            今週: ${weeklyMetrics?.rpm.toFixed(2) || '0.00'}
          </Typography>
        </Card>
      </div>

      {/* A/Bテスト状況 */}
      <Card style={{ padding: styles.spacing('xl') }}>
        <Typography variant="h3" style={{ marginBottom: styles.spacing('lg') }}>
          🧪 実行中のA/Bテスト
        </Typography>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('lg') }}>
          {tests.filter(test => test.isActive).map(test => (
            <div 
              key={test.id} 
              style={{ 
                border: `1px solid ${styles.color('border')}`,
                borderRadius: styles.borderRadius('lg'),
                padding: styles.spacing('lg')
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: styles.spacing('sm')
              }}>
                <Typography variant="h4">{test.name}</Typography>
                <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
                  あなたのバリアント: {userVariants[test.id] || '未割り当て'}
                </Typography>
              </div>
              
              <Typography 
                variant="body2" 
                style={{ 
                  color: styles.color('text.secondary'),
                  marginBottom: styles.spacing('md')
                }}
              >
                {test.description}
              </Typography>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: styles.spacing('sm') 
              }}>
                {test.variants.map(variant => (
                  <div 
                    key={variant.id} 
                    style={{ 
                      padding: styles.spacing('sm'),
                      border: `1px solid ${
                        userVariants[test.id] === variant.id 
                          ? styles.color('primary.main')
                          : styles.color('border')
                      }`,
                      borderRadius: styles.borderRadius('md'),
                      backgroundColor: userVariants[test.id] === variant.id 
                        ? styles.color('primary.light') + '20'
                        : 'transparent'
                    }}
                  >
                    <Typography variant="body2" style={{ fontWeight: 'medium' }}>
                      {variant.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: styles.color('text.secondary') }}>
                      配分: {(variant.weight * 100).toFixed(0)}%
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 収益推移グラフ */}
      <Card style={{ padding: styles.spacing('xl') }}>
        <Typography variant="h3" style={{ marginBottom: styles.spacing('lg') }}>
          📈 日別収益推移（過去30日）
        </Typography>
        
        <div style={{ 
          height: '256px', 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          gap: '2px',
          padding: styles.spacing('md'),
          backgroundColor: styles.color('background.accent'),
          borderRadius: styles.borderRadius('md')
        }}>
          {dailyData.slice(-14).map((day, index) => (
            <div 
              key={day.date} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}
            >
              <div 
                style={{ 
                  backgroundColor: styles.color('primary.main'),
                  borderRadius: `${styles.borderRadius('sm')} ${styles.borderRadius('sm')} 0 0`,
                  width: '100%',
                  minHeight: '2px',
                  height: `${Math.max((day.revenue / 3) * 200, 2)}px`,
                  transition: 'height 0.3s ease'
                }}
                title={`${day.date}: $${day.revenue.toFixed(2)}`}
              />
              <Typography 
                variant="body2" 
                style={{ 
                  color: styles.color('text.secondary'),
                  marginTop: styles.spacing('xs'),
                  fontSize: '10px'
                }}
              >
                {new Date(day.date).getDate()}
              </Typography>
            </div>
          ))}
        </div>
        
        <Typography 
          variant="body2" 
          style={{ 
            textAlign: 'center',
            color: styles.color('text.secondary'),
            marginTop: styles.spacing('sm')
          }}
        >
          直近14日間の日別収益（$）
        </Typography>
      </Card>
    </div>
  )
} 