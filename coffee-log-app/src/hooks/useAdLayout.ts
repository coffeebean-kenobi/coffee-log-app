'use client'

import { useState, useEffect } from 'react'
import { useCookieConsent } from './useCookieConsent'

export interface AdPlacement {
  id: string
  type: 'banner' | 'sidebar' | 'inArticle' | 'sticky'
  position: 'top' | 'middle' | 'bottom' | 'sidebar'
  enabled: boolean
  priority: number
}

const defaultPlacements: AdPlacement[] = [
  {
    id: 'header-banner',
    type: 'banner',
    position: 'top',
    enabled: false, // ヘッダーは UX を重視して無効
    priority: 1
  },
  {
    id: 'content-top',
    type: 'banner',
    position: 'top',
    enabled: true,
    priority: 2
  },
  {
    id: 'sidebar-main',
    type: 'sidebar',
    position: 'sidebar',
    enabled: true,
    priority: 3
  },
  {
    id: 'content-middle',
    type: 'inArticle',
    position: 'middle',
    enabled: true,
    priority: 4
  },
  {
    id: 'content-bottom',
    type: 'banner',
    position: 'bottom',
    enabled: true,
    priority: 5
  }
]

export function useAdLayout() {
  const { consent } = useCookieConsent()
  const [placements, setPlacements] = useState<AdPlacement[]>(defaultPlacements)
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    // 広告クッキーの同意があり、本番環境の場合のみ広告を表示
    const shouldShowAds = consent?.advertising && process.env.NODE_ENV === 'production'
    setShowAds(shouldShowAds || false)
  }, [consent])

  const getPlacementById = (id: string) => {
    return placements.find(p => p.id === id)
  }

  const isPlacementEnabled = (id: string) => {
    const placement = getPlacementById(id)
    return showAds && placement?.enabled
  }

  const getPlacementsByPosition = (position: AdPlacement['position']) => {
    return placements
      .filter(p => p.position === position && p.enabled && showAds)
      .sort((a, b) => a.priority - b.priority)
  }

  return {
    placements,
    showAds,
    getPlacementById,
    isPlacementEnabled,
    getPlacementsByPosition
  }
} 