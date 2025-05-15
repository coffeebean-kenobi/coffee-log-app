import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteCoffeeButton from '@/components/coffee/DeleteCoffeeButton'
import CoffeeDetailTasteChart from '@/components/coffee/CoffeeDetailTasteChart'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

export const revalidate = 0

export default async function CoffeeDetailPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  
  const { data: coffee, error } = await supabase
    .from('coffee_records')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (error || !coffee) {
    console.error('Error fetching coffee record:', error)
    notFound()
  }
  
  // 焙煎度合いの日本語表示
  const getRoastLevelText = (level: string | null) => {
    if (!level) return 'なし'
    
    const levels: Record<string, string> = {
      'light': '浅煎り',
      'medium': '中煎り',
      'medium-dark': '中深煎り',
      'dark': '深煎り'
    }
    
    return levels[level] || level
  }
  
  // 日付のフォーマット
  const formattedDate = coffee.consumed_at 
    ? new Date(coffee.consumed_at).toLocaleDateString('ja-JP')
    : '日付なし'
  
  // 星評価の表示
  const renderStars = (rating: number | null) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} style={{ 
          color: i < (rating || 0) ? '#F59E0B' : '#D1D5DB'
        }}>
          ★
        </span>
      ));
  }

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/coffee">
            <Button variant="secondary">← 一覧に戻る</Button>
          </Link>
        </div>
        
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              marginBottom: '1.5rem' 
            }}>
              <div>
                <Typography variant="h2">{coffee.shop_name}</Typography>
                {coffee.coffee_name && (
                  <Typography variant="body1" color="text.secondary">
                    {coffee.coffee_name}
                  </Typography>
                )}
                <div style={{ marginTop: '0.5rem', display: 'flex', fontSize: '1.25rem' }}>
                  {renderStars(coffee.rating)}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`/coffee/edit/${coffee.id}`}>
                  <Button variant="primary">編集</Button>
                </Link>
                <DeleteCoffeeButton coffeeId={coffee.id} />
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <Typography variant="h4" style={{ marginBottom: '1rem' }}>基本情報</Typography>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">飲んだ日</Typography>
                  <Typography variant="body1">{formattedDate}</Typography>
                </div>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">原産国</Typography>
                  <Typography variant="body1">{coffee.country || 'なし'}</Typography>
                </div>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">地域</Typography>
                  <Typography variant="body1">{coffee.region || 'なし'}</Typography>
                </div>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">農園</Typography>
                  <Typography variant="body1">{coffee.farm || 'なし'}</Typography>
                </div>
              </div>
              
              <div>
                <Typography variant="h4" style={{ marginBottom: '1rem' }}>詳細情報</Typography>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">精製方法</Typography>
                  <Typography variant="body1">{coffee.processing_method || 'なし'}</Typography>
                </div>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" color="text.secondary">焙煎度合い</Typography>
                  <Typography variant="body1">{getRoastLevelText(coffee.roast_level)}</Typography>
                </div>
              </div>
            </div>
            
            {/* 味わい評価のレーダーチャート */}
            <CoffeeDetailTasteChart coffee={coffee} />
            
            {coffee.description && (
              <div style={{ marginTop: '1.5rem' }}>
                <Typography variant="h4" style={{ marginBottom: '0.75rem' }}>感想</Typography>
                <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                  {coffee.description}
                </Typography>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Container>
  )
}