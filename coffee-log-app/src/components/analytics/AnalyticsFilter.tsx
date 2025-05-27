'use client'

import { useState, useEffect } from 'react'
import { AnalyticsFilters } from '@/types/analytics'
import { BREW_METHOD_LABELS } from '@/utils/analytics'
import { useThemeStyles } from '@/theme/utils'
import DateRangePicker from './DateRangePicker'

interface Props {
  onFilterChange: (filters: AnalyticsFilters) => void
  initialFilters?: AnalyticsFilters
}

export default function AnalyticsFilter({ onFilterChange, initialFilters }: Props) {
  const [filters, setFilters] = useState<AnalyticsFilters>(initialFilters || {
    dateRange: { startDate: null, endDate: null },
    shopName: '',
    origin: '',
    brewMethod: ''
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const styles = useThemeStyles()

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleDateRangeChange = (dateRange: { startDate: Date | null; endDate: Date | null }) => {
    setFilters(prev => ({
      ...prev,
      dateRange
    }))
  }

  const handleInputChange = (field: keyof Omit<AnalyticsFilters, 'dateRange'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  const handleReset = () => {
    const resetFilters: AnalyticsFilters = {
      dateRange: { startDate: null, endDate: null },
      shopName: '',
      origin: '',
      brewMethod: ''
    }
    setFilters(resetFilters)
  }

  const hasActiveFilters = 
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.origin || 
    filters.brewMethod

  return (
    <div style={{
      backgroundColor: styles.color('background.paper'),
      padding: styles.spacing('lg'),
      borderRadius: styles.borderRadius('md'),
      border: `1px solid ${styles.color('secondary.light')}`,
      boxShadow: styles.shadows('sm'),
      marginBottom: styles.spacing('lg')
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: styles.spacing('md') 
      }}>
        <h2 style={{ 
          fontSize: styles.typography('fontSize.lg'),
          fontWeight: styles.typography('fontWeight.medium'),
          color: styles.color('text.primary'),
          margin: 0
        }}>
          分析フィルター
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing('sm') }}>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              style={{
                fontSize: styles.typography('fontSize.sm'),
                color: styles.color('text.secondary'),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = styles.color('text.primary')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = styles.color('text.secondary')
              }}
            >
              リセット
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              fontSize: styles.typography('fontSize.sm'),
              color: styles.color('primary.main'),
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            {isExpanded ? '閉じる' : '詳細フィルター'}
          </button>
        </div>
      </div>

      {/* 日付範囲選択（常に表示） */}
      <DateRangePicker
        value={filters.dateRange || { startDate: null, endDate: null }}
        onChange={handleDateRangeChange}
      />

      {/* 詳細フィルター（展開時のみ表示） */}
      {isExpanded && (
        <div style={{
          marginTop: styles.spacing('lg'),
          paddingTop: styles.spacing('lg'),
          borderTop: `1px solid ${styles.color('secondary.light')}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: styles.spacing('md')
          }}>
            <div>
              <label 
                htmlFor="analyticsShopName" 
                style={{ 
                  display: 'block', 
                  fontSize: styles.typography('fontSize.sm'),
                  fontWeight: styles.typography('fontWeight.medium'),
                  marginBottom: styles.spacing('xs'),
                  color: styles.color('text.primary')
                }}
              >
                ショップ名
              </label>
              <input
                type="text"
                id="analyticsShopName"
                value={filters.shopName || ''}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
                placeholder="店名で絞り込み"
                style={{
                  width: '100%',
                  padding: `${styles.spacing('sm')} ${styles.spacing('sm')}`,
                  border: `1px solid ${styles.color('secondary.light')}`,
                  borderRadius: styles.borderRadius('md'),
                  backgroundColor: styles.color('background.main'),
                  color: styles.color('text.primary'),
                  fontSize: styles.typography('fontSize.sm')
                }}
              />
            </div>
            
            <div>
              <label 
                htmlFor="analyticsOrigin" 
                style={{ 
                  display: 'block', 
                  fontSize: styles.typography('fontSize.sm'),
                  fontWeight: styles.typography('fontWeight.medium'),
                  marginBottom: styles.spacing('xs'),
                  color: styles.color('text.primary')
                }}
              >
                原産地
              </label>
              <input
                type="text"
                id="analyticsOrigin"
                value={filters.origin || ''}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                placeholder="原産地で絞り込み"
                style={{
                  width: '100%',
                  padding: `${styles.spacing('sm')} ${styles.spacing('sm')}`,
                  border: `1px solid ${styles.color('secondary.light')}`,
                  borderRadius: styles.borderRadius('md'),
                  backgroundColor: styles.color('background.main'),
                  color: styles.color('text.primary'),
                  fontSize: styles.typography('fontSize.sm')
                }}
              />
            </div>
            
            <div>
              <label 
                htmlFor="analyticsBrewMethod" 
                style={{ 
                  display: 'block', 
                  fontSize: styles.typography('fontSize.sm'),
                  fontWeight: styles.typography('fontWeight.medium'),
                  marginBottom: styles.spacing('xs'),
                  color: styles.color('text.primary')
                }}
              >
                抽出方法
              </label>
              <select
                id="analyticsBrewMethod"
                value={filters.brewMethod || ''}
                onChange={(e) => handleInputChange('brewMethod', e.target.value)}
                style={{
                  width: '100%',
                  padding: `${styles.spacing('sm')} ${styles.spacing('sm')}`,
                  border: `1px solid ${styles.color('secondary.light')}`,
                  borderRadius: styles.borderRadius('md'),
                  backgroundColor: styles.color('background.main'),
                  color: styles.color('text.primary'),
                  fontSize: styles.typography('fontSize.sm')
                }}
              >
                <option value="">すべて</option>
                {Object.entries(BREW_METHOD_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* アクティブフィルター表示 */}
      {hasActiveFilters && (
        <div style={{
          marginTop: styles.spacing('md'),
          paddingTop: styles.spacing('md'),
          borderTop: `1px solid ${styles.color('secondary.light')}`
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: styles.spacing('sm') }}>
            <span style={{ 
              fontSize: styles.typography('fontSize.sm'),
              color: styles.color('text.secondary')
            }}>
              適用中:
            </span>
            {filters.dateRange?.startDate && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
                fontSize: styles.typography('fontSize.xs'),
                backgroundColor: `${styles.color('primary.main')}20`,
                color: styles.color('primary.main'),
                borderRadius: styles.borderRadius('md')
              }}>
                期間指定
              </span>
            )}
            {filters.shopName && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
                fontSize: styles.typography('fontSize.xs'),
                backgroundColor: `${styles.color('primary.main')}20`,
                color: styles.color('primary.main'),
                borderRadius: styles.borderRadius('md')
              }}>
                ショップ: {filters.shopName}
              </span>
            )}
            {filters.origin && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
                fontSize: styles.typography('fontSize.xs'),
                backgroundColor: `${styles.color('primary.main')}20`,
                color: styles.color('primary.main'),
                borderRadius: styles.borderRadius('md')
              }}>
                原産地: {filters.origin}
              </span>
            )}
            {filters.brewMethod && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
                fontSize: styles.typography('fontSize.xs'),
                backgroundColor: `${styles.color('primary.main')}20`,
                color: styles.color('primary.main'),
                borderRadius: styles.borderRadius('md')
              }}>
                抽出方法: {BREW_METHOD_LABELS[filters.brewMethod as keyof typeof BREW_METHOD_LABELS]}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 