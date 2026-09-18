"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { progression } from "@/lib/content";
import { DUR, EASE } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Progression rail — Beginner → Foundation → Intermediate → Advanced.
 *
 * Layout fix vs prior version:
 * - The connecting line no longer bisects the cards (`top-1/2` bug that
 *   sliced through text and circles). It now sits ABOVE the cards at the
 *   pose-icon row, so text below breathes.
 * - Each stage uses a pose silhouette instead of a hollow circle, and
 *   number + name + copy stack cleanly below.
 * - Headline uses `leading-[1.1] pb-2` to reserve room for the descender
 *   of "program." — no more clipped `g`.
 */
export default function Progression() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section id="progression" className="bg-ink py-24 text-cream md:py-28">
      <div className="container-page">
        <SectionLabel index="06" className="text-cream/60">
          {progression.eyebrow}
        </SectionLabel>

        <RevealText
          as="h2"
          text={progression.title}
          by="word"
          className="mt-6 max-w-3xl pb-3 font-display text-[length:var(--text-h1)] leading-[1.12] text-cream"
        />

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-cream/75">
            {progression.intro}
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 md:mt-20">
          {/* Rail — desktop: horizontal line at the pose row; mobile: vertical along the left gutter */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[27px] top-0 h-full w-px bg-cream/12 md:left-0 md:top-[36px] md:h-px md:w-full"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="pointer-events-none absolute left-[27px] top-0 h-full w-px origin-top bg-gold md:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: lineScale }}
            className="pointer-events-none absolute left-0 top-[36px] hidden h-px w-full origin-left bg-gold md:block"
          />

          <ol className="grid gap-14 md:grid-cols-4 md:gap-8">
            {progression.stages.map((s, i) => (
              <FadeIn
                key={s.n}
                as="li"
                y={24}
                delay={i * 0.1}
                duration={DUR.slow}
                className="relative pl-16 md:pl-0"
              >
                {/* Pose mark — sits ON the rail (not crossing text) */}
                <FadeIn
                  scale={0.5}
                  y={0}
                  delay={0.2 + i * 0.1}
                  duration={DUR.standard}
                  className="absolute left-0 top-0 grid h-[52px] w-[52px] place-items-center rounded-full border border-gold/50 bg-noir text-gold md:left-1/2 md:top-[10px] md:-translate-x-1/2"
                >
                  <Image src={s.pose} alt="" width={30} height={30} className="opacity-90" />
                </FadeIn>

                {/* Text stack — starts BELOW the pose mark on desktop */}
                <div className="md:pt-24">
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold">
                    Stage {s.n}
                  </div>
                  <h3 className="mt-3 pb-1 font-display text-[length:var(--text-h3)] leading-[1.15] text-cream">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{s.copy}</p>
                </div>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
