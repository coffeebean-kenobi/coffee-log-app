# コーヒー記録アプリのテーマ実装

## 概要

このアプリケーションでは、`src/theme` ディレクトリで定義されたテーマ設定を使用して、デザインの一貫性を確保しています。現在、`industrial-refined` テーマをベースにしたデザインシステムを実装しています。

## 実装済みのコンポーネント

以下のコンポーネントはテーマシステムを使用するように実装されています：

- `Button` - プライマリ、セカンダリ、アクセントの各バリアントに対応
- `Card` - 異なる影の深さ（sm, md, lg）をサポート
- `Typography` - 見出し（h1-h6）、本文（body1, body2）、キャプション対応
- `Container` - コンテンツの最大幅を制限するレイアウトコンポーネント

## 適用済みのページ

テーマシステムを部分的に適用済みのページ：

- ホームページ（`src/app/page.tsx`）
- コーヒー記録リスト（`src/app/coffee/page.tsx`）
- テーマデモページ（`src/app/theme-demo/page.tsx`）

## 今後の課題

1. **残りのページへの適用**
   - 以下のページはまだテーマシステムを使用していません：
     - プロフィールページ
     - サインイン/サインアップページ
     - コーヒー詳細/編集ページ

2. **既存のコンポーネントの更新**
   - `src/components` ディレクトリ内の残りのコンポーネントもテーマを使用するよう更新する必要があります

3. **Tailwind CSSとの統合**
   - 現在のテーマシステムはインラインスタイルを使用していますが、TailwindのCSS変数と連携させることで、より柔軟なスタイリングを実現できます
   - `tailwind.config.js` を更新してテーマの色やスペーシングを反映することを検討

4. **モバイル対応の強化**
   - テーマのブレークポイント設定を活用してレスポンシブデザインを改善

5. **ダークモード対応**
   - テーマに暗いバージョンを追加し、ユーザーの環境設定やシステム設定に応じて切り替える機能を実装

## 使用方法

### テーマスタイルの使用

```tsx
"use client";
import { useThemeStyles } from '@/theme/utils';

export const MyComponent = () => {
  const styles = useThemeStyles();
  
  return (
    <div style={{ 
      color: styles.color('text.primary'),
      backgroundColor: styles.color('background.main'),
      padding: styles.spacing('md'),
      borderRadius: styles.borderRadius('md'),
    }}>
      コンテンツ
    </div>
  );
};
```

### コンポーネントの使用例

```tsx
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';

export default function MyPage() {
  return (
    <Container>
      <Typography variant="h1">ページタイトル</Typography>
      <Typography variant="body1">説明テキスト</Typography>
      
      <Card>
        <Typography variant="h3">カードタイトル</Typography>
        <Typography variant="body2">カードの内容</Typography>
        <Button variant="primary">アクション</Button>
      </Card>
    </Container>
  );
}
``` 