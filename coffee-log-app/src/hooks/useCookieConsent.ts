'use client'

import { useState, useEffect, useCallback } from 'react'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  advertising: boolean
  preferences: boolean
}

const STORAGE_KEY = 'coffee-log-cookie-consent'
const CONSENT_VERSION = '1.0'

const defaultConsent: CookieConsent = {
  necessary: true, // 必須クッキーは常にtrue
  analytics: false,
  advertising: false,
  preferences: false
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [hasResponded, setHasResponded] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  // ローカルストレージから同意状況を読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent)
          setHasResponded(true)
          setShowBanner(false)
          return
        }
      }
    } catch (error) {
      console.warn('クッキー同意の読み込みに失敗:', error)
    }

    // 同意情報がない場合はバナーを表示
    setConsent(defaultConsent)
    setHasResponded(false)
    setShowBanner(true)
  }, [])

  // 同意設定を保存
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    if (typeof window === 'undefined') return

    const dataToSave = {
      consent: { ...newConsent, necessary: true }, // 必須クッキーは常にtrue
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString()
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setConsent(dataToSave.consent)
      setHasResponded(true)
      setShowBanner(false)

      // Google Analytics同意状態を更新
      updateGoogleConsent(dataToSave.consent)
    } catch (error) {
      console.error('クッキー同意の保存に失敗:', error)
    }
  }, [])

  // すべて承諾
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      advertising: true,
      preferences: true
    })
  }, [saveConsent])

  // 必要最小限のみ承諾
  const acceptNecessaryOnly = useCallback(() => {
    saveConsent(defaultConsent)
  }, [saveConsent])

  // バナーを再表示
  const showConsentBanner = useCallback(() => {
    setShowBanner(true)
  }, [])

  return {
    consent,
    hasResponded,
    showBanner,
    saveConsent,
    acceptAll,
    acceptNecessaryOnly,
    showConsentBanner
  }
}

// Google Analytics同意状態更新
function updateGoogleConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return

  // gtag関数が利用可能な場合のみ実行
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'ad_storage': consent.advertising ? 'granted' : 'denied',
      'ad_user_data': consent.advertising ? 'granted' : 'denied', 
      'ad_personalization': consent.advertising ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'functionality_storage': consent.preferences ? 'granted' : 'denied',
      'personalization_storage': consent.preferences ? 'granted' : 'denied',
      'security_storage': 'granted' // セキュリティクッキーは常に許可
    })
  }
}

// Window型拡張
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
} 