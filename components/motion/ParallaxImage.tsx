"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How far the image drifts, in % of its overflow. Higher = more movement. */
  strength?: number;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
};

/**
 * Image with a scroll-linked vertical parallax. The inner <Image> is scaled up
 * and translated within an overflow-hidden frame, so no gaps ever show.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  strength = 18,
  priority = false,
  sizes = "100vw",
  rounded = false,
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !frame.current || !inner.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -strength / 2 },
        {
          yPercent: strength / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frame);
    return () => ctx.revert();
  }, [reduced, strength]);

  return (
    <div
      ref={frame}
      className={`relative overflow-hidden ${rounded ? "rounded-[var(--radius-lg)]" : ""} ${className ?? ""}`}
    >
      <div ref={inner} className="absolute inset-0" style={{ scale: reduced ? 1 : 1.15 }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
