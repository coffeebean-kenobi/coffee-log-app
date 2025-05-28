# 07. プライバシーポリシーとクッキー同意機能の実装

## 概要
Google AdSense申請とGDPR/プライバシー法規制に対応するため、プライバシーポリシーページとクッキー同意管理機能を実装します。

## 前提条件
- 06_adsense_foundation.mdの実装が完了していること

## 実装する機能
1. プライバシーポリシーページ
2. 利用規約ページ 
3. クッキー同意バナー
4. クッキー設定管理
5. Google Analytics同意連携

## 必要なファイル作成

### 1. クッキー同意管理フック: `src/hooks/useCookieConsent.ts`
```typescript
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
```

### 2. クッキー同意バナー: `src/components/privacy/CookieConsentBanner.tsx`
```typescript
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
              <p className="text-sm text-muted-foreground">
                当サイトではユーザー体験の向上と分析のためにクッキーを使用しています。
                詳細は
                <Link href="/privacy-policy" className="text-primary hover:underline mx-1">
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
              >
                設定をカスタマイズ
              </button>
              <button
                onClick={acceptNecessaryOnly}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
              >
                必要最小限のみ
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                すべて承諾
              </button>
            </div>
          </div>
        ) : (
          // 詳細設定
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">
                クッキー設定
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4">
              {/* 必須クッキー */}
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-card-foreground">必須クッキー</h4>
                  <p className="text-sm text-muted-foreground">
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
                  <span className="text-sm text-muted-foreground">必須</span>
                </div>
              </div>

              {/* 分析クッキー */}
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-card-foreground">分析クッキー</h4>
                  <p className="text-sm text-muted-foreground">
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
                  <span className="text-sm">許可</span>
                </label>
              </div>

              {/* 広告クッキー */}
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-card-foreground">広告クッキー</h4>
                  <p className="text-sm text-muted-foreground">
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
                  <span className="text-sm">許可</span>
                </label>
              </div>

              {/* 設定クッキー */}
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-card-foreground">設定クッキー</h4>
                  <p className="text-sm text-muted-foreground">
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
                  <span className="text-sm">許可</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={acceptNecessaryOnly}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
              >
                必要最小限のみ
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                設定を保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

### 3. プライバシーポリシーページ: `src/app/privacy-policy/page.tsx`
```typescript
import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | LOGCUP',
  description: 'Coffee Log App（LOGCUP）のプライバシーポリシーです。',
}

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">プライバシーポリシー</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            最終更新日: {new Date().toLocaleDateString('ja-JP')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. はじめに</h2>
            <p>
              Coffee Log App（以下「LOGCUP」）は、ユーザーのプライバシーを尊重し、
              個人情報の保護に努めています。本プライバシーポリシーは、
              当サービスにおける個人情報の取り扱いについて説明します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. 収集する情報</h2>
            <h3 className="text-xl font-medium text-foreground mb-3">2.1 ユーザーが提供する情報</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>アカウント情報（メールアドレス、表示名、ユーザー名）</li>
              <li>プロフィール情報（自己紹介文）</li>
              <li>コーヒー記録データ（店舗名、コーヒー情報、評価、メモ等）</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3">2.2 自動的に収集される情報</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）</li>
              <li>利用状況データ（ページビュー、クリック情報、滞在時間）</li>
              <li>デバイス情報（OS、ブラウザ種別、画面解像度）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. 情報の利用目的</h2>
            <ul className="list-disc pl-6">
              <li>サービスの提供・運営・改善</li>
              <li>ユーザーサポートの提供</li>
              <li>利用状況の分析・統計の作成</li>
              <li>不正利用の防止・セキュリティ向上</li>
              <li>法的義務の履行</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. クッキーについて</h2>
            <p className="mb-4">
              当サービスでは、ユーザー体験の向上と分析のために以下のクッキーを使用します：
            </p>
            
            <h3 className="text-xl font-medium text-foreground mb-3">4.1 必須クッキー</h3>
            <p className="mb-4">
              サービスの基本機能（認証、セッション管理）に必要なクッキーです。
              これらは無効にすることができません。
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">4.2 分析クッキー</h3>
            <p className="mb-4">
              Google Analyticsを使用してサイトの利用状況を分析します。
              収集された情報は匿名化され、個人を特定することはできません。
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">4.3 広告クッキー</h3>
            <p className="mb-4">
              Google AdSenseを使用してパーソナライズされた広告を表示します。
              ユーザーは広告設定で個人に合わせた広告をオプトアウトできます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. 第三者サービス</h2>
            <p className="mb-4">当サービスでは以下の第三者サービスを利用しています：</p>
            
            <h3 className="text-xl font-medium text-foreground mb-3">5.1 Supabase</h3>
            <p className="mb-4">
              ユーザー認証とデータベースサービスを提供します。
              <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Supabaseプライバシーポリシー
              </a>
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">5.2 Google Analytics</h3>
            <p className="mb-4">
              サイト利用状況の分析を行います。
              <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Googleプライバシーポリシー
              </a>
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">5.3 Google AdSense</h3>
            <p className="mb-4">
              広告の配信を行います。ユーザーは
              <a href="https://adssettings.google.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Google広告設定
              </a>
              でパーソナライズ広告をオプトアウトできます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. 情報の共有</h2>
            <p className="mb-4">
              当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません：
            </p>
            <ul className="list-disc pl-6">
              <li>ユーザーの同意がある場合</li>
              <li>法的義務に基づく場合</li>
              <li>サービス提供に必要な業務委託先への提供</li>
              <li>緊急時（生命、身体の安全確保）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. ユーザーの権利</h2>
            <p className="mb-4">ユーザーは以下の権利を有します：</p>
            <ul className="list-disc pl-6">
              <li>個人情報の開示・訂正・削除の請求</li>
              <li>データポータビリティの権利</li>
              <li>処理の制限・異議申し立ての権利</li>
              <li>アカウントの削除</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. セキュリティ</h2>
            <p>
              当サービスは、適切な技術的・組織的措置を講じて、
              個人情報の不正アクセス、紛失、破壊、改ざん、漏洩を防止します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. 国際転送</h2>
            <p>
              当サービスは、サービス提供のため個人情報を国外のサーバーに保存する場合があります。
              この場合、適切な保護措置を講じます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. 改定</h2>
            <p>
              本プライバシーポリシーは、法令の改正やサービス内容の変更等により改定する場合があります。
              重要な変更がある場合は、サイト上で通知します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. お問い合わせ</h2>
            <p>
              プライバシーに関するご質問やご要望は、
              <a href="/contact" className="text-primary hover:underline">お問い合わせページ</a>
              よりご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
```

### 4. 利用規約ページ: `src/app/terms/page.tsx`
```typescript
import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
  title: '利用規約 | LOGCUP',
  description: 'Coffee Log App（LOGCUP）の利用規約です。',
}

export default function TermsPage() {
  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">利用規約</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            最終更新日: {new Date().toLocaleDateString('ja-JP')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第1条 総則</h2>
            <p>
              本利用規約（以下「本規約」）は、Coffee Log App（以下「当サービス」）の
              利用条件を定めるものです。ユーザーは本規約に同意の上、当サービスをご利用ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第2条 定義</h2>
            <ul className="list-disc pl-6">
              <li>「当サービス」とは、Coffee Log App（LOGCUP）を指します</li>
              <li>「ユーザー」とは、当サービスを利用する個人を指します</li>
              <li>「コンテンツ」とは、文字、音声、画像等の情報を指します</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第3条 アカウント登録</h2>
            <ol className="list-decimal pl-6">
              <li>ユーザーは正確な情報でアカウント登録を行う必要があります</li>
              <li>登録情報に変更がある場合は速やかに更新してください</li>
              <li>アカウント情報の管理責任はユーザーにあります</li>
              <li>第三者によるアカウント使用を発見した場合は直ちに通知してください</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第4条 禁止事項</h2>
            <p className="mb-4">ユーザーは以下の行為を行ってはいけません：</p>
            <ul className="list-disc pl-6">
              <li>法令に違反する行為</li>
              <li>第三者の権利を侵害する行為</li>
              <li>虚偽の情報を投稿する行為</li>
              <li>システムに負荷をかける行為</li>
              <li>商業目的での利用（当社が許可した場合を除く）</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第5条 コンテンツの取り扱い</h2>
            <ol className="list-decimal pl-6">
              <li>ユーザーが投稿したコンテンツの著作権はユーザーに帰属します</li>
              <li>当社はサービス運営に必要な範囲でコンテンツを利用できます</li>
              <li>ユーザーは投稿コンテンツについて責任を負います</li>
              <li>不適切なコンテンツは当社判断で削除する場合があります</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第6条 サービスの変更・停止</h2>
            <p>
              当社は、ユーザーへの事前通知なしに、サービスの内容を変更し、
              または提供を停止することができるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第7条 免責事項</h2>
            <ol className="list-decimal pl-6">
              <li>当社は、当サービスの完全性・正確性・確実性を保証しません</li>
              <li>システム障害等による損害について当社は責任を負いません</li>
              <li>ユーザー間トラブルについて当社は関与しません</li>
              <li>第三者サービスに起因する損害について当社は責任を負いません</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第8条 準拠法・管轄裁判所</h2>
            <p>
              本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">第9条 規約の変更</h2>
            <p>
              当社は、必要に応じて本規約を変更することができます。
              重要な変更については、サイト上で事前に通知します。
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
```

### 5. レイアウト統合: `src/app/layout.tsx`にクッキー同意バナーを追加
```typescript
import CookieConsentBanner from '@/components/privacy/CookieConsentBanner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAdsScript />
      </head>
      <body>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
```

### 6. フッターリンク追加: 既存フッターコンポーネントを修正
```typescript
// 既存のフッターコンポーネントに以下のリンクを追加
<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
  <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
    プライバシーポリシー
  </Link>
  <Link href="/terms" className="hover:text-foreground transition-colors">
    利用規約
  </Link>
  <Link href="/contact" className="hover:text-foreground transition-colors">
    お問い合わせ
  </Link>
</div>
```

## 実装指示

1. **フックの作成**: `src/hooks/useCookieConsent.ts`を作成してください。

2. **コンポーネントの作成**: 
   - `src/components/privacy/`ディレクトリを作成
   - `CookieConsentBanner.tsx`を作成

3. **ページの作成**:
   - `src/app/privacy-policy/page.tsx`を作成
   - `src/app/terms/page.tsx`を作成

4. **レイアウト修正**: `layout.tsx`にクッキー同意バナーを追加してください。

5. **フッター修正**: 既存フッターにプライバシー関連リンクを追加してください。

## 注意点

- プライバシーポリシーは法的要件に応じて調整が必要な場合があります
- クッキー同意は初回アクセス時のみ表示されます
- Google Analytics/AdSenseとの連携を適切に設定してください
- EEA/UK地域のユーザーには特に注意深い対応が必要です

## 次のステップ

この実装が完了したら、次のプロンプト（08_ad_placement.md）で実際の広告配置を最適化します。 