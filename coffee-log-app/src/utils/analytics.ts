import { Coffee } from '@/types/coffee'
import { 
  AnalyticsData, 
  TasteProfile, 
  TimeSeriesEntry, 
  ShopAnalytics, 
  OriginAnalytics, 
  BrewMethodAnalytics,
  AnalyticsFilters 
} from '@/types/analytics'
import { format, parseISO, isAfter, isBefore } from 'date-fns'

export function calculateAnalytics(records: Coffee[], filters?: AnalyticsFilters): AnalyticsData {
  const filteredRecords = filterRecords(records, filters)
  
  return {
    totalRecords: filteredRecords.length,
    averageRating: calculateAverageRating(filteredRecords),
    favoriteShop: findFavoriteShop(filteredRecords),
    mostCommonOrigin: findMostCommonOrigin(filteredRecords),
    mostCommonBrewMethod: findMostCommonBrewMethod(filteredRecords),
    tasteProfile: calculateAverageTasteProfile(filteredRecords),
    timeSeriesData: generateTimeSeriesData(filteredRecords),
    shopData: generateShopAnalytics(filteredRecords),
    originData: generateOriginAnalytics(filteredRecords),
    brewMethodData: generateBrewMethodAnalytics(filteredRecords)
  }
}

function filterRecords(records: Coffee[], filters?: AnalyticsFilters): Coffee[] {
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
    
    // 原産地フィルタ
    if (filters.origin && !record.origin?.toLowerCase().includes(filters.origin.toLowerCase())) {
      return false
    }
    
    // 抽出方法フィルタ
    if (filters.brewMethod && record.brew_method !== filters.brewMethod) {
      return false
    }
    
    return true
  })
}

function calculateAverageRating(records: Coffee[]): number {
  if (records.length === 0) return 0
  const total = records.reduce((sum, record) => sum + (record.rating || 0), 0)
  return Math.round((total / records.length) * 10) / 10
}

function findFavoriteShop(records: Coffee[]): string | null {
  if (records.length === 0) return null
  
  const shopCounts = records.reduce((acc, record) => {
    if (record.shop_name) {
      acc[record.shop_name] = (acc[record.shop_name] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(shopCounts).length === 0) return null
  
  return Object.keys(shopCounts).reduce((a, b) => shopCounts[a] > shopCounts[b] ? a : b)
}

function findMostCommonOrigin(records: Coffee[]): string | null {
  if (records.length === 0) return null
  
  const originCounts = records.reduce((acc, record) => {
    if (record.origin) {
      acc[record.origin] = (acc[record.origin] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(originCounts).length === 0) return null
  
  return Object.keys(originCounts).reduce((a, b) => originCounts[a] > originCounts[b] ? a : b)
}

function findMostCommonBrewMethod(records: Coffee[]): string | null {
  if (records.length === 0) return null
  
  const brewCounts = records.reduce((acc, record) => {
    if (record.brew_method) {
      acc[record.brew_method] = (acc[record.brew_method] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(brewCounts).length === 0) return null
  
  return Object.keys(brewCounts).reduce((a, b) => brewCounts[a] > brewCounts[b] ? a : b)
}

function calculateAverageTasteProfile(records: Coffee[]): TasteProfile {
  if (records.length === 0) {
    return { acidity: 0, flavor: 0, body: 0, balance: 0, overall: 0, aroma: 0, aftertaste: 0 }
  }
  
  const totals = records.reduce((acc, record) => ({
    acidity: acc.acidity + (record.acidity || 0),
    flavor: acc.flavor + (record.flavor || 0),
    body: acc.body + (record.body || 0),
    balance: acc.balance + (record.balance || 0),
    overall: acc.overall + (record.overall || 0),
    aroma: acc.aroma + (record.aroma || 0),
    aftertaste: acc.aftertaste + (record.aftertaste || 0)
  }), { acidity: 0, flavor: 0, body: 0, balance: 0, overall: 0, aroma: 0, aftertaste: 0 })
  
  return {
    acidity: Math.round((totals.acidity / records.length) * 10) / 10,
    flavor: Math.round((totals.flavor / records.length) * 10) / 10,
    body: Math.round((totals.body / records.length) * 10) / 10,
    balance: Math.round((totals.balance / records.length) * 10) / 10,
    overall: Math.round((totals.overall / records.length) * 10) / 10,
    aroma: Math.round((totals.aroma / records.length) * 10) / 10,
    aftertaste: Math.round((totals.aftertaste / records.length) * 10) / 10
  }
}

function generateTimeSeriesData(records: Coffee[]): TimeSeriesEntry[] {
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
  }, {} as Record<string, Coffee[]>)
  
  return Object.entries(dateGroups)
    .map(([date, records]) => ({
      date,
      count: records.length,
      averageRating: calculateAverageRating(records)
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function generateShopAnalytics(records: Coffee[]): ShopAnalytics[] {
  const shopGroups = records.reduce((acc, record) => {
    if (record.shop_name) {
      if (!acc[record.shop_name]) {
        acc[record.shop_name] = []
      }
      acc[record.shop_name].push(record)
    }
    return acc
  }, {} as Record<string, Coffee[]>)
  
  return Object.entries(shopGroups)
    .map(([shopName, records]) => ({
      shopName,
      count: records.length,
      averageRating: calculateAverageRating(records),
      favoriteBrewMethod: findMostCommonBrewMethod(records) || undefined
    }))
    .sort((a, b) => b.count - a.count)
}

function generateOriginAnalytics(records: Coffee[]): OriginAnalytics[] {
  const originGroups = records.reduce((acc, record) => {
    if (record.origin) {
      if (!acc[record.origin]) {
        acc[record.origin] = []
      }
      acc[record.origin].push(record)
    }
    return acc
  }, {} as Record<string, Coffee[]>)
  
  return Object.entries(originGroups)
    .map(([origin, records]) => ({
      origin,
      count: records.length,
      averageRating: calculateAverageRating(records),
      tasteProfile: calculateAverageTasteProfile(records)
    }))
    .sort((a, b) => b.count - a.count)
}

function generateBrewMethodAnalytics(records: Coffee[]): BrewMethodAnalytics[] {
  const brewGroups = records.reduce((acc, record) => {
    if (record.brew_method) {
      if (!acc[record.brew_method]) {
        acc[record.brew_method] = []
      }
      acc[record.brew_method].push(record)
    }
    return acc
  }, {} as Record<string, Coffee[]>)
  
  return Object.entries(brewGroups)
    .map(([brewMethod, records]) => ({
      brewMethod,
      count: records.length,
      averageRating: calculateAverageRating(records),
      tasteProfile: calculateAverageTasteProfile(records)
    }))
    .sort((a, b) => b.count - a.count)
}

export const BREW_METHOD_LABELS = {
  'drip': 'ドリップ',
  'espresso': 'エスプレッソ',
  'french-press': 'フレンチプレス',
  'pour-over': 'ハンドドリップ',
  'aeropress': 'エアロプレス',
  'cold-brew': 'コールドブリュー'
} as const