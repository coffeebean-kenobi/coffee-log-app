import React from 'react';
import { useThemeStyles } from '@/theme/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  disabled = false
}) => {
  const styles = useThemeStyles();
  
  const buttonStyle = {
    backgroundColor: styles.color(`${variant}.main`),
    color: variant === 'primary' 
      ? styles.color('text.primary') 
      : styles.color('background.paper'),
    padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
    borderRadius: styles.borderRadius('md'),
    fontFamily: styles.typography('fontFamily.body'),
    fontSize: styles.typography('fontSize.button'),
    fontWeight: styles.typography('fontWeight.medium'),
    letterSpacing: styles.typography('letterSpacing.button'),
    transition: `all ${styles.transitions('medium')}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    border: 'none',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: styles.shadows('sm'),
  };
  
  return (
    <button 
      style={buttonStyle}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}; 