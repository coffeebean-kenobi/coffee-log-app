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
      origin: '',
      brewMethod: ''
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
      origin: '',
      brewMethod: ''
    }
    setFilters(resetFilters)
  }, [])

  // フィルターが適用されているかチェック
  const hasActiveFilters = !!(
    filters.dateRange?.startDate || 
    filters.dateRange?.endDate || 
    filters.shopName || 
    filters.origin || 
    filters.brewMethod
  )

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters
  }
} 