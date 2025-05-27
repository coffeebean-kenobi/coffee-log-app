# LOGCUP 独自ドメイン移行計画

## 概要
Coffee Log App（LOGCUP）の独自ドメイン移行を段階的に実施する計画書です。

## 推奨ドメイン候補

### 第1候補：`logcup.app`
- ✅ ブランド名と完全一致
- ✅ アプリケーションを明確に表現
- ✅ 覚えやすい
- 💰 コスト：約$20/年

### 第2候補：`logcup.com`
- ✅ 最も一般的なTLD
- ✅ 信頼性が高い
- ✅ SEOに有利
- 💰 コスト：約$12/年

### 第3候補：`coffee-log.app`
- ✅ 機能を明確に表現
- ⚠️ やや長い
- 💰 コスト：約$20/年

## 移行スケジュール

### Week 1: ドメイン取得・DNS設定
1. **ドメイン取得**
   - お名前.com、ムームードメイン、またはCloudflareで取得
   - 推奨：Cloudflareでの取得（DNS管理が簡単）

2. **Vercelでのドメイン設定**
   ```bash
   # Vercelダッシュボードで設定
   1. Project Settings → Domains
   2. 新しいドメインを追加
   3. DNS設定をコピー
   ```

3. **DNS設定**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Week 2: SSL証明書・リダイレクト設定
1. **SSL証明書の自動発行確認**
2. **リダイレクト設定**
   - `coffee-log-app.vercel.app` → `logcup.app`
   - `www.logcup.app` → `logcup.app`

### Week 3: SEO・Analytics移行
1. **Google Analytics設定更新**
2. **Google Search Console追加**
3. **サイトマップ更新**

## 技術的実装

### 1. Next.js設定更新

```javascript
// next.config.js
const nextConfig = {
  // ... 既存設定
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'coffee-log-app.vercel.app',
          },
        ],
        destination: 'https://logcup.app/:path*',
        permanent: true,
      },
    ]
  },
  
  // カスタムドメイン設定
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://logcup.app' 
      : 'http://localhost:3000',
  },
}
```

### 2. メタデータ更新

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://logcup.app'),
  title: {
    default: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    template: '%s | LOGCUP'
  },
  // ... その他のメタデータ
}
```

### 3. 環境変数更新

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://logcup.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## SEO移行戦略

### 1. 301リダイレクト設定
- 全ての旧URLから新URLへの永続リダイレクト
- Vercelの自動リダイレクト機能を活用

### 2. サイトマップ更新
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://logcup.app/</loc>
    <lastmod>2024-12-XX</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- その他のページ -->
</urlset>
```

### 3. Google Search Console設定
1. 新しいプロパティ追加：`logcup.app`
2. サイトマップ送信
3. 旧ドメインからの移行通知

## リスク管理

### 潜在的リスク
1. **一時的なSEOランキング低下**
   - 対策：301リダイレクトの適切な設定
   - 期間：1-2週間程度

2. **ユーザーの混乱**
   - 対策：アプリ内での告知
   - 期間：移行前1週間の事前告知

3. **外部リンクの切れ**
   - 対策：主要な外部リンク元への連絡
   - 期間：移行後1ヶ月間の監視

### 緊急時対応
- 旧ドメインは最低6ヶ月間維持
- 問題発生時の即座のロールバック手順

## 成功指標

### 技術指標
- [ ] SSL証明書の正常発行
- [ ] 全ページの正常アクセス確認
- [ ] リダイレクトの正常動作
- [ ] パフォーマンス維持（Lighthouse 90+）

### ビジネス指標
- [ ] 検索順位の維持・向上
- [ ] ユーザー数の維持
- [ ] 収益目標の達成継続

## 予算

### 初期費用
- ドメイン取得：$12-20/年
- 設定作業：0円（自作業）

### 継続費用
- ドメイン更新：$12-20/年
- Vercel：現在の無料プランで継続可能

## 次のステップ

1. **即座に実行**：ドメイン取得
2. **Week 1**：DNS設定・Vercel連携
3. **Week 2**：リダイレクト・SSL設定
4. **Week 3**：SEO設定・監視開始

---

**結論：今すぐドメイン取得を開始し、段階的に移行することを強く推奨します。** 