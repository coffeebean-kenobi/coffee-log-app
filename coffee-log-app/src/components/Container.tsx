"use client";

import React from 'react';
import { useThemeStyles } from '@/theme/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
}) => {
  const styles = useThemeStyles();
  
  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'sm': return '640px';
      case 'md': return '768px';
      case 'lg': return '1024px';
      case 'xl': return '1280px';
      case 'full': return '100%';
      default: return '1024px';
    }
  };
  
  const containerStyle = {
    width: '100%',
    maxWidth: getMaxWidth(),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `0 ${styles.spacing('md')}`,
  };
  
  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
}; 