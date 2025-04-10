'use client'

import { FC } from 'react'
import { TasteRatings } from './TasteRadarChart'

interface TasteRatingInputProps {
  ratings: TasteRatings
  onChange: (ratings: TasteRatings) => void
}

const TASTE_ATTRIBUTES = [
  { key: 'acidity', label: '酸味（Acidity）' },
  { key: 'flavor', label: 'フレーバー（Flavor）' },
  { key: 'sweetness', label: '甘味（Sweetness）' },
  { key: 'mouthfeel', label: '口当たり（Mouthfeel）' },
  { key: 'body', label: 'コク（Body）' },
  { key: 'clean_cup', label: 'クリーンカップ（雑味や濁りの少なさ）' },
  { key: 'balance', label: 'バランス（Balance）' }
]

const TasteRatingInput: FC<TasteRatingInputProps> = ({ ratings, onChange }) => {
  const handleChange = (key: keyof TasteRatings, value: number) => {
    onChange({
      ...ratings,
      [key]: value
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">味わい評価（5段階）</h3>
      
      <div className="space-y-3">
        {TASTE_ATTRIBUTES.map(attr => {
          const key = attr.key as keyof TasteRatings
          const value = ratings[key] || 0
          
          return (
            <div key={attr.key} className="space-y-1">
              <div className="flex justify-between">
                <label htmlFor={`taste-${attr.key}`} className="block text-sm font-medium">
                  {attr.label}: {value}
                </label>
              </div>
              <input
                type="range"
                id={`taste-${attr.key}`}
                name={`taste-${attr.key}`}
                min="0"
                max="5"
                value={value}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TasteRatingInput 