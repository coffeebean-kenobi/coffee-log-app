'use client'

import { useState } from 'react'

type Filters = {
  shopName?: string
  country?: string
  rating?: number
}

type Props = {
  onFilterChange: (filters: Filters) => void
}

export default function CoffeeFilter({ onFilterChange }: Props) {
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

  return (
    <div className="bg-card p-4 rounded-lg mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-card-foreground">絞り込み検索</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="shopName" className="block text-sm font-medium mb-1 text-card-foreground">
            店名
          </label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={filters.shopName}
            onChange={handleChange}
            placeholder="店名で検索"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1 text-card-foreground">
            原産国
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={filters.country}
            onChange={handleChange}
            placeholder="原産国で検索"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1 text-card-foreground">
            評価
          </label>
          <select
            id="rating"
            name="rating"
            value={filters.rating || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
      
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          リセット
        </button>
      </div>
    </div>
  );
}