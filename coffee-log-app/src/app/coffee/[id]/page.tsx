'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteCoffeeButton from '@/components/coffee/DeleteCoffeeButton'
import CoffeeDetailTasteChart from '@/components/coffee/CoffeeDetailTasteChart'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Database } from '@/types/database.types'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

interface CoffeeDetailPageProps {
  params: { id: string }
}

export default function CoffeeDetailPage({ params }: CoffeeDetailPageProps) {
  const [coffee, setCoffee] = useState<CoffeeRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  
  useEffect(() => {
    async function fetchCoffee() {
      try {
        const { data: coffee, error } = await supabase
          .from('coffee_records')
          .select('*')
          .eq('id', params.id)
          .single()
        
        if (error) {
          console.error('Error fetching coffee record:', error)
          setNotFound(true)
        } else {
          setCoffee(coffee)
        }
      } catch (error) {
        console.error('Error fetching coffee record:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCoffee()
  }, [params.id])

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

  if (notFound || !coffee) {
    return (
      <Container>
        <div style={{ paddingTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h2">記録が見つかりません</Typography>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/coffee">
              <Button variant="secondary">一覧に戻る</Button>
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/coffee">
            <Button variant="secondary">← 一覧に戻る</Button>
          </Link>
        </div>

        <Card>
          <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
            {coffee.shop_name} - {coffee.coffee_name}
          </Typography>
          
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {coffee.country && (
              <div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>原産国</Typography>
                <Typography variant="body1">{coffee.country}</Typography>
              </div>
            )}
            
            {coffee.region && (
              <div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>地域</Typography>
                <Typography variant="body1">{coffee.region}</Typography>
              </div>
            )}
            
            {coffee.processing_method && (
              <div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>精製方法</Typography>
                <Typography variant="body1">{coffee.processing_method}</Typography>
              </div>
            )}
            
            {coffee.roast_level && (
              <div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>焙煎度</Typography>
                <Typography variant="body1">{coffee.roast_level}</Typography>
              </div>
            )}

            {coffee.description && (
              <div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>感想・メモ</Typography>
                <Typography variant="body1">{coffee.description}</Typography>
              </div>
            )}

            <div>
              <Typography variant="body2" style={{ fontWeight: 600 }}>記録日時</Typography>
              <Typography variant="body1">
                {coffee.consumed_at ? new Date(coffee.consumed_at).toLocaleString('ja-JP') : '日付不明'}
              </Typography>
            </div>
          </div>

          {/* テイスティングチャート */}
          <div style={{ marginBottom: '2rem' }}>
            <Typography variant="h3" style={{ marginBottom: '1rem' }}>
              テイスティング評価
            </Typography>
            <CoffeeDetailTasteChart coffee={coffee} />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end' 
          }}>
            <Link href={`/coffee/edit/${coffee.id}`}>
              <Button variant="secondary">編集</Button>
            </Link>
            <DeleteCoffeeButton coffeeId={coffee.id} />
          </div>
        </Card>
      </div>
    </Container>
  )
}