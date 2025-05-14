import React, { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { isMobile, isTouchDevice } from '../../utils/responsive';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  style,
  disabled,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // ウィンドウサイズとタッチデバイスの検出
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileView(isMobile());
      setIsTouch(isTouchDevice());
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isActive 
            ? theme.colors.primary.dark 
            : isHovered 
              ? theme.colors.primary.light 
              : theme.colors.primary.main,
          color: theme.colors.background.paper,
          border: 'none',
          boxShadow: isActive 
            ? 'none' 
            : isHovered 
              ? theme.shadows.md 
              : theme.shadows.sm,
        };
      case 'secondary':
        return {
          backgroundColor: isActive 
            ? theme.colors.accent.dark 
            : isHovered 
              ? theme.colors.accent.light 
              : theme.colors.accent.main,
          color: theme.colors.primary.main,
          border: theme.borders.thin,
          borderColor: theme.colors.primary.light,
          boxShadow: isActive 
            ? 'none' 
            : isHovered 
              ? theme.shadows.md 
              : theme.shadows.sm,
        };
    }
  };

  const getSizeStyles = () => {
    // モバイルビューではボタンを少し大きくする
    const touchAdjustment = isTouch ? { 
      minHeight: theme.touchTarget.min,
      minWidth: theme.touchTarget.min 
    } : {};

    switch (size) {
      case 'small':
        return {
          padding: isMobileView 
            ? `${theme.spacing.sm} ${theme.spacing.md}` 
            : `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.body2,
          ...touchAdjustment,
        };
      case 'medium':
        return {
          padding: isMobileView 
            ? `${theme.spacing.md} ${theme.spacing.lg}` 
            : `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.body1,
          ...touchAdjustment,
        };
      case 'large':
        return {
          padding: isMobileView 
            ? `${theme.spacing.lg} ${theme.spacing.xl}` 
            : `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.h5,
          ...touchAdjustment,
        };
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        fontFamily: theme.typography.fontFamily.body,
        fontWeight: theme.typography.fontWeight.medium,
        borderRadius: theme.borderRadius.sm,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: `all ${theme.transitions.fast}`,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        letterSpacing: theme.typography.letterSpacing.button,
        transform: isActive 
          ? 'scale(0.98)' 
          : isHovered 
            ? 'translateY(-1px)' 
            : 'translateY(0)',
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {loading && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: `2px solid ${variant === 'primary' ? theme.colors.background.paper : theme.colors.primary.main}`,
            borderTopColor: 'transparent',
            animation: theme.animations.spin,
          }} />
        </div>
      )}
      {children}
    </button>
  );
}; 