import React, { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { isMobile, isTouchDevice } from '../../utils/responsive';
import { getAnimationStyle } from '../../utils/animations';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  interactive?: boolean;
  loading?: boolean;
  animationDelay?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  interactive = false,
  loading = false,
  animationDelay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ウィンドウサイズとタッチデバイスの検出
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileView(isMobile());
      setIsTouch(isTouchDevice());
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // アニメーション用にコンポーネントの表示を遅延させる
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, [animationDelay]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTouch) setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setIsActive(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };

  const isInteractive = interactive || Boolean(onClick);

  return (
    <div
      style={{
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.borderRadius.sm,
        border: theme.borders.thin,
        borderColor: isHovered && isInteractive ? theme.colors.accent.main : theme.colors.background.dark,
        padding: isMobileView ? theme.spacing.md : theme.spacing.lg,
        boxShadow: isActive && isInteractive 
          ? theme.shadows.sm 
          : isHovered && isInteractive 
            ? theme.shadows.md 
            : theme.shadows.sm,
        transition: `all ${theme.transitions.medium}`,
        cursor: isInteractive ? (loading ? 'wait' : 'pointer') : 'default',
        transform: isActive && isInteractive 
          ? 'scale(0.99)' 
          : isHovered && isInteractive 
            ? 'translateY(-2px)' 
            : 'translateY(0)',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? theme.animations.fadeIn : 'none',
        ...style,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={isInteractive ? handleMouseDown : undefined}
      onMouseUp={isInteractive ? handleMouseUp : undefined}
      onTouchStart={isInteractive ? handleMouseDown : undefined}
      onTouchEnd={isInteractive ? handleMouseUp : undefined}
    >
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.borderRadius.sm,
          zIndex: theme.zIndex.overlay,
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: `3px solid ${theme.colors.primary.main}`,
            borderTopColor: 'transparent',
            animation: theme.animations.spin,
          }} />
        </div>
      )}
      {children}
    </div>
  );
}; 