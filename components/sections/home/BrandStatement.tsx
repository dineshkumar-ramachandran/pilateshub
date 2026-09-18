"use client";

import { useEffect, useRef } from "react";
import { brandStatement } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Marquee from "@/components/motion/Marquee";

const RIBBON = ["Strength", "Control", "Breath", "Alignment", "Balance", "Movement"];

export default function BrandStatement() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = brandStatement.join(" ").split(" ");

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            end: "bottom 62%",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="bg-noir py-28 md:py-40">
      <div ref={root} className="container-page">
        <SectionLabel index="01">The idea</SectionLabel>
        <h2 className="mt-10 max-w-5xl font-display text-[length:var(--text-display)] leading-[1.04] text-cream">
          {words.map((w, i) => (
            <span
              key={i}
              data-word
              className={`mr-[0.22em] inline-block ${reduced ? "" : "opacity-20"}`}
            >
              {w === "strength," ? <span className="italic text-gold">{w}</span> : w}
            </span>
          ))}
        </h2>
      </div>

      <div className="mt-20 border-y border-line py-6">
        <Marquee items={RIBBON} />
      </div>
    </section>
  );
}
