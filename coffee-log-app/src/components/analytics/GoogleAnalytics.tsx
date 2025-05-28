'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// Window型拡張
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && consent) {
      // クッキー同意状態に基づいてGoogle Analytics設定を更新
      window.gtag('consent', 'update', {
        'ad_storage': consent.advertising ? 'granted' : 'denied',
        'ad_user_data': consent.advertising ? 'granted' : 'denied',
        'ad_personalization': consent.advertising ? 'granted' : 'denied',
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'functionality_storage': consent.preferences ? 'granted' : 'denied',
        'personalization_storage': consent.preferences ? 'granted' : 'denied',
        'security_storage': 'granted'
      })
    }
  }, [consent])

  // 本番環境でGA_MEASUREMENT_IDが設定されている場合のみ表示
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // 初期同意設定（デフォルトは拒否）
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted'
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              custom_map: {
                'custom_parameter_1': 'experiment_name'
              }
            });
          `,
        }}
      />
    </>
  )
} 