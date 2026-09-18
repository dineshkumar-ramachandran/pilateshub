"use client";

import { motion, type MotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";

/**
 * Small building block: fades + optionally rises / scales into view.
 * Uses useInView (our own IntersectionObserver) because framer's
 * whileInView is unreliable in this project.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 24,
  scale,
  amount = 0.15,
  once = true,
  as = "div",
  ease = [0.16, 1, 0.3, 1] as [number, number, number, number],
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "li" | "span" | "section" | "article";
  ease?: [number, number, number, number];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once, amount });

  const initial: MotionProps["initial"] = { opacity: 0, y };
  const target: MotionProps["animate"] = { opacity: inView ? 1 : 0, y: inView ? 0 : y };
  if (scale !== undefined) {
    (initial as Record<string, unknown>).scale = scale;
    (target as Record<string, unknown>).scale = inView ? 1 : scale;
  }

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={initial}
      animate={target}
      transition={{ duration, ease, delay }}
    >
      {children}
    </Comp>
  );
}
