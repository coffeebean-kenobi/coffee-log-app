"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  variant?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'md',
  className = '',
  style
}) => {
  const baseClasses = 'card';
  const variantClasses = {
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg',
  };
  
  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}; 