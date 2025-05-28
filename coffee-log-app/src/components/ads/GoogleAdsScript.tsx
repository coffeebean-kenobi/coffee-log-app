'use client'

import Script from 'next/script'
import { adsenseConfig } from '@/config/adsense'

export default function GoogleAdsScript() {
  // 本番環境またはクライアントIDが設定されていない場合は何も表示しない
  if (!adsenseConfig.enabled || !adsenseConfig.clientId) {
    return null
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  )
} 