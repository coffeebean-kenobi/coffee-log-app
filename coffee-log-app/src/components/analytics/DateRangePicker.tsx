'use client'

import { useState } from 'react'
import { DateRange } from '@/types/analytics'
import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

export default function DateRangePicker({ value, onChange, className = '' }: Props) {
  const [showCustom, setShowCustom] = useState(false)
  const styles = useThemeStyles()

  const quickRanges = [
    {
      label: '過去1週間',
      getValue: () => ({
        startDate: startOfDay(subWeeks(new Date(), 1)),
        endDate: endOfDay(new Date())
      })
    },
    {
      label: '過去1ヶ月',
      getValue: () => ({
        startDate: startOfDay(subMonths(new Date(), 1)),
        endDate: endOfDay(new Date())
      })
    },
    {
      label: '過去3ヶ月',
      getValue: () => ({
        startDate: startOfDay(subMonths(new Date(), 3)),
        endDate: endOfDay(new Date())
      })
    },
    {
      label: '過去1年',
      getValue: () => ({
        startDate: startOfDay(subYears(new Date(), 1)),
        endDate: endOfDay(new Date())
      })
    },
    {
      label: '全期間',
      getValue: () => ({
        startDate: null,
        endDate: null
      })
    }
  ]

  const handleQuickRange = (range: DateRange) => {
    onChange(range)
    setShowCustom(false)
  }

  const handleCustomDateChange = (field: 'startDate' | 'endDate', dateString: string) => {
    const date = dateString ? new Date(dateString) : null
    onChange({
      ...value,
      [field]: date ? (field === 'startDate' ? startOfDay(date) : endOfDay(date)) : null
    })
  }

  const formatDateForInput = (date: Date | null) => {
    return date ? format(date, 'yyyy-MM-dd') : ''
  }

  return (
    <div className={className} style={{ marginBottom: styles.spacing('md') }}>
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: styles.typography('fontSize.sm'),
          fontWeight: styles.typography('fontWeight.medium'),
          marginBottom: styles.spacing('sm'),
          color: styles.color('text.primary')
        }}>
          期間選択
        </label>
        
        {/* クイック選択ボタン */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: styles.spacing('sm'), 
          marginBottom: styles.spacing('md') 
        }}>
          {quickRanges.map((range, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickRange(range.getValue())}
              style={{
                padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
                fontSize: styles.typography('fontSize.sm'),
                borderRadius: styles.borderRadius('md'),
                border: `1px solid ${styles.color('secondary.light')}`,
                backgroundColor: styles.color('background.paper'),
                color: styles.color('text.primary'),
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.color('accent.light')
                e.currentTarget.style.color = styles.color('text.primary')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.color('background.paper')
                e.currentTarget.style.color = styles.color('text.primary')
              }}
            >
              {range.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(!showCustom)}
            style={{
              padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
              fontSize: styles.typography('fontSize.sm'),
              borderRadius: styles.borderRadius('md'),
              border: `1px solid ${showCustom ? styles.color('primary.main') : styles.color('secondary.light')}`,
              backgroundColor: showCustom ? styles.color('primary.main') : styles.color('background.paper'),
              color: showCustom ? styles.color('background.paper') : styles.color('text.primary'),
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            カスタム期間
          </button>
        </div>

        {/* カスタム日付選択 */}
        {showCustom && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: styles.spacing('md'),
            padding: styles.spacing('md'),
            border: `1px solid ${styles.color('secondary.light')}`,
            borderRadius: styles.borderRadius('md'),
            backgroundColor: styles.color('background.paper')
          }}>
            <div>
              <label 
                htmlFor="startDate" 
                style={{ 
                  display: 'block', 
                  fontSize: styles.typography('fontSize.sm'),
                  fontWeight: styles.typography('fontWeight.medium'),
                  marginBottom: styles.spacing('xs'),
                  color: styles.color('text.primary')
                }}
              >
                開始日
              </label>
              <input
                type="date"
                id="startDate"
                value={formatDateForInput(value.startDate)}
                onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
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
                htmlFor="endDate" 
                style={{ 
                  display: 'block', 
                  fontSize: styles.typography('fontSize.sm'),
                  fontWeight: styles.typography('fontWeight.medium'),
                  marginBottom: styles.spacing('xs'),
                  color: styles.color('text.primary')
                }}
              >
                終了日
              </label>
              <input
                type="date"
                id="endDate"
                value={formatDateForInput(value.endDate)}
                onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
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
          </div>
        )}

        {/* 選択中の期間表示 */}
        {(value.startDate || value.endDate) && (
          <div style={{ 
            marginTop: styles.spacing('sm'), 
            fontSize: styles.typography('fontSize.sm'),
            color: styles.color('text.secondary')
          }}>
            選択中: {value.startDate ? format(value.startDate, 'yyyy年M月d日', { locale: ja }) : '開始日未設定'} 
            ～ {value.endDate ? format(value.endDate, 'yyyy年M月d日', { locale: ja }) : '終了日未設定'}
          </div>
        )}
      </div>
    </div>
  )
} 