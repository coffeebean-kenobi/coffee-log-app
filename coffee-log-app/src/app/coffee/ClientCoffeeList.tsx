'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import CoffeeList from '@/components/coffee/CoffeeList'
import CoffeeFilter from '@/components/coffee/CoffeeFilter'
import { Database } from '@/types/database.types'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

export default function ClientCoffeeList({
  initialCoffees
}: {
  initialCoffees: CoffeeRecord[]
}) {
  const [coffees, setCoffees] = useState<CoffeeRecord[]>(initialCoffees)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchCoffees = async (filters: {
    shopName?: string
    country?: string
    rating?: number
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      let query = supabase
        .from('coffee_records')
        .select('*')
        .order('consumed_at', { ascending: false })
      
      if (filters.shopName) {
        query = query.ilike('shop_name', `%${filters.shopName}%`)
      }
      
      if (filters.country) {
        query = query.ilike('country', `%${filters.country}%`)
      }
      
      if (filters.rating) {
        query = query.gte('rating', filters.rating)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      
      setCoffees(data || [])
    } catch (err: any) {
      console.error('フィルタリングエラー:', err)
      setError('データの取得中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: {
    shopName?: string
    country?: string
    rating?: number
  }) => {
    fetchCoffees(filters)
  }

  return (
    <>
      <CoffeeFilter onFilterChange={handleFilterChange} />
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      ) : (
        <CoffeeList coffees={coffees} />
      )}
    </>
  )
}