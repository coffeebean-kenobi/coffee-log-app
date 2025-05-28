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
      className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--color-background-paper)',
        borderTop: '2px solid var(--color-accent-main)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Container>
        <div className="py-6">
          {!showDetails ? (
            // 基本バナー
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <Typography variant="h3" style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                  🍪 クッキーの使用について
                </Typography>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  当サイトではユーザー体験の向上と分析のためにクッキーを使用しています。
                  詳細は
                  <Link href="/privacy-policy" className="hover:underline mx-1" style={{ color: 'var(--color-primary-main)' }}>
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{
                    border: '2px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)',
                    color: 'var(--color-text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-main)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  設定をカスタマイズ
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{
                    border: '2px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)',
                    color: 'var(--color-text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-main)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  必要最小限のみ
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary-main)',
                    color: 'var(--color-background-paper)',
                    border: '2px solid var(--color-primary-main)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.filter = 'brightness(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.filter = 'brightness(1)'
                  }}
                >
                  すべて承諾
                </button>
              </div>
            </div>
          ) : (
            // 詳細設定
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  クッキー設定
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 rounded-full transition-colors"
                  style={{ 
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4">
                {/* 必須クッキー */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                  style={{ 
                    border: '1px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)'
                  }}
                >
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>必須クッキー</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      サイトの基本機能に必要なクッキーです（認証、セッション管理など）
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="mr-2 w-4 h-4"
                      style={{
                        accentColor: 'var(--color-primary-main)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>必須</span>
                  </div>
                </div>

                {/* 分析クッキー */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                  style={{ 
                    border: '1px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)'
                  }}
                >
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>分析クッキー</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      サイト利用状況の分析と改善のためのクッキーです（Google Analytics）
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.analytics}
                      onChange={(e) => handleCustomConsentChange('analytics', e.target.checked)}
                      className="mr-2 w-4 h-4"
                      style={{
                        accentColor: 'var(--color-primary-main)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>許可</span>
                  </label>
                </div>

                {/* 広告クッキー */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                  style={{ 
                    border: '1px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)'
                  }}
                >
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>広告クッキー</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      パーソナライズされた広告表示のためのクッキーです（Google AdSense）
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.advertising}
                      onChange={(e) => handleCustomConsentChange('advertising', e.target.checked)}
                      className="mr-2 w-4 h-4"
                      style={{
                        accentColor: 'var(--color-primary-main)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>許可</span>
                  </label>
                </div>

                {/* 設定クッキー */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                  style={{ 
                    border: '1px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)'
                  }}
                >
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>設定クッキー</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      ユーザー設定の保存のためのクッキーです（テーマ、言語設定など）
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customConsent.preferences}
                      onChange={(e) => handleCustomConsentChange('preferences', e.target.checked)}
                      className="mr-2 w-4 h-4"
                      style={{
                        accentColor: 'var(--color-primary-main)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>許可</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{
                    border: '2px solid var(--color-accent-main)',
                    backgroundColor: 'var(--color-background-main)',
                    color: 'var(--color-text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-background-main)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  必要最小限のみ
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary-main)',
                    color: 'var(--color-background-paper)',
                    border: '2px solid var(--color-primary-main)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.filter = 'brightness(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.filter = 'brightness(1)'
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