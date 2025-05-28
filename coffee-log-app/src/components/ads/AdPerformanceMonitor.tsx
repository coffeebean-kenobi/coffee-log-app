'use client'

import { useEffect, useState } from 'react'

interface AdMetrics {
  impressions: number
  clicks: number
  ctr: number
  rpm: number
  lastUpdated: Date
}

export default function AdPerformanceMonitor() {
  const [metrics, setMetrics] = useState<AdMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 開発環境でのみ表示
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }
  }, [])

  // AdSenseパフォーマンス API（実際の実装では Google AdSense Management API を使用）
  useEffect(() => {
    if (!isVisible) return

    const fetchMetrics = async () => {
      // 実際の実装では AdSense Management API からデータを取得
      // ここではモックデータを使用
      const mockMetrics: AdMetrics = {
        impressions: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 50) + 5,
        ctr: Number((Math.random() * 5 + 1).toFixed(2)),
        rpm: Number((Math.random() * 3 + 0.5).toFixed(2)),
        lastUpdated: new Date()
      }

      setMetrics(mockMetrics)
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // 1分ごとに更新

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible || !metrics) return null

  return (
    <div 
      className="fixed bottom-4 right-4 rounded-lg p-4 shadow-lg text-sm max-w-xs z-40"
      style={{
        backgroundColor: 'var(--color-background-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
        📊 広告パフォーマンス（開発用）
      </h4>
      <div className="space-y-1" style={{ color: 'var(--color-text-muted)' }}>
        <div>インプレッション: {metrics.impressions.toLocaleString()}</div>
        <div>クリック: {metrics.clicks.toLocaleString()}</div>
        <div>CTR: {metrics.ctr}%</div>
        <div>RPM: ${metrics.rpm}</div>
        <div className="text-xs">
          更新: {metrics.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
} 