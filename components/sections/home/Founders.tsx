"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { founders, img } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";

export default function Founders() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Portrait rises slightly slower than the text — creates the parallax
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-noir py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-12">
        {/* ---------- Text column (LEFT) ---------- */}
        <div className="flex flex-col justify-center md:col-span-6">
          <SectionLabel index="01">{founders.eyebrow}</SectionLabel>

          {/* leading-[1.08] + pb-2 protect descenders on the ampersand & j */}
          <RevealText
            as="h2"
            text={founders.names}
            by="word"
            className="mt-8 pb-2 font-display text-[length:var(--text-display)] leading-[1.08] text-cream"
          />

          <div className="mt-8 max-w-lg space-y-5 text-mist">
            {founders.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Fact strip — grounds the narrative in numbers */}
          <Reveal delay={0.2} className="mt-10">
            <dl className="grid grid-cols-3 gap-8 border-t border-cream/12 pt-8">
              <div>
                <dt className="eyebrow text-cream/50">Studios</dt>
                <dd className="mt-2 font-display text-3xl text-cream">03</dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/50">Trained</dt>
                <dd className="mt-2 font-display text-3xl text-cream">1,000+</dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/50">Years</dt>
                <dd className="mt-2 font-display text-3xl text-cream">10+</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <LinkButton href="#method" variant="outline">
              Discover the method
            </LinkButton>
          </Reveal>
        </div>

        {/* ---------- Image column (RIGHT) ---------- */}
        <div className="md:col-span-6">
          <motion.div style={{ y: portraitY }} className="relative">
            <FadeIn scale={1.06} y={0} duration={1.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ash">
                <Image quality={90}
                  src={img(founders.image, 1200, 74)}
                  alt={`${founders.fullNames}, founders of PilatesHub`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_top] scale-[1.18] origin-top"
                />
              </div>
            </FadeIn>

            {/* Signature-style caption card floating over the portrait */}
            <FadeIn
              delay={0.5}
              duration={0.8}
              y={20}
              className="absolute -bottom-6 -left-6 max-w-[240px] rounded-[var(--radius-md)] border border-cream/10 bg-noir/90 p-5 backdrop-blur-md"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-gold">
                Founders
              </p>
              <p className="mt-2 font-display text-xl leading-tight text-cream">
                {founders.fullNames}
              </p>
              <p className="mt-2 text-xs text-mist">Bengaluru · since day one</p>
            </FadeIn>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
