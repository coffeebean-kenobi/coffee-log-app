'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCookieConsent, CookieConsent } from '@/hooks/useCookieConsent'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'

export default function CookieConsentBanner() {
  const { 
    consent, 
    showBanner, 
    acceptAll, 
    acceptNecessaryOnly, 
    saveConsent 
  } = useCookieConsent()
  
  const [showDetails, setShowDetails] = useState(false)
  const [customConsent, setCustomConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    advertising: false,
    preferences: false
  })

  if (!showBanner) return null

  const handleCustomConsentChange = (type: keyof CookieConsent, value: boolean) => {
    if (type === 'necessary') return // 必須クッキーは変更不可
    
    setCustomConsent(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleSaveCustom = () => {
    saveConsent(customConsent)
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 shadow-lg"
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <Container>
        <div className="py-4">
          {!showDetails ? (
            // 基本バナー
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
                  🍪 クッキーの使用について
                </Typography>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  当サイトではユーザー体験の向上と分析のためにクッキーを使用しています。
                  詳細は
                  <Link href="/privacy-policy" className="hover:underline mx-1" style={{ color: 'var(--color-primary)' }}>
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  設定をカスタマイズ
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  必要最小限のみ
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  すべて承諾
                </button>
              </div>
            </div>
          ) : (
            // 詳細設定
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  クッキー設定
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="hover:opacity-70"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4">
                {/* 必須クッキー */}
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div>
                    <h4 className="font-medium" style={{ color: 'var(--color-text)' }}>必須クッキー</h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      サイトの基本機能に必要なクッキーです（認証、セッション管理など）
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>必須</span>
                  </div>
                </div>

                {/* 分析クッキー */}
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div>
                    <h4 className="font-medium" style={{ color: 'var(--color-text)' }}>分析クッキー</h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      サイト利用状況の分析と改善のためのクッキーです（Google Analytics）
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customConsent.analytics}
                      onChange={(e) => handleCustomConsentChange('analytics', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>許可</span>
                  </label>
                </div>

                {/* 広告クッキー */}
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div>
                    <h4 className="font-medium" style={{ color: 'var(--color-text)' }}>広告クッキー</h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      パーソナライズされた広告表示のためのクッキーです（Google AdSense）
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customConsent.advertising}
                      onChange={(e) => handleCustomConsentChange('advertising', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>許可</span>
                  </label>
                </div>

                {/* 設定クッキー */}
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div>
                    <h4 className="font-medium" style={{ color: 'var(--color-text)' }}>設定クッキー</h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      ユーザー設定の保存のためのクッキーです（テーマ、言語設定など）
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customConsent.preferences}
                      onChange={(e) => handleCustomConsentChange('preferences', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>許可</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  必要最小限のみ
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  設定を保存
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
} 