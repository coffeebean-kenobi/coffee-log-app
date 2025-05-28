'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ABTestVariant {
  id: string
  name: string
  weight: number // 配分比率（0-1）
  config: Record<string, any>
}

export interface ABTest {
  id: string
  name: string
  description: string
  variants: ABTestVariant[]
  isActive: boolean
  startDate: Date
  endDate?: Date
  targetMetric: string
}

interface ABTestResult {
  variantId: string
  impressions: number
  clicks: number
  revenue: number
  ctr: number
  rpm: number
}

const STORAGE_KEY = 'coffee-log-ab-tests'
const USER_VARIANT_KEY = 'coffee-log-user-variants'

// デフォルトA/Bテスト設定
const defaultTests: ABTest[] = [
  {
    id: 'ad-density-test',
    name: '広告密度最適化',
    description: 'フィード内広告の配置間隔を最適化',
    variants: [
      { id: 'low', name: '低密度（7間隔）', weight: 0.33, config: { adInterval: 7 } },
      { id: 'medium', name: '中密度（5間隔）', weight: 0.34, config: { adInterval: 5 } },
      { id: 'high', name: '高密度（3間隔）', weight: 0.33, config: { adInterval: 3 } }
    ],
    isActive: true,
    startDate: new Date(),
    targetMetric: 'rpm'
  },
  {
    id: 'sidebar-position-test',
    name: 'サイドバー広告位置',
    description: 'サイドバー広告の最適な位置を検証',
    variants: [
      { id: 'top', name: '上部配置', weight: 0.5, config: { sidebarPosition: 'top' } },
      { id: 'middle', name: '中央配置', weight: 0.5, config: { sidebarPosition: 'middle' } }
    ],
    isActive: true,
    startDate: new Date(),
    targetMetric: 'clicks'
  }
]

export function useABTest() {
  const [tests, setTests] = useState<ABTest[]>(defaultTests)
  const [userVariants, setUserVariants] = useState<Record<string, string>>({})
  const [isInitialized, setIsInitialized] = useState(false)

  // ユーザーバリアント情報の読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedVariants = localStorage.getItem(USER_VARIANT_KEY)
      if (savedVariants) {
        setUserVariants(JSON.parse(savedVariants))
      }
    } catch (error) {
      console.warn('A/Bテストバリアント読み込みエラー:', error)
    }

    setIsInitialized(true)
  }, [])

  // ユーザーバリアント情報の保存
  const saveUserVariants = useCallback((variants: Record<string, string>) => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(USER_VARIANT_KEY, JSON.stringify(variants))
      setUserVariants(variants)
    } catch (error) {
      console.error('A/Bテストバリアント保存エラー:', error)
    }
  }, [])

  // テストのバリアント割り当て
  const assignVariant = useCallback((testId: string): string => {
    // 既に割り当て済みの場合は既存のバリアントを返す
    if (userVariants[testId]) {
      return userVariants[testId]
    }

    const test = tests.find(t => t.id === testId && t.isActive)
    if (!test) {
      return 'control'
    }

    // 重み付きランダム選択
    const random = Math.random()
    let cumulativeWeight = 0

    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        const newVariants = { ...userVariants, [testId]: variant.id }
        saveUserVariants(newVariants)
        return variant.id
      }
    }

    // フォールバック
    const firstVariant = test.variants[0]?.id || 'control'
    const newVariants = { ...userVariants, [testId]: firstVariant }
    saveUserVariants(newVariants)
    return firstVariant
  }, [tests, userVariants, saveUserVariants])

  // バリアント設定の取得
  const getVariantConfig = useCallback((testId: string): Record<string, any> => {
    const variantId = assignVariant(testId)
    const test = tests.find(t => t.id === testId)
    const variant = test?.variants.find(v => v.id === variantId)
    
    return variant?.config || {}
  }, [tests, assignVariant])

  // テスト結果の記録
  const recordEvent = useCallback((testId: string, event: string, value?: number) => {
    if (!isInitialized) return

    const variantId = userVariants[testId]
    if (!variantId) return

    // Google Analytics 4にイベント送信
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_event', {
        test_id: testId,
        variant_id: variantId,
        event_type: event,
        value: value || 1,
        custom_parameter_1: 'coffee_log_ab_test'
      })
    }

    // 独自の分析システムがある場合はここで記録
    console.log(`A/Bテストイベント: ${testId}/${variantId}/${event}`, value)
  }, [userVariants, isInitialized])

  return {
    tests,
    userVariants,
    isInitialized,
    assignVariant,
    getVariantConfig,
    recordEvent
  }
} 