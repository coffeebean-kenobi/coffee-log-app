# テーマシステムのダークモードサポート追加

## 目的
コーヒー記録アプリにダークモードのサポートを追加し、ユーザーの環境設定や好みに応じたテーマ切り替えを可能にする。これにより、夜間使用時の目の負担軽減や、バッテリー消費の最適化、ユーザーエクスペリエンスの向上を図る。

## 実装方針

### 1. ダークテーマの定義
- 既存のテーマをベースにしたダークバージョンの作成
- コントラスト比の確保と読みやすさの維持

### 2. テーマ切り替え機能の実装
- ユーザーの手動切り替え
- システム設定に基づく自動切り替え
- 設定の永続化

### 3. コンポーネントの対応
- 明示的なダークモードスタイルの適用
- 条件付きスタイリングの実装

## ダークテーマの定義例

```typescript
// src/theme/dark-theme.ts
import { industrialRefinedTheme } from '../design-samples/color-typography/industrial-refined/theme';
import type { Theme } from './index';

export const darkTheme: Theme = {
  ...industrialRefinedTheme,
  colors: {
    primary: {
      main: '#60A5FA',    // 明るめのブルー
      light: '#93C5FD',   // より明るいブルー
      dark: '#2563EB',    // 暗めのブルー
    },
    secondary: {
      main: '#6B7280',    // ミディアムグレー
      light: '#9CA3AF',   // ライトグレー
      dark: '#4B5563',    // ダークグレー
    },
    accent: {
      main: '#F59E0B',    // ゴールド
      light: '#FBBF24',   // ライトゴールド
      dark: '#D97706',    // ダークゴールド
    },
    background: {
      main: '#1F2937',    // ダークブルーグレー
      paper: '#111827',   // ほぼブラック
      dark: '#374151',    // ミディアムブルーグレー
    },
    text: {
      primary: '#F9FAFB',     // ほぼホワイト
      secondary: '#D1D5DB',   // ライトグレー
      disabled: '#6B7280',    // ミディアムグレー
      error: '#EF4444',       // 赤
    },
    highlight: {
      main: '#FBBF24',    // ゴールド
      light: '#FCD34D',   // ライトゴールド
      dark: '#D97706',    // ダークゴールド
    },
  },
  // その他のプロパティは元のテーマから継承
};
```

## テーマプロバイダーの拡張

```tsx
// src/theme/ThemeProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { theme as lightTheme, Theme } from './index';
import { darkTheme } from './dark-theme';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  currentTheme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const defaultContext: ThemeContextType = {
  currentTheme: lightTheme,
  mode: 'system',
  setMode: () => {},
  isDark: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);
  
  // ローカルストレージからテーマモードを読み込む
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
      setMode(savedMode as ThemeMode);
    }
  }, []);
  
  // システムのダークモード設定を検出
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (mode === 'system') {
        setIsDark(mediaQuery.matches);
      }
    };
    
    // 初期設定
    if (mode === 'system') {
      setIsDark(mediaQuery.matches);
    } else {
      setIsDark(mode === 'dark');
    }
    
    // 変更の監視
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);
  
  // モード変更時にローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);
  
  // HTML要素にdata-theme属性を設定
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  // 現在のテーマを設定
  const currentTheme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ currentTheme, mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## スタイルユーティリティの更新

```tsx
// src/theme/utils.ts
"use client";

import { useTheme } from './ThemeProvider';
import type { Theme } from './index';

type TypographyCategory = keyof Theme['typography'];

export const useThemeStyles = () => {
  const { currentTheme, isDark } = useTheme();
  
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
      const typographyCategory = category as TypographyCategory;
      
      // @ts-ignore - 動的なアクセスのため型エラーを無視
      return currentTheme.typography[typographyCategory]?.[key] || '';
    },
    spacing: (key: keyof typeof currentTheme.spacing) => {
      return currentTheme.spacing[key];
    },
    borderRadius: (key: keyof typeof currentTheme.borderRadius) => {
      return currentTheme.borderRadius[key];
    },
    shadows: (key: keyof typeof currentTheme.shadows) => {
      return currentTheme.shadows[key];
    },
    borders: (key: keyof typeof currentTheme.borders) => {
      return currentTheme.borders[key];
    },
    transitions: (key: keyof typeof currentTheme.transitions) => {
      return currentTheme.transitions[key];
    },
    breakpoints: (key: keyof typeof currentTheme.breakpoints) => {
      return currentTheme.breakpoints[key];
    },
    animations: (key: keyof typeof currentTheme.animations) => {
      return currentTheme.animations[key];
    },
    zIndex: (key: keyof typeof currentTheme.zIndex) => {
      return currentTheme.zIndex[key];
    },
    // ダークモード状態の確認
    isDarkMode: () => isDark,
    // 条件付きカラー
    colorMode: (lightColor: string, darkColor: string) => {
      return isDark ? darkColor : lightColor;
    },
  };
};
```

## Tailwind CSS設定の更新

```js
// tailwind.config.js
const { industrialRefinedTheme } = require('./src/design-samples/color-typography/industrial-refined/theme');
const { darkTheme } = require('./src/theme/dark-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ダークモードをクラスに基づいて適用
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // 既存の設定...
    },
  },
  plugins: [],
};
```

## CSS変数の更新

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* ライトモードのデフォルト変数 */
  --color-primary-main: theme('colors.primary.main');
  --color-primary-light: theme('colors.primary.light');
  --color-primary-dark: theme('colors.primary.dark');
  /* 他の変数... */
}

[data-theme="dark"] {
  /* ダークモードの変数 */
  --color-primary-main: #60A5FA;
  --color-primary-light: #93C5FD;
  --color-primary-dark: #2563EB;
  
  --color-background-main: #1F2937;
  --color-background-paper: #111827;
  --color-background-dark: #374151;
  
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #D1D5DB;
  --color-text-disabled: #6B7280;
  /* 他の変数... */
}

/* 既存のアニメーションなど... */
```

## テーマ切り替えコンポーネントの実装

```tsx
// src/components/ThemeToggle.tsx
"use client";

import React from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useThemeStyles } from '@/theme/utils';

export const ThemeToggle: React.FC = () => {
  const { mode, setMode, isDark } = useTheme();
  const styles = useThemeStyles();
  
  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };
  
  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={handleToggle}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: styles.spacing('sm'),
          borderRadius: styles.borderRadius('md'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      >
        {isDark ? (
          // 太陽アイコン（ライトモードへ）
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          // 月アイコン（ダークモードへ）
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      
      <div style={{ marginLeft: styles.spacing('md') }}>
        <select
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as 'light' | 'dark' | 'system')}
          style={{
            padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
            backgroundColor: styles.color('background.paper'),
            color: styles.color('text.primary'),
            border: styles.borders('thin'),
            borderRadius: styles.borderRadius('sm'),
            fontSize: styles.typography('fontSize.body2'),
          }}
        >
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
          <option value="system">システム設定</option>
        </select>
      </div>
    </div>
  );
};
```

## レイアウトへの統合

```tsx
// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Container } from '@/components/Container';
import { useThemeStyles } from '@/theme/utils';

export const Header = () => {
  const styles = useThemeStyles();
  
  return (
    <header style={{
      backgroundColor: styles.color('background.paper'),
      borderBottom: styles.borders('thin'),
      position: 'sticky',
      top: 0,
      zIndex: styles.zIndex('header'),
    }}>
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${styles.spacing('md')} 0`,
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{
              fontSize: styles.typography('fontSize.h5'),
              fontWeight: styles.typography('fontWeight.bold'),
              margin: 0,
            }}>
              コーヒー記録アプリ
            </h1>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing('md') }}>
            <nav>
              {/* ナビゲーションリンク */}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};
```

## Tailwindクラスを使用した場合の例

```tsx
// src/components/Card.tsx (Tailwindバージョン)
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  elevation?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  elevation = 'sm',
  onClick
}) => {
  const elevationClasses = {
    sm: 'shadow-sm dark:shadow-gray-900/20',
    md: 'shadow-md dark:shadow-gray-900/40',
    lg: 'shadow-lg dark:shadow-gray-900/60',
  };
  
  return (
    <div 
      className={cn(
        'bg-background-paper dark:bg-background-paper rounded-md border border-gray-200 dark:border-gray-800',
        elevationClasses[elevation],
        'transition-all duration-medium',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
```

## 注意点

1. アクセシビリティへの配慮
   - コントラスト比の確保（WCAG基準への適合）
   - フォーカス可視性の維持
   - スクリーンリーダーへの対応

2. テーマ切り替え時のスムーズな遷移
   - 突然の変化を避けるためのトランジション
   - ちらつきの防止

3. 一貫性の保持
   - ダークモードでも同じUIの使いやすさを維持
   - コンポーネントの見た目と操作性の一貫性

4. パフォーマンスの最適化
   - CSSの変数の利用による効率的な切り替え
   - 不要な再レンダリングの防止

5. メディアクエリとの連携
   - `prefers-color-scheme` への対応
   - デバイスの設定との調和

## テスト項目

1. テーマ切り替えの動作確認
   - 手動での切り替えが正常に機能するか
   - システム設定の変更に追従するか
   - 設定が永続化されるか

2. コンポーネント表示の確認
   - すべてのコンポーネントがダークモードに適切に対応しているか
   - テキストの読みやすさが確保されているか

3. 操作性の確認
   - ダークモード時にも操作性が維持されているか
   - フォーカス状態や選択状態が明確に表示されるか

4. パフォーマンス確認
   - テーマ切り替え時の遅延やちらつきがないか
   - リソース使用量は適切か 