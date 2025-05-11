import React from 'react';
import { theme } from '../../theme';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary.main,
          color: theme.colors.background.paper,
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.accent.main,
          color: theme.colors.primary.main,
          border: theme.borders.thin,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.body2,
        };
      case 'medium':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.body1,
        };
      case 'large':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.h5,
        };
    }
  };

  return (
    <button
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        fontFamily: theme.typography.fontFamily.body,
        fontWeight: theme.typography.fontWeight.medium,
        borderRadius: theme.borderRadius.sm,
        cursor: 'pointer',
        transition: theme.transitions.fast,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}; 