"use client";

import React from 'react';
import { useThemeStyles } from '@/theme/utils';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';

type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string; // 'text.primary', 'text.secondary', etc.
  className?: string;
  component?: React.ElementType;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'text.primary',
  className = '',
  component,
}) => {
  const styles = useThemeStyles();
  
  const getComponent = (): React.ElementType => {
    if (component) return component;
    
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
  };
  
  const Component = getComponent();
  
  const typographyStyle = {
    color: styles.color(color),
    fontSize: styles.typography(`fontSize.${variant}`),
    fontFamily: variant.startsWith('h') 
      ? styles.typography('fontFamily.heading') 
      : styles.typography('fontFamily.body'),
    fontWeight: variant.startsWith('h') 
      ? styles.typography('fontWeight.bold') 
      : variant === 'body2' 
        ? styles.typography('fontWeight.regular') 
        : styles.typography('fontWeight.medium'),
    lineHeight: variant.startsWith('h') 
      ? styles.typography('lineHeight.heading') 
      : styles.typography('lineHeight.body'),
    letterSpacing: variant.startsWith('h') 
      ? styles.typography('letterSpacing.heading') 
      : styles.typography('letterSpacing.body'),
    margin: variant.startsWith('h') ? `${styles.spacing('md')} 0` : '0',
  };
  
  return (
    <Component style={typographyStyle} className={className}>
      {children}
    </Component>
  );
}; 