/**
 * Motion system — shared tokens so the whole site animates as one thing.
 * Durations mirror the CSS custom properties in globals.css.
 */

export const DUR = {
  fast: 0.3,
  standard: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

// Custom easings (cubic-bezier arrays for Framer Motion / GSAP).
export const EASE = {
  outSoft: [0.22, 1, 0.36, 1] as const, // decelerate — reveals
  inOutSoft: [0.65, 0, 0.35, 1] as const, // symmetric — transitions
} as const;

// GSAP easing strings
export const GSAP_EASE = {
  outSoft: "power3.out",
  inOutSoft: "power2.inOut",
  expo: "expo.out",
} as const;

/** Standard staggered reveal for Framer Motion containers. */
export const revealContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.outSoft },
  },
};

/** Word/line rise used for headline reveals. */
export const riseItem = {
  hidden: { opacity: 0, y: "110%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: DUR.cinematic, ease: EASE.outSoft },
  },
};
