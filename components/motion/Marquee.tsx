"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Continuous horizontal marquee ribbon. Duplicates its items for a seamless loop
 * and drifts via GSAP (paused under reduced motion).
 */
export default function Marquee({
  items,
  className,
  duration = 28,
  reverse = false,
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !track.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, ease: "none", duration, repeat: -1 }
      );
    }, track);
    return () => ctx.revert();
  }, [reduced, duration, reverse]);

  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden>
      <div ref={track} className="flex w-max items-center gap-10 will-change-transform">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[length:var(--text-h2)] italic text-cream/90">
              {it}
            </span>
            <span className="text-gold">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
