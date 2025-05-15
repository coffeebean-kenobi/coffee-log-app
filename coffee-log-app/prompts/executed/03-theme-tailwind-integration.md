# テーマシステムとTailwind CSSの統合

## 目的
コーヒー記録アプリのテーマシステムとTailwind CSSを統合し、テーマの一貫性を保ちながらTailwindの利便性を活用できるようにする。これにより、インラインスタイルの過剰な使用を避けつつ、テーマの色やスペーシングなどの値をクラスベースで統一的に適用できるようにする。

## 実装方針

### 1. Tailwind設定ファイルの更新
- テーマの色、間隔、シャドウなどの値をTailwindの設定に反映
- カスタムクラスと変数の定義

### 2. CSS変数の活用
- テーマの値をCSS変数として定義
- Tailwindからこれらの変数を参照

### 3. ユーティリティクラスの拡張
- テーマ固有のスタイリングを簡単に適用できるユーティリティクラスの作成

## Tailwind設定の更新例

```javascript
// tailwind.config.js
const { industrialRefinedTheme } = require('./src/design-samples/color-typography/industrial-refined/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: industrialRefinedTheme.colors.primary.main,
          light: industrialRefinedTheme.colors.primary.light,
          dark: industrialRefinedTheme.colors.primary.dark,
        },
        secondary: {
          main: industrialRefinedTheme.colors.secondary.main,
          light: industrialRefinedTheme.colors.secondary.light,
          dark: industrialRefinedTheme.colors.secondary.dark,
        },
        accent: {
          main: industrialRefinedTheme.colors.accent.main,
          light: industrialRefinedTheme.colors.accent.light,
          dark: industrialRefinedTheme.colors.accent.dark,
        },
        background: {
          main: industrialRefinedTheme.colors.background.main,
          paper: industrialRefinedTheme.colors.background.paper,
          dark: industrialRefinedTheme.colors.background.dark,
        },
        text: {
          primary: industrialRefinedTheme.colors.text.primary,
          secondary: industrialRefinedTheme.colors.text.secondary,
          disabled: industrialRefinedTheme.colors.text.disabled,
          error: industrialRefinedTheme.colors.text.error,
        },
      },
      spacing: {
        'xs': industrialRefinedTheme.spacing.xs,
        'sm': industrialRefinedTheme.spacing.sm,
        'md': industrialRefinedTheme.spacing.md,
        'lg': industrialRefinedTheme.spacing.lg,
        'xl': industrialRefinedTheme.spacing.xl,
      },
      borderRadius: {
        'sm': industrialRefinedTheme.borderRadius.sm,
        'md': industrialRefinedTheme.borderRadius.md,
        'lg': industrialRefinedTheme.borderRadius.lg,
      },
      boxShadow: {
        'sm': industrialRefinedTheme.shadows.sm,
        'md': industrialRefinedTheme.shadows.md,
        'lg': industrialRefinedTheme.shadows.lg,
      },
      fontFamily: {
        'heading': [industrialRefinedTheme.typography.fontFamily.heading],
        'body': [industrialRefinedTheme.typography.fontFamily.body],
      },
      fontSize: {
        'h1': industrialRefinedTheme.typography.fontSize.h1,
        'h2': industrialRefinedTheme.typography.fontSize.h2,
        'h3': industrialRefinedTheme.typography.fontSize.h3,
        'h4': industrialRefinedTheme.typography.fontSize.h4,
        'h5': industrialRefinedTheme.typography.fontSize.h5,
        'h6': industrialRefinedTheme.typography.fontSize.h6,
        'body1': industrialRefinedTheme.typography.fontSize.body1,
        'body2': industrialRefinedTheme.typography.fontSize.body2,
        'caption': industrialRefinedTheme.typography.fontSize.caption,
        'button': industrialRefinedTheme.typography.fontSize.button,
      },
      fontWeight: {
        'light': industrialRefinedTheme.typography.fontWeight.light,
        'regular': industrialRefinedTheme.typography.fontWeight.regular,
        'medium': industrialRefinedTheme.typography.fontWeight.medium,
        'bold': industrialRefinedTheme.typography.fontWeight.bold,
      },
      lineHeight: {
        'heading': industrialRefinedTheme.typography.lineHeight.heading,
        'body': industrialRefinedTheme.typography.lineHeight.body,
      },
      letterSpacing: {
        'heading': industrialRefinedTheme.typography.letterSpacing.heading,
        'body': industrialRefinedTheme.typography.letterSpacing.body,
        'button': industrialRefinedTheme.typography.letterSpacing.button,
      },
      transitionDuration: {
        'fast': industrialRefinedTheme.transitions.fast,
        'medium': industrialRefinedTheme.transitions.medium,
        'slow': industrialRefinedTheme.transitions.slow,
      },
      screens: {
        'mobile': `max-width: ${industrialRefinedTheme.breakpoints.mobile}`,
        'tablet': `max-width: ${industrialRefinedTheme.breakpoints.tablet}`,
        'desktop': `min-width: ${industrialRefinedTheme.breakpoints.desktop}`,
      },
    },
  },
  plugins: [],
};
```

## CSS変数定義の例

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors */
  --color-primary-main: theme('colors.primary.main');
  --color-primary-light: theme('colors.primary.light');
  --color-primary-dark: theme('colors.primary.dark');
  
  --color-secondary-main: theme('colors.secondary.main');
  --color-secondary-light: theme('colors.secondary.light');
  --color-secondary-dark: theme('colors.secondary.dark');
  
  --color-accent-main: theme('colors.accent.main');
  --color-accent-light: theme('colors.accent.light');
  --color-accent-dark: theme('colors.accent.dark');
  
  --color-background-main: theme('colors.background.main');
  --color-background-paper: theme('colors.background.paper');
  --color-background-dark: theme('colors.background.dark');
  
  --color-text-primary: theme('colors.text.primary');
  --color-text-secondary: theme('colors.text.secondary');
  --color-text-disabled: theme('colors.text.disabled');
  --color-text-error: theme('colors.text.error');
  
  /* Typography */
  --font-family-heading: theme('fontFamily.heading');
  --font-family-body: theme('fontFamily.body');
  
  /* Spacing */
  --spacing-xs: theme('spacing.xs');
  --spacing-sm: theme('spacing.sm');
  --spacing-md: theme('spacing.md');
  --spacing-lg: theme('spacing.lg');
  --spacing-xl: theme('spacing.xl');
  
  /* Border Radius */
  --border-radius-sm: theme('borderRadius.sm');
  --border-radius-md: theme('borderRadius.md');
  --border-radius-lg: theme('borderRadius.lg');
  
  /* Shadows */
  --shadow-sm: theme('boxShadow.sm');
  --shadow-md: theme('boxShadow.md');
  --shadow-lg: theme('boxShadow.lg');
  
  /* Transitions */
  --transition-fast: theme('transitionDuration.fast');
  --transition-medium: theme('transitionDuration.medium');
  --transition-slow: theme('transitionDuration.slow');
}

/* アニメーションのキーフレームは既存のまま保持 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 残りのキーフレームも同様に... */
```

## カスタムコンポーネントクラスの作成例

```css
/* src/app/globals.css (続き) */
@layer components {
  /* ボタンスタイル */
  .btn {
    @apply px-4 py-2 rounded-md transition-all duration-medium font-medium text-button inline-flex items-center justify-center;
  }
  
  .btn-primary {
    @apply bg-primary-main text-white hover:bg-primary-dark;
  }
  
  .btn-secondary {
    @apply bg-secondary-main text-white hover:bg-secondary-dark;
  }
  
  .btn-accent {
    @apply bg-accent-main text-white hover:bg-accent-dark;
  }
  
  .btn-outlined {
    @apply bg-transparent border border-primary-main text-primary-main hover:bg-primary-main/10;
  }
  
  /* カードスタイル */
  .card {
    @apply bg-background-paper rounded-md overflow-hidden;
  }
  
  .card-sm {
    @apply shadow-sm;
  }
  
  .card-md {
    @apply shadow-md;
  }
  
  .card-lg {
    @apply shadow-lg;
  }
  
  /* タイポグラフィスタイル */
  .typography-h1 {
    @apply font-heading text-h1 font-bold text-text-primary leading-heading tracking-heading;
  }
  
  .typography-h2 {
    @apply font-heading text-h2 font-bold text-text-primary leading-heading tracking-heading;
  }
  
  .typography-body1 {
    @apply font-body text-body1 font-regular text-text-primary leading-body tracking-body;
  }
  
  .typography-body2 {
    @apply font-body text-body2 font-regular text-text-secondary leading-body tracking-body;
  }
  
  /* フォーム要素 */
  .input {
    @apply w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-main/30 focus:border-primary-main;
  }
  
  .input-label {
    @apply block mb-1 text-body2 font-medium text-text-primary;
  }
  
  /* レイアウト */
  .container-sm {
    @apply max-w-screen-sm mx-auto px-4;
  }
  
  .container-md {
    @apply max-w-screen-md mx-auto px-4;
  }
  
  .container-lg {
    @apply max-w-screen-lg mx-auto px-4;
  }
}
```

## コンポーネントの修正例

```tsx
// src/components/Button.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils'; // クラス名を結合するユーティリティ

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outlined';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outlined: 'btn-outlined',
  };
  
  return (
    <button 
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && 'opacity-70 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
```

```tsx
// src/components/Typography.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';

type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: 'primary' | 'secondary' | 'disabled' | 'error';
  className?: string;
  component?: React.ElementType;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'primary',
  className = '',
  component,
}) => {
  const Component = component || getComponentFromVariant(variant);
  
  const variantClasses = {
    h1: 'typography-h1',
    h2: 'typography-h2',
    h3: 'font-heading text-h3 font-bold text-text-primary leading-heading tracking-heading',
    h4: 'font-heading text-h4 font-bold text-text-primary leading-heading tracking-heading',
    h5: 'font-heading text-h5 font-bold text-text-primary leading-heading tracking-heading',
    h6: 'font-heading text-h6 font-bold text-text-primary leading-heading tracking-heading',
    body1: 'typography-body1',
    body2: 'typography-body2',
    caption: 'font-body text-caption font-regular text-text-secondary leading-body tracking-body',
  };
  
  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    disabled: 'text-text-disabled',
    error: 'text-text-error',
  };
  
  return (
    <Component 
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
};

function getComponentFromVariant(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case 'h1': return 'h1';
    case 'h2': return 'h2';
    case 'h3': return 'h3';
    case 'h4': return 'h4';
    case 'h5': return 'h5';
    case 'h6': return 'h6';
    case 'body1': return 'p';
    case 'body2': return 'p';
    case 'caption': return 'span';
    default: return 'p';
  }
}
```

## ユーティリティ関数

```tsx
// src/lib/utils.ts
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// クラス名を結合するユーティリティ関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## プロジェクトの追加設定

1. 必要なパッケージをインストールする

```bash
npm install clsx tailwind-merge
```

2. TypeScriptの設定を更新する（必要に応じて）

```json
// tsconfig.json
{
  "compilerOptions": {
    // 既存の設定...
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 注意点

1. 移行戦略
   - 既存のインラインスタイルベースのコンポーネントから、Tailwindクラスベースのコンポーネントへ段階的に移行
   - 新しいコンポーネントから適用していく

2. パフォーマンスの考慮
   - 不要なTailwindクラスの削除（PurgeCSS）
   - バンドルサイズの最適化

3. コンポーネントの一貫性
   - Tailwindを使用する場合でも、コンポーネントAPIの互換性を維持

4. テーマ拡張性の保持
   - 将来的なダークモードなどのテーマ切り替えを考慮した設計

## 使用例

```tsx
// Tailwindクラスを使用したページコンポーネント例
"use client";

import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container-lg py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <Typography variant="h1" className="mb-4">コーヒー記録アプリ</Typography>
        <Typography variant="body1" className="max-w-xl mb-8">
          あなたの飲んだコーヒーを記録して、コーヒー体験をもっと豊かにしましょう。
        </Typography>
        
        <div className="flex gap-4">
          <Link href="/signin">
            <Button variant="primary">ログイン</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outlined">登録する</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="card card-md p-6">
          <Typography variant="h4" className="mb-2">記録する</Typography>
          <Typography variant="body2">
            飲んだコーヒーの情報を簡単に記録できます。
          </Typography>
        </div>
        
        <div className="card card-md p-6">
          <Typography variant="h4" className="mb-2">発見する</Typography>
          <Typography variant="body2">
            新しいコーヒーとの出会いを楽しみましょう。
          </Typography>
        </div>
        
        <div className="card card-md p-6">
          <Typography variant="h4" className="mb-2">分析する</Typography>
          <Typography variant="body2">
            あなたのコーヒー嗜好を分析して、好みを知りましょう。
          </Typography>
        </div>
      </div>
    </div>
  );
} 