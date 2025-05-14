import { theme } from '../theme';

export const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  config: {
    duration: theme.transitions.medium,
  },
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