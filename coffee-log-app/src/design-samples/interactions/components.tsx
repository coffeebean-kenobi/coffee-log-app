import React from 'react';
import { motion } from 'framer-motion';
import { animations, transitions } from './animations';

export const AnimatedCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <motion.div
      whileHover={animations.hover}
      whileTap={animations.tap}
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      exit={animations.scale.exit}
      transition={transitions.smooth}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={animations.hover}
      whileTap={animations.tap}
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      transition={transitions.quick}
      onClick={onClick}
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {children}
    </motion.button>
  );
};

export const AnimatedList = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={animations.fadeIn.initial}
      animate={animations.fadeIn.animate}
      exit={animations.fadeIn.exit}
      transition={transitions.default}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedListItem = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <motion.div
      initial={animations.slideIn.initial}
      animate={animations.slideIn.animate}
      exit={animations.slideIn.exit}
      transition={{
        ...transitions.smooth,
        delay: index * 0.1
      }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={animations.slideUp.initial}
      animate={animations.slideUp.animate}
      exit={animations.slideUp.exit}
      transition={transitions.default}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedStats = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      transition={{
        ...transitions.smooth,
        delay: 0.2
      }}
    >
      {children}
    </motion.div>
  );
}; 