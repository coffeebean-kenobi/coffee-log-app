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
  style?: React.CSSProperties;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'primary',
  className = '',
  component,
  style,
}) => {
  const Component = component || getComponentFromVariant(variant);
  
  const variantClasses = {
    h1: 'typography-h1',
    h2: 'typography-h2',
    h3: 'typography-h3',
    h4: 'typography-h4',
    h5: 'font-heading text-h5 font-bold text-text-primary leading-heading tracking-heading',
    h6: 'font-heading text-h6 font-bold text-text-primary leading-heading tracking-heading',
    body1: 'typography-body1',
    body2: 'typography-body2',
    caption: 'font-body text-caption font-normal text-text-secondary leading-body tracking-body',
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
      style={style}
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