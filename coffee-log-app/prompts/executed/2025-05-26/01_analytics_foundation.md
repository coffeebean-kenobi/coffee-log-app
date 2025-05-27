# 01. データ分析機能の基盤実装

## 概要
Coffee Log Appのデータ分析・可視化機能の基盤を実装します。この段階では、データ分析に必要なフック、型定義、ユーティリティ関数を作成します。

## 実装する機能
1. データ分析用のReactフック（useAnalyticsData）
2. 分析データの型定義
3. 統計計算用のユーティリティ関数
4. データ集約・変換関数

## 必要なファイル作成

### 1. 型定義ファイル: `src/types/analytics.ts`
```typescript
export interface AnalyticsData {
  totalRecords: number
  averageRating: number
  favoriteShop: string | null
  mostCommonCountry: string | null
  mostCommonRoastLevel: string | null
  tasteProfile: TasteProfile
  timeSeriesData: TimeSeriesEntry[]
  shopData: ShopAnalytics[]
  countryData: CountryAnalytics[]
  roastLevelData: RoastLevelAnalytics[]
}

export interface TasteProfile {
  acidity: number
  flavor: number
  sweetness: number
  mouthfeel: number
  body: number
  clean_cup: number
  balance: number
}

export interface TimeSeriesEntry {
  date: string
  count: number
  averageRating: number
}

export interface ShopAnalytics {
  shopName: string
  count: number
  averageRating: number
  favoriteRoastLevel?: string
}

export interface CountryAnalytics {
  country: string
  count: number
  averageRating: number
  tasteProfile: TasteProfile
}

export interface RoastLevelAnalytics {
  roastLevel: string
  count: number
  averageRating: number
  tasteProfile: TasteProfile
}

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface AnalyticsFilters {
  dateRange?: DateRange
  shopName?: string
  country?: string
  roastLevel?: string
}
```

### 2. ユーティリティ関数ファイル: `src/utils/analytics.ts`
```typescript
import { CoffeeRecord } from '@/types/coffee'
import { 
  AnalyticsData, 
  TasteProfile, 
  TimeSeriesEntry, 
  ShopAnalytics, 
  CountryAnalytics, 
  RoastLevelAnalytics,
  AnalyticsFilters 
} from '@/types/analytics'
import { format, parseISO, isAfter, isBefore } from 'date-fns'

export function calculateAnalytics(records: CoffeeRecord[], filters?: AnalyticsFilters): AnalyticsData {
  const filteredRecords = filterRecords(records, filters)
  
  return {
    totalRecords: filteredRecords.length,
    averageRating: calculateAverageRating(filteredRecords),
    favoriteShop: findFavoriteShop(filteredRecords),
    mostCommonCountry: findMostCommonCountry(filteredRecords),
    mostCommonRoastLevel: findMostCommonRoastLevel(filteredRecords),
    tasteProfile: calculateAverageTasteProfile(filteredRecords),
    timeSeriesData: generateTimeSeriesData(filteredRecords),
    shopData: generateShopAnalytics(filteredRecords),
    countryData: generateCountryAnalytics(filteredRecords),
    roastLevelData: generateRoastLevelAnalytics(filteredRecords)
  }
}

function filterRecords(records: CoffeeRecord[], filters?: AnalyticsFilters): CoffeeRecord[] {
  if (!filters) return records
  
  return records.filter(record => {
    // 日付範囲フィルタ
    if (filters.dateRange?.startDate && record.consumed_at) {
      const consumedDate = parseISO(record.consumed_at)
      if (isBefore(consumedDate, filters.dateRange.startDate)) return false
    }
    
    if (filters.dateRange?.endDate && record.consumed_at) {
      const consumedDate = parseISO(record.consumed_at)
      if (isAfter(consumedDate, filters.dateRange.endDate)) return false
    }
    
    // ショップ名フィルタ
    if (filters.shopName && !record.shop_name?.toLowerCase().includes(filters.shopName.toLowerCase())) {
      return false
    }
    
    // 原産国フィルタ
    if (filters.country && !record.country?.toLowerCase().includes(filters.country.toLowerCase())) {
      return false
    }
    
    // 焙煎度フィルタ
    if (filters.roastLevel && record.roast_level !== filters.roastLevel) {
      return false
    }
    
    return true
  })
}

function calculateAverageRating(records: CoffeeRecord[]): number {
  if (records.length === 0) return 0
  const total = records.reduce((sum, record) => sum + (record.rating || 0), 0)
  return Math.round((total / records.length) * 10) / 10
}

function findFavoriteShop(records: CoffeeRecord[]): string | null {
  if (records.length === 0) return null
  
  const shopCounts = records.reduce((acc, record) => {
    if (record.shop_name) {
      acc[record.shop_name] = (acc[record.shop_name] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  return Object.keys(shopCounts).reduce((a, b) => shopCounts[a] > shopCounts[b] ? a : b)
}

function findMostCommonCountry(records: CoffeeRecord[]): string | null {
  if (records.length === 0) return null
  
  const countryCounts = records.reduce((acc, record) => {
    if (record.country) {
      acc[record.country] = (acc[record.country] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(countryCounts).length === 0) return null
  
  return Object.keys(countryCounts).reduce((a, b) => countryCounts[a] > countryCounts[b] ? a : b)
}

function findMostCommonRoastLevel(records: CoffeeRecord[]): string | null {
  if (records.length === 0) return null
  
  const roastCounts = records.reduce((acc, record) => {
    if (record.roast_level) {
      acc[record.roast_level] = (acc[record.roast_level] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(roastCounts).length === 0) return null
  
  return Object.keys(roastCounts).reduce((a, b) => roastCounts[a] > roastCounts[b] ? a : b)
}

function calculateAverageTasteProfile(records: CoffeeRecord[]): TasteProfile {
  if (records.length === 0) {
    return { acidity: 0, flavor: 0, sweetness: 0, mouthfeel: 0, body: 0, clean_cup: 0, balance: 0 }
  }
  
  const totals = records.reduce((acc, record) => ({
    acidity: acc.acidity + (record.acidity || 0),
    flavor: acc.flavor + (record.flavor || 0),
    sweetness: acc.sweetness + (record.sweetness || 0),
    mouthfeel: acc.mouthfeel + (record.mouthfeel || 0),
    body: acc.body + (record.body || 0),
    clean_cup: acc.clean_cup + (record.clean_cup || 0),
    balance: acc.balance + (record.balance || 0)
  }), { acidity: 0, flavor: 0, sweetness: 0, mouthfeel: 0, body: 0, clean_cup: 0, balance: 0 })
  
  return {
    acidity: Math.round((totals.acidity / records.length) * 10) / 10,
    flavor: Math.round((totals.flavor / records.length) * 10) / 10,
    sweetness: Math.round((totals.sweetness / records.length) * 10) / 10,
    mouthfeel: Math.round((totals.mouthfeel / records.length) * 10) / 10,
    body: Math.round((totals.body / records.length) * 10) / 10,
    clean_cup: Math.round((totals.clean_cup / records.length) * 10) / 10,
    balance: Math.round((totals.balance / records.length) * 10) / 10
  }
}

function generateTimeSeriesData(records: CoffeeRecord[]): TimeSeriesEntry[] {
  if (records.length === 0) return []
  
  // 日付別にグループ化
  const dateGroups = records.reduce((acc, record) => {
    if (record.consumed_at) {
      const date = format(parseISO(record.consumed_at), 'yyyy-MM-dd')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(record)
    }
    return acc
  }, {} as Record<string, CoffeeRecord[]>)
  
  return Object.entries(dateGroups)
    .map(([date, records]) => ({
      date,
      count: records.length,
      averageRating: calculateAverageRating(records)
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function generateShopAnalytics(records: CoffeeRecord[]): ShopAnalytics[] {
  const shopGroups = records.reduce((acc, record) => {
    if (record.shop_name) {
      if (!acc[record.shop_name]) {
        acc[record.shop_name] = []
      }
      acc[record.shop_name].push(record)
    }
    return acc
  }, {} as Record<string, CoffeeRecord[]>)
  
  return Object.entries(shopGroups)
    .map(([shopName, records]) => ({
      shopName,
      count: records.length,
      averageRating: calculateAverageRating(records),
      favoriteRoastLevel: findMostCommonRoastLevel(records)
    }))
    .sort((a, b) => b.count - a.count)
}

function generateCountryAnalytics(records: CoffeeRecord[]): CountryAnalytics[] {
  const countryGroups = records.reduce((acc, record) => {
    if (record.country) {
      if (!acc[record.country]) {
        acc[record.country] = []
      }
      acc[record.country].push(record)
    }
    return acc
  }, {} as Record<string, CoffeeRecord[]>)
  
  return Object.entries(countryGroups)
    .map(([country, records]) => ({
      country,
      count: records.length,
      averageRating: calculateAverageRating(records),
      tasteProfile: calculateAverageTasteProfile(records)
    }))
    .sort((a, b) => b.count - a.count)
}

function generateRoastLevelAnalytics(records: CoffeeRecord[]): RoastLevelAnalytics[] {
  const roastGroups = records.reduce((acc, record) => {
    if (record.roast_level) {
      if (!acc[record.roast_level]) {
        acc[record.roast_level] = []
      }
      acc[record.roast_level].push(record)
    }
    return acc
  }, {} as Record<string, CoffeeRecord[]>)
  
  return Object.entries(roastGroups)
    .map(([roastLevel, records]) => ({
      roastLevel,
      count: records.length,
      averageRating: calculateAverageRating(records),
      tasteProfile: calculateAverageTasteProfile(records)
    }))
    .sort((a, b) => b.count - a.count)
}

export const ROAST_LEVEL_LABELS = {
  'light': 'ライトロースト',
  'medium': 'ミディアムロースト',
  'medium-dark': 'ミディアムダークロースト',
  'dark': 'ダークロースト'
} as const
```

### 3. Reactフック: `src/hooks/useAnalyticsData.ts`
```typescript
import { useState, useEffect, useMemo } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { CoffeeRecord } from '@/types/coffee'
import { AnalyticsData, AnalyticsFilters } from '@/types/analytics'
import { calculateAnalytics } from '@/utils/analytics'

export function useAnalyticsData(filters?: AnalyticsFilters) {
  const [records, setRecords] = useState<CoffeeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClientComponentClient()
  
  useEffect(() => {
    async function fetchRecords() {
      try {
        setLoading(true)
        setError(null)
        
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          throw new Error('認証されていません')
        }
        
        const { data, error } = await supabase
          .from('coffee_records')
          .select('*')
          .eq('user_id', user.id)
          .order('consumed_at', { ascending: false })
        
        if (error) throw error
        
        setRecords(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }
    
    fetchRecords()
  }, [supabase])
  
  const analyticsData: AnalyticsData = useMemo(() => {
    return calculateAnalytics(records, filters)
  }, [records, filters])
  
  return {
    analyticsData,
    records,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      // 再フェッチのロジックは useEffect で自動実行される
    }
  }
}
```

## 実装指示

1. **型定義の作成**: `src/types/analytics.ts`ファイルを作成し、上記の型定義を実装してください。

2. **ユーティリティ関数の作成**: `src/utils/analytics.ts`ファイルを作成し、データ分析用の関数を実装してください。

3. **Reactフックの作成**: `src/hooks/useAnalyticsData.ts`ファイルを作成し、データ分析用のフックを実装してください。

4. **型定義の確認**: 既存の`src/types/coffee.ts`ファイルと整合性を確認し、必要に応じて調整してください。

## 注意点

- 既存のコードとの互換性を保つこと
- TypeScriptの型安全性を確保すること
- date-fnsライブラリを適切に使用すること
- Supabaseクライアントの使用方法を既存コードに合わせること
- エラーハンドリングを適切に実装すること

## 次のステップ

この基盤が完成したら、次のプロンプト（02_analytics_charts.md）でChart.jsを使用したチャートコンポーネントを実装します。 