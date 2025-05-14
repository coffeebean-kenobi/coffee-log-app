# テーマファイルの設定を実際に使用するための修正プロンプト

## 目的
コーヒー記録アプリのデザインを統一し、`src/theme`ディレクトリで定義されているテーマ設定を実際のアプリケーションコンポーネントに適用する。

## 背景
現在、アプリケーションでは`src/theme/index.ts`で`industrial-refined`テーマを使用する設定になっていますが、実際のスタイリングはTailwind CSSのCSS変数を使用しており、テーマファイルの設定が反映されていません。テーマファイルの設定を直接使用することで、デザインの一貫性とTypeScriptの型安全性を確保します。

## 実装方針

### 1. ThemeProviderの作成
- Reactのコンテキストを使用して、テーマをアプリケーション全体で使用できるようにする
- テーマの切り替え機能を将来的に実装できるよう拡張性を考慮する

### 2. スタイルユーティリティの作成
- テーマの値を簡単に取得できるヘルパー関数を作成
- Tailwind CSSと組み合わせて使用できるユーティリティを提供

### 3. コンポーネントの修正
- 既存のコンポーネントをテーマファイルの設定を使用するように修正
- インラインスタイルやCSS-in-JSを使用してテーマの値を適用

## 具体的な実装手順

### 1. ThemeProviderの実装
```tsx
// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme, Theme } from './index';

type ThemeContextType = {
  currentTheme: Theme;
  setTheme?: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({ currentTheme: theme });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setTheme] = useState<Theme>(theme);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 2. スタイルユーティリティの実装
```tsx
// src/theme/utils.ts
import { useTheme } from './ThemeProvider';

export const useThemeStyles = () => {
  const { currentTheme } = useTheme();
  
  return {
    color: (colorKey: string) => {
      // 例: color('primary.main') => currentTheme.colors.primary.main
      const keys = colorKey.split('.');
      let value: any = currentTheme.colors;
      for (const key of keys) {
        value = value[key];
      }
      return value;
    },
    typography: (typographyKey: string) => {
      // 例: typography('fontSize.h1') => currentTheme.typography.fontSize.h1
      const [category, key] = typographyKey.split('.');
      return currentTheme.typography[category][key];
    },
    spacing: (key: keyof typeof currentTheme.spacing) => {
      return currentTheme.spacing[key];
    },
    // 他のテーマプロパティに対するユーティリティ...
  };
};
```

### 3. レイアウトの修正
```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/theme/ThemeProvider';
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// Noto Sans JPフォントを設定
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: "コーヒー記録アプリ",
  description: "コーヒーの情報や感想を記録するアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <ThemeProvider>
        <body className={notoSansJP.className}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
```

### 4. コンポーネントでの使用例
```tsx
// 例: src/components/Button.tsx
import React from 'react';
import { useThemeStyles } from '@/theme/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  const styles = useThemeStyles();
  
  const buttonStyle = {
    backgroundColor: variant === 'primary' 
      ? styles.color('primary.main') 
      : styles.color('secondary.main'),
    color: variant === 'primary' 
      ? styles.color('primary.foreground') 
      : styles.color('secondary.foreground'),
    padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
    borderRadius: styles.borderRadius.md,
    fontFamily: styles.typography('fontFamily.body'),
    fontSize: styles.typography('fontSize.button'),
    fontWeight: styles.typography('fontWeight.medium'),
    letterSpacing: styles.typography('letterSpacing.button'),
    transition: `all ${styles.transitions.medium}`,
  };
  
  return (
    <button 
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 5. グローバルスタイルの更新
```css
/* src/app/globals.css の一部を更新 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS変数は削除または最小限に */
:root {
  /* テーマから直接参照できないグローバル設定のみ残す */
}

body {
  /* スタイルはThemeProviderから適用 */
}

/* アニメーションのキーフレームはそのまま残す */
@keyframes fade-in { /* ... */ }
/* ... */
```

## 注意点
1. テーマファイルの構造変更時は、型定義とユーティリティ関数の更新が必要
2. パフォーマンスを考慮し、不必要な再レンダリングを避けるよう設計する
3. Tailwind CSSとの併用方法を明確にし、チーム内で統一する

## 期待される効果
1. デザインの一貫性が向上する
2. テーマの切り替え機能の実装が容易になる
3. TypeScriptの型安全性により開発効率が向上する
4. テーマ設定の変更が自動的にアプリケーション全体に反映される 