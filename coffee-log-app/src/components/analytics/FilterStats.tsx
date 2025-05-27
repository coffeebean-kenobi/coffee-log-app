'use client'

import { AnalyticsFilters } from '@/types/analytics'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  filters: AnalyticsFilters
  totalRecords: number
  filteredRecords: number
}

export default function FilterStats({ filters, totalRecords, filteredRecords }: Props) {
  const styles = useThemeStyles()
  
  const hasFilters = !!(
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.origin || 
    filters.brewMethod
  )

  if (!hasFilters && totalRecords === filteredRecords) {
    return null
  }

  const filterDescription = []
  
  if (filters.dateRange?.startDate || filters.dateRange?.endDate) {
    const start = filters.dateRange.startDate 
      ? format(filters.dateRange.startDate, 'yyyy年M月d日', { locale: ja })
      : '開始日未設定'
    const end = filters.dateRange.endDate 
      ? format(filters.dateRange.endDate, 'yyyy年M月d日', { locale: ja })
      : '終了日未設定'
    filterDescription.push(`期間: ${start} ～ ${end}`)
  }
  
  if (filters.shopName) {
    filterDescription.push(`ショップ: "${filters.shopName}"`)
  }
  
  if (filters.origin) {
    filterDescription.push(`原産地: "${filters.origin}"`)
  }
  
  if (filters.brewMethod) {
    filterDescription.push(`抽出方法: ${filters.brewMethod}`)
  }

  return (
    <div style={{
      backgroundColor: `${styles.color('secondary.light')}30`,
      padding: styles.spacing('md'),
      borderRadius: styles.borderRadius('md'),
      marginBottom: styles.spacing('lg'),
      border: `1px solid ${styles.color('secondary.light')}`
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: styles.spacing('sm')
      }}>
        <div>
          <h3 style={{ 
            fontSize: styles.typography('fontSize.sm'),
            fontWeight: styles.typography('fontWeight.medium'),
            color: styles.color('text.primary'),
            margin: `0 0 ${styles.spacing('xs')} 0`
          }}>
            フィルター適用結果
          </h3>
          <p style={{ 
            fontSize: styles.typography('fontSize.sm'),
            color: styles.color('text.secondary'),
            margin: 0
          }}>
            全{totalRecords}件中 <span style={{ 
              fontWeight: styles.typography('fontWeight.medium'),
              color: styles.color('text.primary')
            }}>
              {filteredRecords}件
            </span> を表示
            {filteredRecords !== totalRecords && (
              <span style={{ color: '#ea580c' }}>
                （{totalRecords - filteredRecords}件が除外されています）
              </span>
            )}
          </p>
        </div>
        
        {filterDescription.length > 0 && (
          <div style={{ 
            fontSize: styles.typography('fontSize.xs'),
            color: styles.color('text.secondary'),
            maxWidth: '24rem',
            textAlign: 'right'
          }}>
            {filterDescription.join(' | ')}
          </div>
        )}
      </div>
    </div>
  )
} 