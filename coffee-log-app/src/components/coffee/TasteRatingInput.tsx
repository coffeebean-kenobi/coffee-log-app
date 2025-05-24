'use client'

import { FC, useEffect, useState } from 'react'
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if we're in the browser and if dark mode is enabled
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      
      // Listen for changes in color scheme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleChange = (key: keyof TasteRatings, value: number) => {
    onChange({
      ...ratings,
      [key]: value
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-text-primary">味わい評価（5段階）</h3>
      
      <div className="space-y-3">
        {TASTE_ATTRIBUTES.map(attr => {
          const key = attr.key as keyof TasteRatings
          const value = ratings[key] || 0
          
          return (
            <div key={attr.key} className="space-y-1">
              <div className="flex justify-between">
                <label htmlFor={`taste-${attr.key}`} className="block text-sm font-medium text-text-primary">
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
                style={{ accentColor: 'var(--color-primary-main)' }}
              />
              <div className="flex justify-between text-xs">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <span 
                    key={num} 
                    className="px-1.5 py-0.5 rounded text-text-secondary"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TasteRatingInput 