'use client'

import { useEffect, useRef, useState } from 'react'
import { adsenseConfig, adUnits } from '@/config/adsense'

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
  fullWidthResponsive = true
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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
    >
      {/* 開発環境では広告プレースホルダーを表示 */}
      {adsenseConfig.testMode ? (
        <div 
          className="ad-placeholder bg-muted border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center text-muted-foreground"
          style={{
            width: adSize?.width || '100%',
            height: adSize?.height || 90,
            maxWidth: '100%'
          }}
        >
          <div className="text-center">
            <p className="text-sm">📢 広告エリア</p>
            <p className="text-xs">Slot: {adSlot}</p>
          </div>
        </div>
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            ...(adSize && { width: adSize.width, height: adSize.height })
          }}
          data-ad-client={adsenseConfig.clientId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={adLayout}
          data-full-width-responsive={fullWidthResponsive ? 'true' : undefined}
          data-adtest={adsenseConfig.testMode ? 'on' : undefined}
        />
      )}
    </div>
  )
} 