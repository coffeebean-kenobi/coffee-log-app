export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      coffee_records: {
        Row: {
          id: string
          user_id: string
          shop_name: string
          coffee_name: string | null
          country: string | null
          region: string | null
          farm: string | null
          processing_method: string | null
          roast_level: 'light' | 'medium' | 'medium-dark' | 'dark' | null
          rating: number | null
          description: string | null
          consumed_at: string | null
          created_at: string
          updated_at: string
          acidity: number | null
          flavor: number | null
          sweetness: number | null
          mouthfeel: number | null
          body: number | null
          clean_cup: number | null
          balance: number | null
        }
        Insert: {
          id?: string
          user_id: string
          shop_name: string
          coffee_name?: string | null
          country?: string | null
          region?: string | null
          farm?: string | null
          processing_method?: string | null
          roast_level?: 'light' | 'medium' | 'medium-dark' | 'dark' | null
          rating?: number | null
          description?: string | null
          consumed_at?: string | null
          created_at?: string
          updated_at?: string
          acidity?: number | null
          flavor?: number | null
          sweetness?: number | null
          mouthfeel?: number | null
          body?: number | null
          clean_cup?: number | null
          balance?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          shop_name?: string
          coffee_name?: string | null
          country?: string | null
          region?: string | null
          farm?: string | null
          processing_method?: string | null
          roast_level?: 'light' | 'medium' | 'medium-dark' | 'dark' | null
          rating?: number | null
          description?: string | null
          consumed_at?: string | null
          created_at?: string
          updated_at?: string
          acidity?: number | null
          flavor?: number | null
          sweetness?: number | null
          mouthfeel?: number | null
          body?: number | null
          clean_cup?: number | null
          balance?: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      roast_level: 'light' | 'medium' | 'medium-dark' | 'dark'
    }
  }
}