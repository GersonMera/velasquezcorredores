import type { Transition, Variants } from 'motion/react';

/**
 * Swiss architectural motion curve — crisp acceleration with authoritative deceleration, zero bounce.
 */
export const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

export const SWISS_SPRING_UNDERLINE: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

/**
 * Page-level entrance and exit transitions between the 5 main views.
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: SWISS_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.18,
      ease: SWISS_EASE,
    },
  },
};

/**
 * Directional horizontal enter/exit for multi-step wizard panels.
 */
export const stepTransitionVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 22 : -22,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.24,
      ease: SWISS_EASE,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -18 : 18,
    transition: {
      duration: 0.16,
      ease: SWISS_EASE,
    },
  }),
};

/**
 * Subtle swap transition for live-updating icons, prices, and form states.
 */
export const microSwapVariants: Variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: SWISS_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.14,
      ease: SWISS_EASE,
    },
  },
};

/**
 * Modal backdrop fade enter/exit.
 */
export const modalBackdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2, ease: SWISS_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16, ease: SWISS_EASE },
  },
};

/**
 * Modal dialog card architectural rise enter/exit.
 */
export const modalPanelVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.985,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: SWISS_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.985,
    transition: {
      duration: 0.16,
      ease: SWISS_EASE,
    },
  },
};

/**
 * Smooth vertical reveal/collapse for mobile navigation drawer and FAQ accordion bodies.
 */
export const collapseVariants: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.24, ease: SWISS_EASE },
      opacity: { duration: 0.2, ease: SWISS_EASE },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.18, ease: SWISS_EASE },
      opacity: { duration: 0.14, ease: SWISS_EASE },
    },
  },
};

/**
 * Staggered container & item variants for Swiss Grid cells and Hero elements.
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: SWISS_EASE,
    },
  },
};
