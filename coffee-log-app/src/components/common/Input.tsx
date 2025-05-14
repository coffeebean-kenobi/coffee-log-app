import React, { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { isMobile, isTouchDevice } from '../../utils/responsive';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  animateLabel?: boolean;
  loading?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  animateLabel = true,
  loading = false,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
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

    // 初期値があるかどうかをチェック
    if (props.value && typeof props.value === 'string' && props.value.length > 0) {
      setHasValue(true);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, [props.value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
    
    // 値があるかどうかをチェック
    if (e.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e);
    
    // 値があるかどうかをチェック
    if (e.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  return (
    <div style={{ 
      width: fullWidth ? '100%' : 'auto', 
      marginBottom: theme.spacing.md,
      position: 'relative',
    }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: animateLabel ? (isFocused || hasValue ? theme.spacing.xs : theme.spacing.md) : theme.spacing.xs,
            color: isFocused ? theme.colors.primary.main : theme.colors.text.secondary,
            fontSize: animateLabel && (isFocused || hasValue) 
              ? theme.typography.fontSize.caption
              : theme.typography.fontSize.body2,
            fontFamily: theme.typography.fontFamily.body,
            fontWeight: isFocused ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
            transition: `all ${theme.transitions.medium}`,
            transform: animateLabel && (isFocused || hasValue) 
              ? 'translateY(0)' 
              : 'translateY(0)',
            position: animateLabel ? 'absolute' : 'static',
            top: animateLabel ? '0' : 'auto',
            left: animateLabel ? '0' : 'auto',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          style={{
            width: '100%',
            padding: isMobileView 
              ? `${theme.spacing.md} ${theme.spacing.md}`
              : `${theme.spacing.md} ${theme.spacing.md}`,
            paddingTop: animateLabel && label ? (isMobileView ? theme.spacing.lg : theme.spacing.lg) : theme.spacing.md,
            border: error ? `2px solid ${theme.colors.text.error}` : isFocused ? `2px solid ${theme.colors.primary.main}` : theme.borders.thin,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: theme.colors.background.paper,
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            transition: `all ${theme.transitions.medium}`,
            outline: 'none',
            boxShadow: isFocused ? theme.shadows.sm : 'none',
            minHeight: isTouch ? theme.touchTarget.min : 'auto',
            opacity: loading ? 0.7 : 1,
            ...style,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={loading || props.disabled}
          {...props}
        />
        {loading && (
          <div style={{
            position: 'absolute',
            right: theme.spacing.sm,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: `2px solid ${theme.colors.primary.main}`,
            borderTopColor: 'transparent',
            animation: theme.animations.spin,
          }} />
        )}
      </div>
      {error && (
        <div
          style={{
            color: theme.colors.text.error,
            fontSize: theme.typography.fontSize.caption,
            marginTop: theme.spacing.xs,
            fontFamily: theme.typography.fontFamily.body,
            animation: theme.animations.fadeIn,
          }}
        >
          {error}
        </div>
      )}
      {helperText && !error && (
        <div
          style={{
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.caption,
            marginTop: theme.spacing.xs,
            fontFamily: theme.typography.fontFamily.body,
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}; 