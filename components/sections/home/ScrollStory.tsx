"use client";

import { useEffect, useRef } from "react";
import { scrollStory } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// Deep, warm near-blacks that shift subtly beneath the gold word.
const TINTS = ["#0b0a07", "#14100a", "#1a140c", "#120f09", "#0a0906"];

export default function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      const pin = el.querySelector<HTMLElement>("[data-pin]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${words.length * 100}%`,
          pin: pin,
          scrub: 0.6,
        },
      });

      words.forEach((word, i) => {
        const label = word.querySelector("[data-word-label]");
        const idx = word.querySelector("[data-word-idx]");
        // fade/scale in
        tl.fromTo(
          [label, idx],
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, duration: 0.5, ease: "power3.out" },
          i
        );
        // background tint shift
        if (pin) {
          tl.to(pin, { backgroundColor: TINTS[i % TINTS.length], duration: 0.5 }, i);
        }
        // fade out (except last)
        if (i < words.length - 1) {
          tl.to([label, idx], { opacity: 0, yPercent: -40, duration: 0.5, ease: "power3.in" }, i + 0.5);
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Reduced-motion / no-JS fallback: a calm vertical list.
  if (reduced) {
    return (
      <section className="bg-coal py-28 text-cream">
        <div className="container-page">
          <p className="eyebrow mb-10 text-cream/50">The practice</p>
          <ul className="space-y-4">
            {scrollStory.map((w, i) => (
              <li key={w} className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span className="font-display text-[length:var(--text-display)] text-cream">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} aria-label="Align, breathe, strengthen, move, live">
      <div
        data-pin
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-noir text-cream"
        style={{ transition: "background-color 0.3s linear" }}
      >
        {/* Stacked, absolutely-positioned words that cross-fade */}
        <div className="relative flex w-full items-center justify-center">
          {scrollStory.map((w, i) => (
            <div
              key={w}
              data-word
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ opacity: 0 }}
            >
              <span data-word-idx className="mb-4 font-mono text-sm tracking-[0.3em] text-cream/50">
                0{i + 1} / 0{scrollStory.length}
              </span>
              <span
                data-word-label
                className="font-display italic leading-none tracking-tight text-gold"
                style={{ fontSize: "var(--text-hero)" }}
              >
                {w}
              </span>
            </div>
          ))}
        </div>

        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
          Keep scrolling
        </span>
      </div>
    </section>
  );
}
