import React from 'react';
import { theme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.borderRadius.sm,
        border: theme.borders.thin,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.sm,
        transition: theme.transitions.fast,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 