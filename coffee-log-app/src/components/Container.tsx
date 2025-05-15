"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  style?: React.CSSProperties;
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  maxWidth = 'lg',
  className = '',
  style
}) => {
  const baseClasses = 'mx-auto px-4';
  const maxWidthClasses = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'max-w-screen-xl',
    full: 'w-full',
  };

  return (
    <div 
      className={cn(
        baseClasses,
        maxWidthClasses[maxWidth],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}; 