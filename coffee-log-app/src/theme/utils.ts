"use client";

import { useTheme } from './ThemeProvider';
import { Theme } from './index';

type TypographyCategory = keyof Theme['typography'];

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
  };
}; 