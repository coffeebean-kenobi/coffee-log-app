'use client'

import { useAdLayout } from '@/hooks/useAdLayout'
import { useABTest } from '@/hooks/useABTest'
import ResponsiveAdBanner from './ResponsiveAdBanner'

interface StrategicAdPlacementProps {
  placementId: string
  className?: string
  fallback?: React.ReactNode
}

export default function StrategicAdPlacement({ 
  placementId, 
  className = '',
  fallback = null 
}: StrategicAdPlacementProps) {
  const { isPlacementEnabled, getPlacementById } = useAdLayout()
  const { getVariantConfig } = useABTest()
  
  if (!isPlacementEnabled(placementId)) {
    return fallback ? <>{fallback}</> : null
  }

  const placement = getPlacementById(placementId)
  if (!placement) return null

  // サイドバー広告のA/Bテスト設定を適用
  const sidebarConfig = getVariantConfig('sidebar-position-test')
  const testId = placement.type === 'sidebar' ? 'sidebar-position-test' : undefined

  return (
    <div className={`strategic-ad-placement ${className}`} data-placement={placementId}>
      <ResponsiveAdBanner 
        type={placement.type as 'banner' | 'sidebar' | 'inArticle'} 
        className="mb-6"
        testId={testId}
      />
    </div>
  )
} 