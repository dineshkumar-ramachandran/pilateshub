"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Minimal custom cursor (desktop only). A small dot that grows and shows a
 * label when hovering elements marked with [data-cursor="view|drag|go"].
 * Native cursor is preserved on touch / reduced-motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !touch && !reduced;

  useEffect(() => {
    if (!enabled || !dot.current) return;
    const el = dot.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement;
      const holder = t.closest<HTMLElement>("[data-cursor]");
      if (holder) {
        setLabel(holder.dataset.cursor || null);
        setActive(true);
      } else {
        const interactive = t.closest("a, button, input, textarea, [role='button']");
        setActive(!!interactive);
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", move);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  const hasLabel = !!label;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`flex items-center justify-center rounded-full text-noir transition-[width,height,background-color] duration-300 ease-[var(--ease-out-soft)] ${
          hasLabel
            ? "h-16 w-16 bg-gold"
            : active
              ? "h-8 w-8 bg-gold/90"
              : "h-2.5 w-2.5 bg-gold"
        }`}
      >
        {hasLabel && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">{label}</span>
        )}
      </div>
    </div>
  );
}
