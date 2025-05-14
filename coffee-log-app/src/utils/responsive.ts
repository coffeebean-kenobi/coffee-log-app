import { theme } from '../theme';

export const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
};

export const getResponsiveValue = <T>(
  values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
  },
  defaultValue: T
): T => {
  const width = window.innerWidth;
  if (width >= parseInt(breakpoints.xl) && values.xl) return values.xl;
  if (width >= parseInt(breakpoints.lg) && values.lg) return values.lg;
  if (width >= parseInt(breakpoints.md) && values.md) return values.md;
  if (width >= parseInt(breakpoints.sm) && values.sm) return values.sm;
  if (width >= parseInt(breakpoints.xs) && values.xs) return values.xs;
  return defaultValue;
};

/**
 * メディアクエリの文字列を生成するユーティリティ関数
 */
export const mediaQuery = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  tablet: `@media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
  touch: `@media (hover: none)`,
};

/**
 * 現在のビューポートがモバイルサイズかどうかを判定する
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= parseInt(theme.breakpoints.mobile);
};

/**
 * 現在のビューポートがタブレットサイズかどうかを判定する
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width > parseInt(theme.breakpoints.mobile) && width <= parseInt(theme.breakpoints.tablet);
};

/**
 * 現在のビューポートがデスクトップサイズかどうかを判定する
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > parseInt(theme.breakpoints.tablet);
};

/**
 * 現在のデバイスがタッチデバイスかどうかを判定する
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * レスポンシブスタイルを生成するヘルパー関数
 */
export const responsive = <T>(styles: {
  base: T;
  mobile?: Partial<T>;
  tablet?: Partial<T>;
  desktop?: Partial<T>;
}): T => {
  // このヘルパー関数はCSS-in-JSライブラリと組み合わせて使用することを想定しています
  // 実際の実装はライブラリによって異なります
  return styles.base;
}; 