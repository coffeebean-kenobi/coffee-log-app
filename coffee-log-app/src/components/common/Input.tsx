import React from 'react';
import { theme } from '../../theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  style,
  ...props
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.body2,
            fontFamily: theme.typography.fontFamily.body,
          }}
        >
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          padding: theme.spacing.md,
          border: error ? theme.borders.medium : theme.borders.thin,
          borderColor: error ? theme.colors.text.error : undefined,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.background.paper,
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.body1,
          transition: theme.transitions.fast,
          outline: 'none',
          ...style,
        }}
        {...props}
      />
      {error && (
        <div
          style={{
            color: theme.colors.text.error,
            fontSize: theme.typography.fontSize.caption,
            marginTop: theme.spacing.xs,
            fontFamily: theme.typography.fontFamily.body,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}; 