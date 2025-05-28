'use client'

import { useState, useEffect, useCallback } from 'react'
import { useABTest } from './useABTest'

export interface RevenueMetrics {
  impressions: number
  clicks: number
  revenue: number
  ctr: number
  rpm: number
  period: 'today' | 'week' | 'month' | 'total'
  lastUpdated: Date
}

interface DailyRevenue {
  date: string
  impressions: number
  clicks: number
  revenue: number
}

export function useRevenueTracking() {
  const [metrics, setMetrics] = useState<RevenueMetrics[]>([])
  const [dailyData, setDailyData] = useState<DailyRevenue[]>([])
  const [loading, setLoading] = useState(true)
  const [targetProgress, setTargetProgress] = useState<{
    current: number
    target: number
    percentage: number
    onTrack: boolean
  }>({ current: 0, target: 20, percentage: 0, onTrack: false })

  const { recordEvent } = useABTest()

  // 収益データの取得（実際の実装ではAdSense APIを使用）
  const fetchRevenueData = useCallback(async () => {
    setLoading(true)
    
    try {
      // モックデータ（実際の実装ではAdSense Management APIを使用）
      const mockDailyData: DailyRevenue[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        
        return {
          date: date.toISOString().split('T')[0],
          impressions: Math.floor(Math.random() * 500) + 100,
          clicks: Math.floor(Math.random() * 25) + 5,
          revenue: Number((Math.random() * 2 + 0.5).toFixed(2))
        }
      })

      // 期間別メトリクス計算
      const calculateMetrics = (data: DailyRevenue[], days: number): RevenueMetrics => {
        const filtered = data.slice(-days)
        const totals = filtered.reduce(
          (acc, day) => ({
            impressions: acc.impressions + day.impressions,
            clicks: acc.clicks + day.clicks,
            revenue: acc.revenue + day.revenue
          }),
          { impressions: 0, clicks: 0, revenue: 0 }
        )

        return {
          ...totals,
          ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
          rpm: totals.impressions > 0 ? (totals.revenue / totals.impressions) * 1000 : 0,
          period: days === 1 ? 'today' : days === 7 ? 'week' : days === 30 ? 'month' : 'total',
          lastUpdated: new Date()
        }
      }

      const metricsData = [
        calculateMetrics(mockDailyData, 1),
        calculateMetrics(mockDailyData, 7),
        calculateMetrics(mockDailyData, 30),
        calculateMetrics(mockDailyData, mockDailyData.length)
      ]

      setDailyData(mockDailyData)
      setMetrics(metricsData)

      // 月間目標進捗計算
      const monthlyRevenue = metricsData.find(m => m.period === 'month')?.revenue || 0
      const targetRevenue = 20
      const percentage = (monthlyRevenue / targetRevenue) * 100
      const daysInMonth = new Date().getDate()
      const expectedRevenue = (targetRevenue / 30) * daysInMonth
      const onTrack = monthlyRevenue >= expectedRevenue * 0.8

      setTargetProgress({
        current: monthlyRevenue,
        target: targetRevenue,
        percentage: Math.min(percentage, 100),
        onTrack
      })

    } catch (error) {
      console.error('収益データ取得エラー:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 広告クリックの記録
  const trackAdClick = useCallback((adUnit: string, testId?: string) => {
    // Google Analytics イベント送信
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_click', {
        ad_unit: adUnit,
        value: 1
      })
    }

    // A/Bテストイベント記録
    if (testId) {
      recordEvent(testId, 'ad_click')
    }
  }, [recordEvent])

  // 広告インプレッションの記録
  const trackAdImpression = useCallback((adUnit: string, testId?: string) => {
    // Google Analytics イベント送信
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_impression', {
        ad_unit: adUnit,
        value: 1
      })
    }

    // A/Bテストイベント記録
    if (testId) {
      recordEvent(testId, 'ad_impression')
    }
  }, [recordEvent])

  useEffect(() => {
    fetchRevenueData()
    
    // 定期的にデータを更新（本番環境では1時間ごと）
    const interval = setInterval(fetchRevenueData, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRevenueData])

  return {
    metrics,
    dailyData,
    loading,
    targetProgress,
    trackAdClick,
    trackAdImpression,
    refreshData: fetchRevenueData
  }
} 