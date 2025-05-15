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