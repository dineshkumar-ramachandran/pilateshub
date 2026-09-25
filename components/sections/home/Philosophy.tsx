"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { philosophy, poses } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { LinkButton } from "@/components/ui/Button";

// Six pillars paired with pose silhouettes. Each pillar reads like a movement
// idea rather than a marketing bullet.
const PILLARS = [
  { pose: poses.hundred, label: "Strength" },
  { pose: poses.swan, label: "Mobility" },
  { pose: poses.plank, label: "Posture" },
  { pose: poses.teaser, label: "Control" },
  { pose: poses.bridge, label: "Balance" },
  { pose: poses.rollup, label: "Consistency" },
];

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} id="philosophy" className="bg-coal py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-10">
        {/* ---------- Text column ---------- */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionLabel index="02">{philosophy.eyebrow}</SectionLabel>

            <RevealText
              as="h2"
              text={philosophy.title}
              by="word"
              className="mt-8 pb-2 font-display text-[length:var(--text-h1)] leading-[1.06] text-cream"
            />
            <div className="mt-8 max-w-md space-y-5 text-mist">
              {philosophy.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lg leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="mt-10">
              <LinkButton href="#sessions" variant="outline">
                Explore the sessions
              </LinkButton>
            </Reveal>
          </div>
        </div>

        {/* ---------- Image + pose pillar list ---------- */}
        <div className="md:col-span-7">
          <motion.div style={{ y: imgY }}>
            <FadeIn scale={1.06} y={0} duration={1.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ash">
                <Image quality={90}
                  src="/studio/philosophy-portrait.webp"
                  alt="PilatesHub studio philosophy"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </motion.div>

          {/* Six pose-labelled pillars beneath the image */}
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FadeIn
                key={p.label}
                as="li"
                y={12}
                delay={i * 0.06}
                duration={0.7}
                className="group flex items-center gap-3 border-t border-cream/12 pt-3"
              >
                <span className="relative grid h-8 w-8 shrink-0 place-items-center text-gold transition-transform group-hover:scale-110">
                  <Image quality={90} src={p.pose} alt="" width={32} height={32} className="h-full w-full" />
                </span>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cream">
                  {p.label}
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
