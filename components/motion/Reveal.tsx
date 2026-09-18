"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { DUR, EASE } from "@/lib/motion";
import { useInView } from "@/lib/useInView";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
};

/**
 * Fade + rise into view on scroll.
 * Uses our own IntersectionObserver hook because framer-motion's whileInView
 * fires unreliably in this project (Lenis smooth scroll interferes).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  amount = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: DUR.slow, ease: EASE.outSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
