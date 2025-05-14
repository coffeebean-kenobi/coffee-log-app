import { theme } from '../theme';

/**
 * アニメーションスタイルを生成するヘルパー関数
 */
export const getAnimationStyle = (animationName: keyof typeof theme.animations) => {
  return { animation: theme.animations[animationName] };
};

/**
 * トランジションスタイルを生成するヘルパー関数
 */
export const getTransitionStyle = (
  properties: string[] = ['all'],
  duration: keyof typeof theme.transitions = 'medium',
  timingFunction: string = 'ease'
) => {
  const transitionValue = properties
    .map((prop) => `${prop} ${theme.transitions[duration]} ${timingFunction}`)
    .join(', ');
  
  return { transition: transitionValue };
};

/**
 * ホバーエフェクトのスタイルを生成するヘルパー関数
 * React のステート管理と組み合わせて使用します
 */
export const getHoverStyle = (isHovered: boolean, styles: React.CSSProperties) => {
  return isHovered ? styles : {};
};

/**
 * クリックエフェクトのスタイルを生成するヘルパー関数
 * React のステート管理と組み合わせて使用します
 */
export const getActiveStyle = (isActive: boolean, styles: React.CSSProperties) => {
  return isActive ? styles : {};
};

/**
 * ローディングスピナーのスタイルを生成するヘルパー関数
 */
export const getSpinnerStyle = (size: string = '24px', color: string = theme.colors.primary.main) => {
  return {
    width: size,
    height: size,
    borderRadius: '50%',
    border: `2px solid ${color}`,
    borderTopColor: 'transparent',
    animation: theme.animations.spin,
  };
};

/**
 * フェードインアニメーションを適用するヘルパー関数
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

/**
 * スライドアップアニメーションを適用するヘルパー関数
 */
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

/**
 * スケールアニメーションを適用するヘルパー関数
 */
export const scale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
};

export const slideIn = {
  from: {
    transform: 'translateY(20px)',
    opacity: 0,
  },
  to: {
    transform: 'translateY(0)',
    opacity: 1,
  },
  config: {
    duration: theme.transitions.medium,
  },
};

export const scaleIn = {
  from: {
    transform: 'scale(0.95)',
    opacity: 0,
  },
  to: {
    transform: 'scale(1)',
    opacity: 1,
  },
  config: {
    duration: theme.transitions.medium,
  },
};

export const hoverScale = {
  transform: 'scale(1.02)',
  transition: `transform ${theme.transitions.fast}`,
};

export const hoverShadow = {
  boxShadow: theme.shadows.lg,
  transition: `box-shadow ${theme.transitions.fast}`,
}; 