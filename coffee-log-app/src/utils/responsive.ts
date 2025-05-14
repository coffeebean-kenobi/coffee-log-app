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