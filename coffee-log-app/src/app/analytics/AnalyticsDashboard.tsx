'use client'

import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters'
import { 
  AnalyticsFilter,
  FilterStats,
  StatsSummary,
  TimeSeriesChart,
  ShopChart,
  OriginChart,
  BrewMethodChart,
  TasteProfileChart,
  ExportButton
} from '@/components/analytics'
import { useThemeStyles } from '@/theme/utils'

export default function AnalyticsDashboard() {
  const { filters, updateFilters } = useAnalyticsFilters()
  const { analyticsData, records, loading, error } = useAnalyticsData(filters)
  const styles = useThemeStyles()

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: styles.spacing('lg')
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: styles.spacing('xl'),
          backgroundColor: styles.color('background.paper'),
          borderRadius: styles.borderRadius('lg'),
          border: `1px solid ${styles.color('secondary.light')}`,
          boxShadow: styles.shadows('md')
        }}>
          <h1 style={{ 
            fontSize: styles.typography('fontSize.xl'),
            fontWeight: styles.typography('fontWeight.bold'),
            color: '#ef4444',
            marginBottom: styles.spacing('md')
          }}>
            エラーが発生しました
          </h1>
          <p style={{ 
            color: styles.color('text.secondary'),
            marginBottom: styles.spacing('md')
          }}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
              backgroundColor: styles.color('primary.main'),
              color: styles.color('background.paper'),
              borderRadius: styles.borderRadius('md'),
              border: 'none',
              cursor: 'pointer',
              fontSize: styles.typography('fontSize.sm'),
              fontWeight: styles.typography('fontWeight.medium')
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            再読み込み
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: `${styles.spacing('xl')} ${styles.spacing('lg')}` 
    }}>
      {/* ページヘッダー */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        marginBottom: styles.spacing('xl'),
        flexWrap: 'wrap',
        gap: styles.spacing('md')
      }}>
        <div>
          <h1 style={{ 
            fontSize: styles.typography('fontSize.2xl'),
            fontWeight: styles.typography('fontWeight.bold'),
            color: styles.color('text.primary'),
            marginBottom: styles.spacing('sm')
          }}>
            データ分析
          </h1>
          <p style={{ 
            color: styles.color('text.secondary'),
            fontSize: styles.typography('fontSize.md')
          }}>
            あなたのコーヒー体験を数値で振り返り、新しい発見をしましょう
          </p>
        </div>
        {analyticsData.totalRecords > 0 && (
          <ExportButton data={analyticsData} disabled={loading} />
        )}
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
        <div style={{
          backgroundColor: styles.color('background.paper'),
          padding: styles.spacing('xl'),
          borderRadius: styles.borderRadius('lg'),
          border: `1px solid ${styles.color('secondary.light')}`,
          boxShadow: styles.shadows('sm'),
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: styles.spacing('md') }}>📊</div>
          <h2 style={{ 
            fontSize: styles.typography('fontSize.xl'),
            fontWeight: styles.typography('fontWeight.bold'),
            color: styles.color('text.primary'),
            marginBottom: styles.spacing('sm')
          }}>
            {records.length === 0 ? 'まだコーヒー記録がありません' : '条件に一致する記録がありません'}
          </h2>
          <p style={{ 
            color: styles.color('text.secondary'),
            marginBottom: styles.spacing('lg'),
            fontSize: styles.typography('fontSize.md')
          }}>
            {records.length === 0 
              ? 'コーヒーを記録して、データ分析を始めましょう！'
              : 'フィルター条件を変更して再度お試しください。'
            }
          </p>
          {records.length === 0 && (
            <a 
              href="/coffee/add"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${styles.spacing('sm')} ${styles.spacing('lg')}`,
                backgroundColor: styles.color('primary.main'),
                color: styles.color('background.paper'),
                borderRadius: styles.borderRadius('md'),
                textDecoration: 'none',
                fontSize: styles.typography('fontSize.sm'),
                fontWeight: styles.typography('fontWeight.medium')
              }}
            >
              初回コーヒー記録を作成する
            </a>
          )}
        </div>
      )}

      {/* 分析結果表示 */}
      {analyticsData.totalRecords > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('xl') }}>
          {/* 統計サマリー */}
          <StatsSummary data={analyticsData} loading={loading} />

          {/* メインチャート群 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: styles.spacing('xl') 
          }}>
            {/* 時系列チャート */}
            <div style={{ gridColumn: '1 / -1' }}>
              <TimeSeriesChart data={analyticsData.timeSeriesData} loading={loading} />
            </div>

            {/* ショップ分析 */}
            <ShopChart data={analyticsData.shopData} loading={loading} />

            {/* 原産地分析 */}
            <OriginChart data={analyticsData.originData} loading={loading} />

            {/* 抽出方法分析 */}
            <BrewMethodChart data={analyticsData.brewMethodData} loading={loading} />

            {/* 味覚プロファイル分析 */}
            <TasteProfileChart data={analyticsData.tasteProfile} loading={loading} />
          </div>

          {/* 詳細データセクション */}
          <div style={{
            backgroundColor: styles.color('background.paper'),
            padding: styles.spacing('lg'),
            borderRadius: styles.borderRadius('lg'),
            border: `1px solid ${styles.color('secondary.light')}`,
            boxShadow: styles.shadows('sm')
          }}>
            <h2 style={{ 
              fontSize: styles.typography('fontSize.lg'),
              fontWeight: styles.typography('fontWeight.semibold'),
              marginBottom: styles.spacing('md'),
              color: styles.color('text.primary')
            }}>
              詳細データ
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: styles.spacing('lg')
            }}>
              <div>
                <h3 style={{ 
                  fontWeight: styles.typography('fontWeight.medium'),
                  color: styles.color('text.primary'),
                  marginBottom: styles.spacing('sm')
                }}>
                  ショップ別統計
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('sm') }}>
                  {analyticsData.shopData.slice(0, 5).map((shop, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: styles.typography('fontSize.sm')
                    }}>
                      <span style={{ 
                        color: styles.color('text.secondary'),
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {shop.shopName}
                      </span>
                      <span style={{ color: styles.color('text.primary') }}>
                        {shop.count}杯
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ 
                  fontWeight: styles.typography('fontWeight.medium'),
                  color: styles.color('text.primary'),
                  marginBottom: styles.spacing('sm')
                }}>
                  原産地別統計
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('sm') }}>
                  {analyticsData.originData.slice(0, 5).map((origin, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: styles.typography('fontSize.sm')
                    }}>
                      <span style={{ 
                        color: styles.color('text.secondary'),
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {origin.origin}
                      </span>
                      <span style={{ color: styles.color('text.primary') }}>
                        {origin.count}杯
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ 
                  fontWeight: styles.typography('fontWeight.medium'),
                  color: styles.color('text.primary'),
                  marginBottom: styles.spacing('sm')
                }}>
                  抽出方法別統計
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('sm') }}>
                  {analyticsData.brewMethodData.map((brewMethod, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: styles.typography('fontSize.sm')
                    }}>
                      <span style={{ 
                        color: styles.color('text.secondary'),
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {brewMethod.brewMethod}
                      </span>
                      <span style={{ color: styles.color('text.primary') }}>
                        {brewMethod.count}杯
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 