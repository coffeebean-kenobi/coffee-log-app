'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee } from '@/types/coffee'
import { Card } from '@/components/Card'
import { Typography } from '@/components/Typography'
import { useThemeStyles } from '@/theme/utils'

type ClientCoffeeListProps = {
  initialCoffees: Coffee[]
}

export default function ClientCoffeeList({ initialCoffees }: ClientCoffeeListProps) {
  const [coffees] = useState<Coffee[]>(initialCoffees)
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
              <Typography variant="h4">{coffee.name}</Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginTop: styles.spacing('xs') }}>
                {new Date(coffee.consumed_at).toLocaleDateString('ja-JP')}
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
                  backgroundColor: coffee.color || styles.color('accent.main'),
                  marginRight: styles.spacing('sm')
                }} />
                <div>
                  <Typography variant="body1">{coffee.roaster || '不明'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {coffee.origin ? `原産地: ${coffee.origin}` : '原産地: 不明'}
                  </Typography>
                </div>
              </div>
              
              <Typography variant="body1" style={{ marginTop: styles.spacing('sm') }}>
                評価: {coffee.rating ? `${coffee.rating}/5` : '未評価'}
              </Typography>
              {coffee.notes && (
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
                  {coffee.notes}
                </Typography>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}