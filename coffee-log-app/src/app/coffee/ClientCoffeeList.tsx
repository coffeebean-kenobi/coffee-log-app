'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database } from '@/types/database.types'
import { Card } from '@/components/Card'
import { Typography } from '@/components/Typography'
import { useThemeStyles } from '@/theme/utils'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

type ClientCoffeeListProps = {
  initialCoffees: CoffeeRecord[]
}

export default function ClientCoffeeList({ initialCoffees }: ClientCoffeeListProps) {
  const [coffees] = useState<CoffeeRecord[]>(initialCoffees)
  const styles = useThemeStyles()

  if (coffees.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: styles.spacing('xl') }}>
        <Typography variant="h4">記録がありません</Typography>
        <Typography variant="body1" style={{ marginTop: styles.spacing('md') }}>
          まだコーヒーの記録がありません。「新しい記録を追加」から始めましょう。
        </Typography>
      </div>
    )
  }

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: styles.spacing('lg')
    }}>
      {coffees.map((coffee) => (
        <Link key={coffee.id} href={`/coffee/${coffee.id}`} style={{ textDecoration: 'none' }}>
          <Card>
            <div>
              <Typography variant="h4">{coffee.coffee_name || coffee.shop_name}</Typography>
              <Typography variant="body2" color="secondary" style={{ marginTop: styles.spacing('xs') }}>
                {coffee.consumed_at ? new Date(coffee.consumed_at).toLocaleDateString('ja-JP') : '日付不明'}
              </Typography>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: styles.spacing('sm'),
                marginBottom: styles.spacing('sm')
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: styles.color('accent.main'),
                  marginRight: styles.spacing('sm'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: styles.color('background.paper'),
                  fontSize: styles.typography('fontSize.h4'),
                  fontWeight: 'bold'
                }}>
                  ☕
                </div>
                <div>
                  <Typography variant="body1">{coffee.shop_name}</Typography>
                  <Typography variant="body2" color="secondary">
                    {coffee.country ? `原産地: ${coffee.country}` : '原産地: 不明'}
                  </Typography>
                  {coffee.roast_level && (
                    <Typography variant="body2" color="secondary">
                      焙煎: {coffee.roast_level === 'light' ? '浅煎り' : 
                             coffee.roast_level === 'medium' ? '中煎り' : 
                             coffee.roast_level === 'medium-dark' ? '中深煎り' : '深煎り'}
                    </Typography>
                  )}
                </div>
              </div>
              
              <Typography variant="body1" style={{ marginTop: styles.spacing('sm') }}>
                評価: {coffee.rating ? `${coffee.rating}/5` : '未評価'}
              </Typography>
              {coffee.description && (
                <Typography 
                  variant="body2" 
                  style={{ 
                    marginTop: styles.spacing('sm'),
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {coffee.description}
                </Typography>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}