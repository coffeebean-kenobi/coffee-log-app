'use client'

import { useMemo } from 'react'
import { useAdLayout } from '@/hooks/useAdLayout'
import { useABTest } from '@/hooks/useABTest'
import ResponsiveAdBanner from './ResponsiveAdBanner'

interface InFeedAdComponentProps {
  itemIndex: number
  totalItems: number
  adInterval?: number
  className?: string
}

export default function InFeedAdComponent({
  itemIndex,
  totalItems,
  adInterval = 5, // デフォルト値（A/Bテストで上書きされる可能性あり）
  className = ''
}: InFeedAdComponentProps) {
  const { showAds } = useAdLayout()
  const { getVariantConfig } = useABTest()

  // A/Bテストから広告密度設定を取得
  const adDensityConfig = getVariantConfig('ad-density-test')
  const effectiveAdInterval = adDensityConfig.adInterval || adInterval

  const shouldShowAd = useMemo(() => {
    // 広告表示が有効で、指定間隔で広告を表示
    return showAds && 
           itemIndex > 0 && 
           (itemIndex + 1) % effectiveAdInterval === 0 &&
           itemIndex < totalItems - 1 // 最後のアイテムの後には表示しない
  }, [showAds, itemIndex, totalItems, effectiveAdInterval])

  if (!shouldShowAd) return null

  return (
    <div className={`in-feed-ad ${className}`}>
      <div className="mb-2">
        <span 
          className="text-xs px-2 py-1 rounded"
          style={{
            color: 'var(--color-text-muted)',
            backgroundColor: 'var(--color-background-accent)',
          }}
        >
          広告
        </span>
      </div>
      <ResponsiveAdBanner 
        type="inArticle" 
        testId="ad-density-test"
      />
    </div>
  )
} 