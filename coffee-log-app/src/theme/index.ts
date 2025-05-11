import { industrialRefinedTheme } from '../design-samples/color-typography/industrial-refined/theme';

export type Theme = typeof industrialRefinedTheme;

export const defaultTheme: Theme = industrialRefinedTheme;

export const theme = {
  ...defaultTheme,
  // 必要に応じて追加のカスタマイズをここに記述
}; 