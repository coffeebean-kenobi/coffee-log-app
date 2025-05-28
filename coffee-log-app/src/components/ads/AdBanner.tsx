'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { adsenseConfig, adUnits } from '@/config/adsense'
import { useRevenueTracking } from '@/hooks/useRevenueTracking'
import { useABTest } from '@/hooks/useABTest'

interface AdBannerProps {
  adSlot: string
  adFormat?: string
  adLayout?: string
  adSize?: {
    width: number
    height: number
  }
  className?: string
  fullWidthResponsive?: boolean
  testId?: string // A/Bテスト用のID
}

// Window型拡張
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdBanner({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adSize,
  className = '',
  fullWidthResponsive = true,
  testId
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { trackAdImpression, trackAdClick } = useRevenueTracking()
  const { getVariantConfig } = useABTest()

  // A/Bテスト設定の適用
  const testConfig = testId ? getVariantConfig(testId) : {}

  // クリック追跡
  const handleAdClick = useCallback(() => {
    trackAdClick(adSlot, testId)
  }, [adSlot, trackAdClick, testId])

  useEffect(() => {
    // AdSenseが無効またはクライアントIDが未設定の場合は何もしない
    if (!adsenseConfig.enabled || !adsenseConfig.clientId) {
      return
    }

    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          // 既に広告が読み込まれている場合はスキップ
          if (adRef.current.innerHTML.trim() !== '') {
            return
          }

          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          setIsLoaded(true)
        }
      } catch (error) {
        console.error('AdSense load error:', error)
      }
    }

    // AdSenseスクリプトが読み込まれるまで待機
    const checkAdSense = setInterval(() => {
      if (window.adsbygoogle) {
        loadAd()
        clearInterval(checkAdSense)
      }
    }, 100)

    // 10秒後にタイムアウト
    const timeout = setTimeout(() => {
      clearInterval(checkAdSense)
    }, 10000)

    return () => {
      clearInterval(checkAdSense)
      clearTimeout(timeout)
    }
  }, [adSlot])

  // インプレッション追跡
  useEffect(() => {
    if (isLoaded) {
      trackAdImpression(adSlot, testId)
    }
  }, [isLoaded, adSlot, trackAdImpression, testId])

  // AdSenseが無効の場合は何も表示しない
  if (!adsenseConfig.enabled || !adsenseConfig.clientId) {
    return null
  }

  return (
    <div 
      className={`ad-container ${className}`}
      style={{ 
        textAlign: 'center',
        margin: '1rem 0',
        minHeight: adSize?.height || 'auto'
      }}
      onClick={handleAdClick}
    >
      {/* 開発環境では広告プレースホルダーを表示 */}
      {adsenseConfig.testMode ? (
        <div 
          className="ad-placeholder"
          style={{
            width: adSize?.width || '100%',
            height: adSize?.height || 90,
            maxWidth: '100%',
            backgroundColor: 'var(--color-background-muted)',
            border: '2px dashed var(--color-border)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}>📢 広告エリア</p>
            <p style={{ fontSize: '12px', margin: '0' }}>Slot: {adSlot}</p>
            {testId && (
              <p style={{ fontSize: '10px', margin: '4px 0 0 0', opacity: 0.7 }}>
                Test: {testId} | Config: {JSON.stringify(testConfig)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <ins
          ref={adRef as any}
          className="adsbygoogle"
          style={{
            display: 'block',
            ...(adSize && { width: adSize.width, height: adSize.height })
          }}
          data-ad-client={adsenseConfig.clientId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
          {...(fullWidthResponsive ? { 'data-full-width-responsive': 'true' } : {})}
          {...(adsenseConfig.testMode ? { 'data-adtest': 'on' } : {})}
        />
      )}
    </div>
  )
} 