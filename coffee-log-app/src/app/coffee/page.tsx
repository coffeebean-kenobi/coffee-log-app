'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import ClientCoffeeList from './ClientCoffeeList'
import CoffeeFilter from '@/components/coffee/CoffeeFilter'
import StrategicAdPlacement from '@/components/ads/StrategicAdPlacement'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Database } from '@/types/database.types'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

type Filters = {
  shopName?: string
  country?: string
  rating?: number
}

export default function CoffeeListPage() {
  const [allCoffees, setAllCoffees] = useState<CoffeeRecord[]>([])
  const [filteredCoffees, setFilteredCoffees] = useState<CoffeeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    async function fetchCoffees() {
      try {
        const { data: coffees, error } = await supabase
          .from('coffee_records')
          .select('*')
          .order('consumed_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching coffee records:', error)
        } else {
          setAllCoffees(coffees || [])
          setFilteredCoffees(coffees || [])
        }
      } catch (error) {
        console.error('Error fetching coffee records:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCoffees()
  }, [])

  const handleFilterChange = (filters: Filters) => {
    let filtered = allCoffees

    if (filters.shopName) {
      filtered = filtered.filter(coffee => 
        coffee.shop_name?.toLowerCase().includes(filters.shopName!.toLowerCase())
      )
    }

    if (filters.country) {
      filtered = filtered.filter(coffee => 
        coffee.country?.toLowerCase().includes(filters.country!.toLowerCase())
      )
    }

    if (filters.rating) {
      filtered = filtered.filter(coffee => 
        coffee.rating && coffee.rating >= filters.rating!
      )
    }

    setFilteredCoffees(filtered)
  }

  if (loading) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <Typography variant="body1">読み込み中...</Typography>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* コンテンツ上部広告 */}
        <StrategicAdPlacement placementId="content-top" className="mb-8" />

        <div 
          style={{ 
            marginBottom: '2rem' 
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            className="sm:flex-row sm:justify-between sm:items-center sm:gap-8"
          >
            <Typography variant="h2" style={{ margin: 0 }}>コーヒー記録一覧</Typography>
            <div>
              <Link href="/coffee/add">
                <Button variant="primary">新しい記録を追加</Button>
              </Link>
            </div>
          </div>
        </div>
        
        <CoffeeFilter onFilterChange={handleFilterChange} />
        
        <ClientCoffeeList initialCoffees={filteredCoffees} />

        {/* コンテンツ下部広告 */}
        <StrategicAdPlacement placementId="content-bottom" className="mt-8" />
      </div>
    </Container>
  )
}