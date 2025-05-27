# 10. 最終設定とデプロイメント準備

## 概要
Google AdSense収益化機能の実装完了に向けて、最終設定、ドキュメント更新、SEO最適化、およびデプロイメント準備を行います。月$20収益目標達成への最終段階です。

## 前提条件
- 06_adsense_foundation.mdの実装が完了していること
- 07_privacy_policy.mdの実装が完了していること
- 08_ad_placement.mdの実装が完了していること
- 09_revenue_optimization.mdの実装が完了していること

## 実装する機能
1. SEO最適化とメタタグ強化
2. サイトマップ自動生成
3. robots.txtとads.txt設定
4. パフォーマンス最適化
5. ドキュメント更新
6. デプロイメント設定

## 必要なファイル作成・修正

### 1. SEO最適化メタデータ: `src/app/layout.tsx`を拡張
```typescript
import type { Metadata, Viewport } from 'next'
import GoogleAdsScript from '@/components/ads/GoogleAdsScript'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import CookieConsentBanner from '@/components/privacy/CookieConsentBanner'
import AdPerformanceMonitor from '@/components/ads/AdPerformanceMonitor'

export const metadata: Metadata = {
  title: {
    default: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    template: '%s | LOGCUP'
  },
  description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。LOGCUPであなたのコーヒージャーニーを最適化しましょう。',
  keywords: [
    'コーヒー', 'ログ', '記録', '分析', 'カフェ', 'エスプレッソ', 'ドリップ',
    'テイスティング', 'コーヒー豆', 'ロースト', 'flavor profile', 'coffee tracking',
    'コーヒー体験', 'データ分析', 'コーヒー愛好家', 'バリスタ'
  ],
  authors: [{ name: 'LOGCUP Team' }],
  creator: 'LOGCUP',
  publisher: 'LOGCUP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coffee-log-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://coffee-log-app.vercel.app',
    title: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。LOGCUPであなたのコーヒージャーニーを最適化しましょう。',
    siteName: 'LOGCUP',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LOGCUP - コーヒーログアプリ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // AdSense申請時に設定
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <GoogleAdsScript />
        <GoogleAnalytics />
        {/* AdSense最適化のための追加メタタグ */}
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
        <meta name="google-adsense-platform-account" content="ca-host-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        <CookieConsentBanner />
        <AdPerformanceMonitor />
      </body>
    </html>
  )
}
```

### 2. サイトマップ生成: `src/app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coffee-log-app.vercel.app'
  
  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/coffee`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // 将来的に動的ページを追加する場合
  // const dynamicPages = await generateDynamicPages()

  return staticPages
}

// 動的ページ生成の例（将来的に実装）
async function generateDynamicPages() {
  // コーヒー記録の詳細ページなど
  // const coffeeRecords = await fetchPublicCoffeeRecords()
  // return coffeeRecords.map(record => ({
  //   url: `https://coffee-log-app.vercel.app/coffee/${record.id}`,
  //   lastModified: new Date(record.updated_at),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))
  return []
}
```

### 3. Robots.txt設定: `src/app/robots.ts`
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
          '/.*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/coffee', '/analytics'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: 'https://coffee-log-app.vercel.app/sitemap.xml',
  }
}
```

### 4. ads.txt設定: `public/ads.txt`
```txt
# AdSense ads.txt - AdSenseアカウント承認後に更新
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0

# 将来的にパートナーネットワークを追加する場合
# partnername.com, pub-XXXXXXXXXXXXXXXX, RESELLER, f08c47fec0942fa0
```

### 5. パフォーマンス最適化コンポーネント: `src/components/performance/ImageOptimizer.tsx`
```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      {hasError ? (
        <div 
          className="flex items-center justify-center bg-muted text-muted-foreground rounded"
          style={{ width, height }}
        >
          <span className="text-sm">画像を読み込めませんでした</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      )}
    </div>
  )
}
```

### 6. お問い合わせページ: `src/app/contact/page.tsx`
```typescript
import { Metadata } from 'next'
import Container from '@/components/Container'
import { Mail, MessageCircle, Clock, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'LOGCUP（Coffee Log App）に関するご質問やお問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">お問い合わせ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* お問い合わせ方法 */}
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">メールでのお問い合わせ</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                ご質問やご要望がございましたら、以下のメールアドレスまでお送りください。
              </p>
              <p className="font-mono text-sm bg-muted p-3 rounded">
                support@logcup.app
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">返信について</h2>
              </div>
              <p className="text-muted-foreground">
                お問い合わせいただいたメールには、通常1-2営業日以内に返信いたします。
                お急ぎの場合はその旨をメールに記載してください。
              </p>
            </div>
          </div>

          {/* よくある質問 */}
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">よくある質問</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Q. アカウントの削除はできますか？
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A. はい、プロフィール設定画面からアカウントの削除が可能です。削除すると全てのデータが永久に削除されます。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Q. 広告を非表示にできますか？
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A. 現在、広告の完全な非表示機能は提供していませんが、クッキー設定で広告のパーソナライゼーションを無効にできます。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Q. データのエクスポートはできますか？
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A. 分析ページでCSV形式でのデータエクスポートが可能です。将来的には包括的なデータエクスポート機能を追加予定です。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Q. モバイルアプリはありますか？
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A. 現在はWebアプリのみですが、PWA対応によりモバイル端末でもアプリのような体験が可能です。
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">フィードバック</h2>
              </div>
              <p className="text-muted-foreground">
                LOGCUPの改善のため、ご意見やご要望をお聞かせください。
                ユーザーの皆様の声を大切にしています。
              </p>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="mt-8 border border-border rounded-lg p-6 bg-muted/50">
          <h2 className="text-lg font-semibold mb-4">お問い合わせ時の注意事項</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 技術的な問題については、使用環境（ブラウザ、OS等）の情報も含めてください</li>
            <li>• アカウントに関する問い合わせの際は、登録メールアドレスからお送りください</li>
            <li>• スパムメールとして誤判定されないよう、件名に「LOGCUP」を含めてください</li>
            <li>• 営業やサービス勧誘等のメールにはお答えできません</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
```

### 7. 進捗レポート更新: `docs/進捗レポート.md`
```markdown
# LOGCUP（Coffee Log App）進捗レポート

## プロジェクト概要
- **プロジェクト名**: LOGCUP (Coffee Log App)
- **開始日**: 2024年[開始月]
- **URL**: https://coffee-log-app.vercel.app/
- **目標**: 月$20のAdSense収益達成

## Phase 1: MVP開発 ✅ 完了
### 完了機能
- [x] ユーザー認証（Supabase Auth）
- [x] コーヒー記録の作成・編集・削除
- [x] 詳細な味覚評価システム
- [x] プロフィール管理
- [x] レスポンシブデザイン（Tailwind CSS）
- [x] ダークモード対応

### 技術スタック
- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS
- **バックエンド**: Supabase (Database, Auth, Storage)
- **デプロイ**: Vercel
- **UI コンポーネント**: shadcn/ui

## Phase 2: データ分析機能 ✅ 完了
### 完了機能
- [x] 統計サマリー（総記録数、平均評価、お気に入り店舗等）
- [x] 時系列チャート（消費パターン、評価推移）
- [x] 店舗別分析（バーチャート）
- [x] 産地別分析（ドーナツチャート）
- [x] ロースト度分析（バーチャート）
- [x] 味覚プロファイル（レーダーチャート）
- [x] 高度なフィルタリング機能
- [x] CSVエクスポート機能

### 使用ライブラリ
- **チャート**: Chart.js, react-chartjs-2
- **データ処理**: カスタム分析ユーティリティ

## Phase 3: 収益化機能 ✅ 完了
### 完了機能
- [x] Google AdSense統合基盤
- [x] プライバシーポリシー・利用規約
- [x] クッキー同意管理（GDPR対応）
- [x] 戦略的広告配置
- [x] A/Bテストフレームワーク
- [x] Google Analytics 4連携
- [x] 収益パフォーマンス追跡
- [x] 管理者向け収益ダッシュボード

### 収益化戦略
- **目標**: 月$20のAdSense収益
- **必要PV**: 7,000-20,000/月（RPM $1-3想定）
- **広告配置**: UX重視の戦略的配置
- **最適化**: A/Bテストによる継続改善

## Phase 4: 最終調整・SEO最適化 🔄 進行中
### 完了機能
- [x] SEO最適化（メタタグ、構造化データ）
- [x] サイトマップ自動生成
- [x] robots.txt / ads.txt設定
- [x] パフォーマンス最適化
- [x] お問い合わせページ
- [x] ドキュメント更新

### 残作業
- [ ] AdSenseアカウント申請・審査
- [ ] 実際の広告配信開始
- [ ] パフォーマンスモニタリング
- [ ] 継続的A/Bテスト実施

## 現在の状況
### 技術面
- ✅ 全機能実装完了
- ✅ 本番環境デプロイ済み
- ✅ パフォーマンス最適化済み
- ✅ SEO対策済み

### 収益化面
- ✅ AdSense統合準備完了
- 🔄 AdSenseアカウント申請準備中
- ⏳ 広告審査待ち
- ⏳ 収益化開始待ち

## 今後の予定
1. **AdSenseアカウント申請** (即座)
2. **広告審査対応** (1-2週間)
3. **収益化開始** (審査通過後)
4. **A/Bテスト開始** (収益化開始後)
5. **月$20目標達成** (3-6ヶ月以内)

## KPI/指標
### 技術指標
- **サイト速度**: Lighthouse スコア 90+
- **SEO**: Core Web Vitals 良好
- **ユーザビリティ**: モバイル対応100%

### ビジネス指標
- **目標月間PV**: 10,000-15,000
- **目標RPM**: $1.5-2.0
- **目標月間収益**: $20
- **ユーザー満足度**: 高品質UX維持

## リスク・課題
1. **AdSense審査**: 初回申請での承認
2. **トラフィック**: 十分なPV数の確保
3. **UX維持**: 収益化とUXのバランス
4. **コンテンツ**: 継続的な価値提供

## 成功要因
1. **高品質コンテンツ**: ユーザー価値優先
2. **技術的完成度**: パフォーマンス・SEO最適化
3. **データドリブン**: A/Bテストによる継続改善
4. **コンプライアンス**: プライバシー・広告ポリシー遵守

---
**最終更新**: 2024年[現在の月]
**ステータス**: Phase 3完了、Phase 4進行中
**次回更新予定**: AdSense審査結果後
```

### 8. アプリケーション概要更新: `docs/アプリケーション概要.md`
```markdown
# LOGCUP（Coffee Log App）アプリケーション概要

## プロジェクト基本情報
- **アプリケーション名**: LOGCUP (Coffee Log App)
- **URL**: https://coffee-log-app.vercel.app/
- **開発期間**: 2024年[開始月] - [現在]
- **ステータス**: 本番運用中・収益化準備完了

## アプリケーションの目的
コーヒー愛好家向けの包括的な体験記録・分析・発見プラットフォーム。
ユーザーがコーヒーの味わいを詳細に記録し、データ分析を通じて新しい発見や最適化を支援します。

## 主要機能

### 🔐 ユーザー認証・管理
- Supabaseによるセキュアな認証
- メール認証、パスワードリセット
- プロフィール管理（表示名、自己紹介等）

### ☕ コーヒー記録機能
- **詳細記録**: 店舗名、コーヒー名、産地、ロースト度
- **味覚評価**: 酸味、フレーバー、甘み、口当たり、ボディ、クリーンカップ、バランス（10段階評価）
- **追加情報**: 抽出方法、価格、メモ、画像
- **CRUD操作**: 作成、閲覧、編集、削除

### 📊 データ分析・可視化
- **統計サマリー**: 総記録数、平均評価、お気に入り店舗・産地
- **時系列分析**: 消費パターン、評価推移
- **カテゴリ分析**: 店舗別、産地別、ロースト度別
- **味覚プロファイル**: レーダーチャートによる可視化
- **フィルタリング**: 日付範囲、店舗、産地、ロースト度
- **データエクスポート**: CSV形式

### 🎯 発見・推奨機能（コンセプト）
- データ分析に基づく新しいコーヒーの推奨
- 好みパターンの発見
- 改善提案

### 💰 収益化機能
- **Google AdSense**: 戦略的広告配置
- **A/Bテスト**: 収益最適化
- **プライバシー対応**: GDPR準拠のクッキー管理
- **分析**: 収益パフォーマンス追跡

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React
- **チャート**: Chart.js, react-chartjs-2

### バックエンド
- **BaaS**: Supabase
  - PostgreSQL データベース
  - Authentication
  - Row Level Security (RLS)
  - Storage（画像アップロード）

### インフラ・デプロイ
- **ホスティング**: Vercel
- **ドメイン**: coffee-log-app.vercel.app
- **SSL**: 自動証明書
- **CDN**: Vercel Edge Network

### 分析・収益化
- **アクセス解析**: Google Analytics 4
- **広告**: Google AdSense
- **A/Bテスト**: カスタムフレームワーク
- **パフォーマンス**: Web Vitals監視

## データベース設計

### profiles テーブル
```sql
- id: uuid (primary key, references auth.users)
- display_name: text
- username: text (unique)
- bio: text
- avatar_url: text
- created_at: timestamp
- updated_at: timestamp
```

### coffee_records テーブル
```sql
- id: uuid (primary key)
- user_id: uuid (references profiles.id)
- shop_name: text
- coffee_name: text
- origin_country: text
- roast_level: text
- extraction_method: text
- price: numeric
- memo: text
- image_url: text
- acidity: integer (1-10)
- flavor: integer (1-10)
- sweetness: integer (1-10)
- mouthfeel: integer (1-10)
- body: integer (1-10)
- clean_cup: integer (1-10)
- balance: integer (1-10)
- overall_rating: numeric (computed)
- created_at: timestamp
- updated_at: timestamp
```

## セキュリティ

### 認証・認可
- Supabase Auth による JWT ベース認証
- Row Level Security (RLS) によるデータアクセス制御
- CSRF 保護
- SQL インジェクション対策

### プライバシー
- GDPR 準拠のプライバシーポリシー
- クッキー同意管理
- データポータビリティ対応
- アカウント削除機能

## パフォーマンス

### 最適化施策
- Next.js App Router による静的生成
- 画像最適化（Next.js Image）
- コード分割
- 遅延読み込み
- CDN活用

### 指標
- **Lighthouse スコア**: 90+
- **Core Web Vitals**: 良好
- **First Contentful Paint**: <2秒
- **Time to Interactive**: <3秒

## SEO対策

### 技術的SEO
- セマンティックHTML
- メタタグ最適化
- 構造化データ（JSON-LD）
- サイトマップ自動生成
- robots.txt 最適化

### コンテンツSEO
- 関連キーワード最適化
- ユーザー価値重視
- 定期的なコンテンツ更新

## 収益化戦略

### AdSense最適化
- **目標**: 月$20収益
- **必要PV**: 7,000-20,000/月
- **配置戦略**: UX重視の戦略的配置
- **A/Bテスト**: 継続的最適化

### 成長戦略
1. **有機的成長**: SEO・口コミ
2. **ユーザー体験**: 高品質UI/UX
3. **データ価値**: 分析機能の差別化
4. **コミュニティ**: コーヒー愛好家向け

## 今後の展望

### Phase 5: 機能拡張（予定）
- ソーシャル機能（記録共有、コメント）
- 推奨エンジン強化
- モバイルアプリ（PWA拡張）
- API公開
- サブスクリプション機能

### 長期ビジョン
- コーヒー業界の DX プラットフォーム
- カフェ・ロースター向け B2B サービス
- グローバル展開
- 月$100+ の収益化

## 開発・運用体制

### 開発プロセス
- アジャイル開発
- CI/CD (Vercel自動デプロイ)
- 品質管理（TypeScript、ESLint）
- パフォーマンス監視

### 運用監視
- エラー監視（Vercel Analytics）
- パフォーマンス監視（Web Vitals）
- 収益追跡（AdSense、GA4）
- ユーザーフィードバック

---

**最終更新**: 2024年[現在の月]
**バージョン**: v1.0.0 (収益化対応版)
**次期バージョン**: v1.1.0 (機能拡張予定)
```

### 9. 最終デプロイ設定: `next.config.js`を最適化
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // パフォーマンス最適化
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@headlessui/react', 'lucide-react'],
  },

  // 画像最適化
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['supabase.co', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/coffee',
        permanent: true,
      },
    ]
  },

  // 圧縮とキャッシュ
  compress: true,
  poweredByHeader: false,
  
  // Bundle analyzer（開発時のみ）
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer')())({
          enabled: true,
        })
      )
      return config
    },
  }),
}

module.exports = nextConfig
```

### 10. 最終チェックリスト: `DEPLOYMENT_CHECKLIST.md`
```markdown
# LOGCUP デプロイメント・収益化チェックリスト

## 🚀 デプロイ前最終確認

### 技術的確認
- [ ] 全機能が本番環境で正常動作
- [ ] Lighthouse スコア 90+ (Performance, SEO, Accessibility)
- [ ] モバイル対応完全性確認
- [ ] 全てのページでエラーがないか確認
- [ ] API エンドポイントの動作確認
- [ ] データベース接続・RLS設定確認

### コンテンツ確認
- [ ] プライバシーポリシーの内容確認・最新化
- [ ] 利用規約の内容確認・最新化
- [ ] お問い合わせページの動作確認
- [ ] メタデータ・SEO設定確認
- [ ] OGP画像・ファビコン設定

### セキュリティ確認
- [ ] 環境変数の適切な設定
- [ ] HTTPS強制設定
- [ ] セキュリティヘッダー設定
- [ ] Cookie設定の確認
- [ ] CSP (Content Security Policy) 設定

## 💰 AdSense申請準備

### コンテンツ要件
- [ ] 最低10-15記事相当のコンテンツ（ユーザー記録）
- [ ] オリジナル性の高いコンテンツ
- [ ] 定期的な更新（ユーザー投稿）
- [ ] 価値のある情報提供

### 技術要件
- [ ] SSL証明書設定済み
- [ ] モバイルフレンドリー対応
- [ ] サイト速度最適化
- [ ] ユーザビリティ向上
- [ ] ads.txt ファイル配置準備

### 必須ページ
- [ ] プライバシーポリシー公開
- [ ] 利用規約公開
- [ ] お問い合わせページ公開
- [ ] サイトマップ生成
- [ ] robots.txt 設定

### AdSense設定
- [ ] Google AdSense アカウント作成
- [ ] サイト追加申請
- [ ] ads.txt ファイル更新（申請後）
- [ ] 広告ユニット作成（承認後）
- [ ] 実際の広告コード設置（承認後）

## 📊 Analytics・追跡設定

### Google Analytics 4
- [ ] GA4 プロパティ作成
- [ ] 測定ID設定
- [ ] イベント追跡設定
- [ ] コンバージョン設定
- [ ] E-commerce設定（将来用）

### カスタム分析
- [ ] A/Bテストフレームワーク動作確認
- [ ] 収益追跡システム動作確認
- [ ] パフォーマンス監視設定
- [ ] エラー監視設定

## 🔍 SEO最適化確認

### 技術的SEO
- [ ] メタタグ設定完了
- [ ] 構造化データ実装
- [ ] サイトマップ送信
- [ ] Search Console設定
- [ ] Core Web Vitals 良好

### コンテンツSEO
- [ ] キーワード最適化
- [ ] 内部リンク構築
- [ ] 画像ALT設定
- [ ] 見出し構造最適化

## 🛡️ プライバシー・コンプライアンス

### GDPR/プライバシー対応
- [ ] クッキー同意バナー動作確認
- [ ] プライバシーポリシー法的確認
- [ ] データ処理記録作成
- [ ] ユーザー権利対応準備

### AdSenseポリシー遵守
- [ ] 無効なクリック対策
- [ ] クリック誘導防止
- [ ] 適切な広告配置
- [ ] ポリシー違反コンテンツ確認

## 📈 収益化戦略実行

### 初期設定
- [ ] 広告配置最適化
- [ ] A/Bテスト開始準備
- [ ] KPI監視体制構築
- [ ] 収益目標設定（月$20）

### 継続最適化
- [ ] 週次パフォーマンスレビュー計画
- [ ] A/Bテスト実行スケジュール
- [ ] ユーザーフィードバック収集体制
- [ ] 改善サイクル構築

## 🔄 本番運用準備

### 監視・アラート
- [ ] サーバー監視設定
- [ ] エラー率監視
- [ ] パフォーマンス監視
- [ ] 収益監視

### バックアップ・セキュリティ
- [ ] データベースバックアップ設定
- [ ] セキュリティスキャン実行
- [ ] 脆弱性チェック
- [ ] インシデント対応計画

### ドキュメント
- [ ] 運用マニュアル作成
- [ ] トラブルシューティングガイド
- [ ] API仕様書更新
- [ ] ユーザーガイド作成

---

## 📋 AdSense申請後のアクション

### 審査中
- [ ] サイト品質維持
- [ ] 定期的なコンテンツ更新
- [ ] トラフィック増加施策
- [ ] ユーザーエンゲージメント向上

### 承認後
- [ ] ads.txt ファイル更新
- [ ] 広告ユニットIDの実装
- [ ] 広告表示確認
- [ ] 収益追跡開始
- [ ] 最適化開始

### 万一の再申請準備
- [ ] 審査落ち理由分析
- [ ] 改善点の実装
- [ ] コンテンツ品質向上
- [ ] 再申請タイミング計画

---

**チェック担当者**: [担当者名]
**チェック完了日**: [日付]
**承認者**: [承認者名]
**本番リリース予定日**: [日付]
```

## 実装指示

1. **メタデータ最適化**: `layout.tsx`のSEO設定を強化してください。

2. **SEO関連ファイル作成**:
   - `src/app/sitemap.ts`を作成
   - `src/app/robots.ts`を作成  
   - `public/ads.txt`を作成

3. **パフォーマンス最適化**:
   - `OptimizedImage`コンポーネントを作成
   - `next.config.js`を最適化

4. **お問い合わせページ**: `src/app/contact/page.tsx`を作成

5. **ドキュメント更新**:
   - `docs/進捗レポート.md`を更新
   - `docs/アプリケーション概要.md`を更新
   - `DEPLOYMENT_CHECKLIST.md`を作成

6. **最終動作確認**: 全機能の動作確認を実施

## 注意点

- AdSenseアカウント申請前に全てのコンテンツとポリシーページが完備されている必要があります
- SEO最適化は継続的なプロセスです
- 収益化は長期的な視点で取り組む必要があります
- ユーザーエクスペリエンスを最優先に考慮してください

## 次のステップ

この最終設定が完了したら：
1. **AdSenseアカウント申請**を実施
2. **本格的な収益化運用**を開始
3. **継続的な最適化サイクル**を実行
4. **月$20収益目標**達成に向けた施策を展開

これで5段階のGoogle AdSense収益化機能実装プロンプトが完成しました！ 