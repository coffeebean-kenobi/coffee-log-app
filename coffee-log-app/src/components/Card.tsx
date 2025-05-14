import React from 'react';
import { useThemeStyles } from '@/theme/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  elevation?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  elevation = 'sm',
  onClick
}) => {
  const styles = useThemeStyles();
  
  const cardStyle = {
    backgroundColor: styles.color('background.paper'),
    color: styles.color('text.primary'),
    borderRadius: styles.borderRadius('md'),
    padding: styles.spacing('lg'),
    boxShadow: styles.shadows(elevation),
    transition: `all ${styles.transitions('medium')}`,
    border: styles.borders('thin'),
    cursor: onClick ? 'pointer' : 'default',
  };
  
  return (
    <div 
      style={cardStyle}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 