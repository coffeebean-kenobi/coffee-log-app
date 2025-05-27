import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { Coffee } from '@/types/coffee'
import { AnalyticsData, AnalyticsFilters } from '@/types/analytics'
import { calculateAnalytics } from '@/utils/analytics'

export function useAnalyticsData(filters?: AnalyticsFilters) {
  const [records, setRecords] = useState<Coffee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  
  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('認証されていません')
      }
      
      const { data, error: fetchError } = await supabase
        .from('coffee_records')
        .select('*')
        .eq('user_id', user.id)
        .order('consumed_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      setRecords(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }, [supabase])
  
  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])
  
  const analyticsData: AnalyticsData = useMemo(() => {
    return calculateAnalytics(records, filters)
  }, [records, filters])
  
  return {
    analyticsData,
    records,
    loading,
    error,
    refetch: fetchRecords
  }
} 