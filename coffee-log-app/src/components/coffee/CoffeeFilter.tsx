'use client'

import { useState } from 'react'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { useThemeStyles } from '@/theme/utils'

type Filters = {
  shopName?: string
  country?: string
  rating?: number
}

type Props = {
  onFilterChange: (filters: Filters) => void
}

export default function CoffeeFilter({ onFilterChange }: Props) {
  const styles = useThemeStyles()
  const [filters, setFilters] = useState<Filters>({
    shopName: '',
    country: '',
    rating: undefined
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    const newFilters = {
      ...filters,
      [name]: value
    }
    
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      shopName: '',
      country: '',
      rating: undefined
    }
    
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  // 入力フィールドのスタイル
  const inputStyle = {
    width: '100%',
    padding: styles.spacing('sm'),
    border: '1px solid var(--color-accent-main)',
    borderRadius: styles.borderRadius('sm'),
    fontSize: styles.typography('fontSize.body1'),
    backgroundColor: 'var(--color-background-paper)',
    color: 'var(--color-text-primary)',
  }

  // ラベルのスタイル
  const labelStyle = {
    display: 'block',
    marginBottom: styles.spacing('xs'),
    fontSize: styles.typography('fontSize.body2'),
    fontWeight: styles.typography('fontWeight.medium'),
    color: 'var(--color-text-primary)',
  }

  return (
    <Card style={{ marginBottom: styles.spacing('lg') }}>
      <div style={{ padding: styles.spacing('lg') }}>
        <Typography variant="h4" style={{ marginBottom: styles.spacing('md') }}>
          絞り込み検索
        </Typography>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: styles.spacing('md'),
          marginBottom: styles.spacing('md')
        }}>
          <div>
            <label htmlFor="shopName" style={labelStyle}>
              店名
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={filters.shopName}
              onChange={handleChange}
              placeholder="店名で検索"
              style={inputStyle}
            />
          </div>
          
          <div>
            <label htmlFor="country" style={labelStyle}>
              原産国
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={filters.country}
              onChange={handleChange}
              placeholder="原産国で検索"
              style={inputStyle}
            />
          </div>
          
          <div>
            <label htmlFor="rating" style={labelStyle}>
              評価
            </label>
            <select
              id="rating"
              name="rating"
              value={filters.rating || ''}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">すべて</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ 以上 (4+)</option>
              <option value="3">★★★☆☆ 以上 (3+)</option>
              <option value="2">★★☆☆☆ 以上 (2+)</option>
              <option value="1">★☆☆☆☆ 以上 (1+)</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
              fontSize: styles.typography('fontSize.sm'),
              color: 'var(--color-text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            リセット
          </button>
        </div>
      </div>
    </Card>
  );
}