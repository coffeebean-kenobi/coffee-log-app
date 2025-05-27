export interface AnalyticsData {
  totalRecords: number
  averageRating: number
  favoriteShop: string | null
  mostCommonOrigin: string | null
  mostCommonBrewMethod: string | null
  tasteProfile: TasteProfile
  timeSeriesData: TimeSeriesEntry[]
  shopData: ShopAnalytics[]
  originData: OriginAnalytics[]
  brewMethodData: BrewMethodAnalytics[]
}

export interface TasteProfile {
  acidity: number
  flavor: number
  body: number
  balance: number
  overall: number
  aroma: number
  aftertaste: number
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
  favoriteBrewMethod?: string
}

export interface OriginAnalytics {
  origin: string
  count: number
  averageRating: number
  tasteProfile: TasteProfile
}

export interface BrewMethodAnalytics {
  brewMethod: string
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
  origin?: string
  brewMethod?: string
} 