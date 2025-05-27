# 06. Google AdSense収益化機能の基盤実装

## 概要
Coffee Log AppにGoogle AdSenseを統合して月$20の収益を目指します。この段階では、AdSense統合の基盤、環境変数設定、基本的な広告コンポーネントを作成します。

## 実装する機能
1. Google AdSenseアカウント申請準備
2. 環境変数とAdSense設定
3. 基本的な広告バナーコンポーネント
4. Next.js 15対応のScript統合

## 必要なファイル作成

### 1. 環境変数設定: `.env.local`に追加
```bash
# Google AdSense設定
NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. AdSense設定ファイル: `src/config/adsense.ts`
```typescript
// Google AdSense設定
export const adsenseConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || '',
  enabled: process.env.NODE_ENV === 'production',
  testMode: process.env.NODE_ENV === 'development'
}

// 広告ユニット設定
export const adUnits = {
  banner: {
    desktop: {
      width: 728,
      height: 90,
      format: 'auto',
      slot: '1234567890' // 後でAdSenseダッシュボードから取得
    },
    mobile: {
      width: 320,
      height: 50,
      format: 'auto', 
      slot: '1234567891'
    }
  },
  sidebar: {
    width: 300,
    height: 250,
    format: 'auto',
    slot: '1234567892'
  },
  inArticle: {
    format: 'fluid',
    layout: 'in-article',
    slot: '1234567893'
  }
}

// 広告配置設定
export const adPlacements = {
  header: false, // ヘッダーには配置しない（UX重視）
  sidebar: true,
  afterContent: true,
  betweenRecords: true, // コーヒー記録間
  analyticsPage: true
}
```

### 3. Google Script統合コンポーネント: `src/components/ads/GoogleAdsScript.tsx`
```typescript
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
```

### 4. 基本広告バナーコンポーネント: `src/components/ads/AdBanner.tsx`
```typescript
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
  const adRef = useRef<HTMLDivElement>(null)
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
            ...adSize && { width: adSize.width, height: adSize.height }
          }}
          data-ad-client={adsenseConfig.clientId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          {...adLayout && { 'data-ad-layout': adLayout }}
          {...fullWidthResponsive && { 'data-full-width-responsive': 'true' }}
          {...adsenseConfig.testMode && { 'data-adtest': 'on' }}
        />
      )}
    </div>
  )
}
```

### 5. レスポンシブ広告コンポーネント: `src/components/ads/ResponsiveAdBanner.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import AdBanner from './AdBanner'
import { adUnits } from '@/config/adsense'

interface ResponsiveAdBannerProps {
  type: 'banner' | 'sidebar' | 'inArticle'
  className?: string
}

export default function ResponsiveAdBanner({ 
  type, 
  className = '' 
}: ResponsiveAdBannerProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (type === 'banner') {
    const adConfig = isMobile ? adUnits.banner.mobile : adUnits.banner.desktop
    return (
      <AdBanner
        adSlot={adConfig.slot}
        adFormat={adConfig.format}
        adSize={{ width: adConfig.width, height: adConfig.height }}
        className={className}
      />
    )
  }

  if (type === 'sidebar') {
    return (
      <AdBanner
        adSlot={adUnits.sidebar.slot}
        adFormat={adUnits.sidebar.format}
        adSize={{ width: adUnits.sidebar.width, height: adUnits.sidebar.height }}
        className={className}
      />
    )
  }

  if (type === 'inArticle') {
    return (
      <AdBanner
        adSlot={adUnits.inArticle.slot}
        adFormat={adUnits.inArticle.format}
        adLayout={adUnits.inArticle.layout}
        className={className}
      />
    )
  }

  return null
}
```

### 6. レイアウト統合: `src/app/layout.tsx`を修正
```typescript
import GoogleAdsScript from '@/components/ads/GoogleAdsScript'

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
        {/* 既存のレイアウト */}
        {children}
      </body>
    </html>
  )
}
```

## AdSenseアカウント申請の準備

### 申請前チェックリスト:
1. **コンテンツ要件**:
   - ✅ 最低10-15記事相当のコンテンツ（ユーザーのコーヒー記録）
   - ✅ オリジナルで価値のあるコンテンツ
   - ✅ 定期的な更新（ユーザー投稿による）

2. **必須ページ**:
   - プライバシーポリシー（次のプロンプトで作成）
   - 利用規約
   - お問い合わせページ

3. **技術要件**:
   - ✅ SSL証明書（https://coffee-log-app.vercel.app/）
   - ✅ モバイル対応
   - ✅ 高速な読み込み速度
   - ✅ 良好なユーザーエクスペリエンス

## 実装指示

1. **環境変数の設定**: `.env.local`ファイルにAdSense設定を追加してください。

2. **設定ファイルの作成**: `src/config/adsense.ts`を作成してください。

3. **広告コンポーネントの作成**: 
   - `src/components/ads/`ディレクトリを作成
   - `GoogleAdsScript.tsx`、`AdBanner.tsx`、`ResponsiveAdBanner.tsx`を作成

4. **レイアウト統合**: `layout.tsx`にGoogleAdsScriptを追加してください。

## 注意点

- 実際の広告表示は本番環境でのみ動作します
- 開発環境では広告プレースホルダーが表示されます  
- AdSenseアカウント承認後にスロットIDを実際の値に更新する必要があります
- クリック誘導などのポリシー違反行為は絶対に行わないでください

## 次のステップ

この基盤が完成したら、次のプロンプト（07_privacy_policy.md）でプライバシーポリシーとクッキー同意機能を実装します。 