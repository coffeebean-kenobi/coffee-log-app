# 03. 分析用フィルタリング機能の実装

## 概要
Coffee Log Appのデータ分析ページ用の高度なフィルタリング機能を実装します。既存のCoffeeFilterコンポーネントを拡張し、分析専用のフィルター機能を追加します。

## 前提条件
- 01_analytics_foundation.mdの実装が完了していること
- 02_analytics_charts.mdの実装が完了していること

## 実装する機能
1. 日付範囲選択（開始日・終了日）
2. 複数条件による絞り込み機能
3. クイックフィルターボタン（過去1週間、1ヶ月、3ヶ月、1年）
4. フィルターの保存・復元機能
5. フィルター適用時の統計表示

## 必要なファイル作成

### 1. 日付範囲選択コンポーネント: `src/components/analytics/DateRangePicker.tsx`
```typescript
'use client'

import { useState } from 'react'
import { DateRange } from '@/types/analytics'
import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Props {
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

export default function DateRangePicker({ value, onChange, className = '' }: Props) {
  const [showCustom, setShowCustom] = useState(false)

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
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium mb-2 text-card-foreground">
          期間選択
        </label>
        
        {/* クイック選択ボタン */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickRanges.map((range, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickRange(range.getValue())}
              className="px-3 py-1 text-sm rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {range.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(!showCustom)}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              showCustom 
                ? 'border-primary bg-primary text-primary-foreground' 
                : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            カスタム期間
          </button>
        </div>

        {/* カスタム日付選択 */}
        {showCustom && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-md bg-card">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-card-foreground">
                開始日
              </label>
              <input
                type="date"
                id="startDate"
                value={formatDateForInput(value.startDate)}
                onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-card-foreground">
                終了日
              </label>
              <input
                type="date"
                id="endDate"
                value={formatDateForInput(value.endDate)}
                onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* 選択中の期間表示 */}
        {(value.startDate || value.endDate) && (
          <div className="mt-2 text-sm text-muted-foreground">
            選択中: {value.startDate ? format(value.startDate, 'yyyy年M月d日', { locale: ja }) : '開始日未設定'} 
            ～ {value.endDate ? format(value.endDate, 'yyyy年M月d日', { locale: ja }) : '終了日未設定'}
          </div>
        )}
      </div>
    </div>
  )
}
```

### 2. 分析用フィルターコンポーネント: `src/components/analytics/AnalyticsFilter.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { AnalyticsFilters } from '@/types/analytics'
import { ROAST_LEVEL_LABELS } from '@/utils/analytics'
import DateRangePicker from './DateRangePicker'

interface Props {
  onFilterChange: (filters: AnalyticsFilters) => void
  initialFilters?: AnalyticsFilters
}

export default function AnalyticsFilter({ onFilterChange, initialFilters }: Props) {
  const [filters, setFilters] = useState<AnalyticsFilters>(initialFilters || {
    dateRange: { startDate: null, endDate: null },
    shopName: '',
    country: '',
    roastLevel: ''
  })

  const [isExpanded, setIsExpanded] = useState(false)

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
      country: '',
      roastLevel: ''
    }
    setFilters(resetFilters)
  }

  const hasActiveFilters = 
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.country || 
    filters.roastLevel

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-card-foreground">分析フィルター</h2>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              リセット
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
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
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="analyticsShopName" className="block text-sm font-medium mb-1 text-card-foreground">
                ショップ名
              </label>
              <input
                type="text"
                id="analyticsShopName"
                value={filters.shopName || ''}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
                placeholder="店名で絞り込み"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="analyticsCountry" className="block text-sm font-medium mb-1 text-card-foreground">
                原産国
              </label>
              <input
                type="text"
                id="analyticsCountry"
                value={filters.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="原産国で絞り込み"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="analyticsRoastLevel" className="block text-sm font-medium mb-1 text-card-foreground">
                焙煎度
              </label>
              <select
                id="analyticsRoastLevel"
                value={filters.roastLevel || ''}
                onChange={(e) => handleInputChange('roastLevel', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">すべて</option>
                {Object.entries(ROAST_LEVEL_LABELS).map(([value, label]) => (
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
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">適用中:</span>
            {filters.dateRange?.startDate && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                期間指定
              </span>
            )}
            {filters.shopName && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                ショップ: {filters.shopName}
              </span>
            )}
            {filters.country && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                原産国: {filters.country}
              </span>
            )}
            {filters.roastLevel && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                焙煎度: {ROAST_LEVEL_LABELS[filters.roastLevel as keyof typeof ROAST_LEVEL_LABELS]}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

### 3. フィルター状態管理フック: `src/hooks/useAnalyticsFilters.ts`
```typescript
import { useState, useCallback, useEffect } from 'react'
import { AnalyticsFilters } from '@/types/analytics'

const STORAGE_KEY = 'coffee-log-analytics-filters'

export function useAnalyticsFilters(initialFilters?: AnalyticsFilters) {
  const [filters, setFilters] = useState<AnalyticsFilters>(() => {
    // 初期値の設定（ローカルストレージから復元または初期値使用）
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          // Date オブジェクトを復元
          if (parsed.dateRange?.startDate) {
            parsed.dateRange.startDate = new Date(parsed.dateRange.startDate)
          }
          if (parsed.dateRange?.endDate) {
            parsed.dateRange.endDate = new Date(parsed.dateRange.endDate)
          }
          return parsed
        }
      } catch (error) {
        console.warn('フィルター設定の復元に失敗しました:', error)
      }
    }
    
    return initialFilters || {
      dateRange: { startDate: null, endDate: null },
      shopName: '',
      country: '',
      roastLevel: ''
    }
  })

  // フィルターの変更処理
  const updateFilters = useCallback((newFilters: AnalyticsFilters) => {
    setFilters(newFilters)
  }, [])

  // ローカルストレージに保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
      } catch (error) {
        console.warn('フィルター設定の保存に失敗しました:', error)
      }
    }
  }, [filters])

  // フィルターリセット
  const resetFilters = useCallback(() => {
    const resetFilters: AnalyticsFilters = {
      dateRange: { startDate: null, endDate: null },
      shopName: '',
      country: '',
      roastLevel: ''
    }
    setFilters(resetFilters)
  }, [])

  // フィルターが適用されているかチェック
  const hasActiveFilters = !!(
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.country || 
    filters.roastLevel
  )

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters
  }
}
```

### 4. フィルター統計表示コンポーネント: `src/components/analytics/FilterStats.tsx`
```typescript
'use client'

import { AnalyticsFilters } from '@/types/analytics'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Props {
  filters: AnalyticsFilters
  totalRecords: number
  filteredRecords: number
}

export default function FilterStats({ filters, totalRecords, filteredRecords }: Props) {
  const hasFilters = !!(
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.country || 
    filters.roastLevel
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
  
  if (filters.country) {
    filterDescription.push(`原産国: "${filters.country}"`)
  }
  
  if (filters.roastLevel) {
    filterDescription.push(`焙煎度: ${filters.roastLevel}`)
  }

  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-6 border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            フィルター適用結果
          </h3>
          <p className="text-sm text-muted-foreground">
            全{totalRecords}件中 <span className="font-medium text-foreground">{filteredRecords}件</span> を表示
            {filteredRecords !== totalRecords && (
              <span className="text-orange-600 dark:text-orange-400">
                （{totalRecords - filteredRecords}件が除外されています）
              </span>
            )}
          </p>
        </div>
        
        {filterDescription.length > 0 && (
          <div className="text-xs text-muted-foreground max-w-md text-right">
            {filterDescription.join(' | ')}
          </div>
        )}
      </div>
    </div>
  )
}
```

## 実装指示

1. **日付範囲選択コンポーネントの作成**: `src/components/analytics/DateRangePicker.tsx`を作成してください。

2. **分析用フィルターコンポーネントの作成**: `src/components/analytics/AnalyticsFilter.tsx`を作成してください。

3. **フィルター状態管理フックの作成**: `src/hooks/useAnalyticsFilters.ts`を作成してください。

4. **フィルター統計表示コンポーネントの作成**: `src/components/analytics/FilterStats.tsx`を作成してください。

5. **hooksディレクトリの作成**: `src/hooks/`ディレクトリが存在しない場合は作成してください。

## 注意点

- date-fnsライブラリを適切に使用すること
- ローカルストレージへのアクセスはブラウザ環境でのみ行うこと
- フィルター状態の型安全性を確保すること
- レスポンシブデザインに対応すること
- アクセシビリティを考慮したマークアップにすること

## 次のステップ

これらのフィルター機能が完成したら、次のプロンプト（04_analytics_page.md）で分析ページを作成し、全てのコンポーネントを統合します。 