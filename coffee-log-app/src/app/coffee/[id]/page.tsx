'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteCoffeeButton from '@/components/coffee/DeleteCoffeeButton'
import CoffeeDetailTasteChart from '@/components/coffee/CoffeeDetailTasteChart'
import CoffeeImageExport from '@/components/coffee/CoffeeImageExport'
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
      <style jsx>{`
        .coffee-detail-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 620px);
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        @media (max-width: 768px) {
          .coffee-detail-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .action-buttons {
            justify-content: center !important;
          }
        }
      `}</style>
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
          
          {/* メイン情報とテイスティングチャートを並列配置 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 620px)',
            gap: '2rem',
            marginBottom: '2rem'
          }} className="coffee-detail-grid">
            {/* 左側：コーヒー詳細情報 */}
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem 2rem',
                marginBottom: '1.5rem'
              }}>
                {coffee.country && (
                  <div>
                    <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.95rem' }}>原産国</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: '500' }}>{coffee.country}</Typography>
                  </div>
                )}
                
                {coffee.region && (
                  <div>
                    <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.95rem' }}>地域</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: '500' }}>{coffee.region}</Typography>
                  </div>
                )}
                
                {coffee.processing_method && (
                  <div>
                    <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.95rem' }}>精製方法</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: '500' }}>{coffee.processing_method}</Typography>
                  </div>
                )}
                
                {coffee.roast_level && (
                  <div>
                    <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.95rem' }}>焙煎度</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: '500' }}>{coffee.roast_level}</Typography>
                  </div>
                )}

                <div style={{ gridColumn: '1 / -1' }}>
                  <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.95rem' }}>記録日時</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                    {coffee.consumed_at ? new Date(coffee.consumed_at).toLocaleString('ja-JP') : '日付不明'}
                  </Typography>
                </div>
              </div>

              {coffee.description && (
                <div>
                  <Typography variant="body2" style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.95rem' }}>感想・メモ</Typography>
                  <div style={{ 
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <Typography variant="body1" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{coffee.description}</Typography>
                  </div>
                </div>
              )}
            </div>

            {/* 右側：テイスティングチャート */}
            <div>
              <Typography variant="h3" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                テイスティング評価
              </Typography>
              <div style={{ 
                minHeight: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CoffeeDetailTasteChart coffee={coffee} />
              </div>
            </div>
          </div>

          {/* 画像保存・シェア機能 */}
          <div style={{ 
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <CoffeeImageExport coffee={coffee} />
          </div>

          {/* 編集・削除ボタン */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
          }} className="action-buttons">
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