'use client'

import { useEffect, useState } from 'react'
import AdBanner from './AdBanner'
import { adUnits } from '@/config/adsense'

interface ResponsiveAdBannerProps {
  type: 'banner' | 'sidebar' | 'inArticle'
  className?: string
}

export default function ResponsiveAdBanner({ 
  type, 
  className = '' 
}: ResponsiveAdBannerProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (type === 'banner') {
    const adConfig = isMobile ? adUnits.banner.mobile : adUnits.banner.desktop
    return (
      <AdBanner
        adSlot={adConfig.slot}
        adFormat={adConfig.format}
        adSize={{ width: adConfig.width, height: adConfig.height }}
        className={className}
      />
    )
  }

  if (type === 'sidebar') {
    return (
      <AdBanner
        adSlot={adUnits.sidebar.slot}
        adFormat={adUnits.sidebar.format}
        adSize={{ width: adUnits.sidebar.width, height: adUnits.sidebar.height }}
        className={className}
      />
    )
  }

  if (type === 'inArticle') {
    return (
      <AdBanner
        adSlot={adUnits.inArticle.slot}
        adFormat={adUnits.inArticle.format}
        adLayout={adUnits.inArticle.layout}
        className={className}
      />
    )
  }

  return null
} 