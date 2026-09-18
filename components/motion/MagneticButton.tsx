"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useReducedMotion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Wraps content in a magnetic hover field (desktop, motion-on only).
 * The element eases toward the cursor and springs back on leave.
 */
export default function MagneticButton({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const disabled = touch || reduced;

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
