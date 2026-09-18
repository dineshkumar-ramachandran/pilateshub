"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { hero, img, whatsappUrl } from "@/lib/content";
import { DUR, EASE } from "@/lib/motion";
import { LinkButton } from "@/components/ui/Button";
import { useIsTouch } from "@/lib/useReducedMotion";

/**
 * Hero — the practitioner keeps moving as you scroll.
 *
 * Structure:
 *   <section H = N * 100svh>              ← scroll travel
 *     <div sticky top-0 h-100svh>         ← pinned viewport frame
 *        [copy]   [image stack]           ← 4 cross-fade frames
 *     </div>
 *   </section>
 *
 * Each of the 4 sequence frames owns 1/N of the scroll travel. All four
 * cycle in place while the hero stays pinned to the viewport, then the
 * pin releases and the page continues down to the next section. The
 * `min-h-svh` wrapper ensures the pin lasts even if the user has a
 * short viewport.
 *
 * On mobile / touch we drop the pin (touch scroll + pins is fussy) and
 * just show a single hero frame in a normal-height section.
 */
export default function Hero() {
  const touch = useIsTouch();
  return touch ? <MobileHero /> : <DesktopHero />;
}

/* ------------------------------- Desktop --------------------------------- */

function DesktopHero() {
  const wrapper = useRef<HTMLDivElement>(null);
  const N = hero.sequence.length;

  const { scrollYProgress } = useScroll({
    target: wrapper,
    // start when the top of the wrapper hits the top of the viewport, end
    // when the BOTTOM of the wrapper hits the top of the viewport — i.e.
    // the entire tall wrapper's scroll.
    offset: ["start start", "end end"],
  });

  // Mouse-follow parallax on the sequence stack.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const parX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const parY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  // Ken-Burns lift over the WHOLE pin (subtle, not per-frame).
  const stackScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={wrapper}
      onMouseMove={onMove}
      className="relative bg-noir"
      style={{ height: `${N * 100}svh`, minHeight: `${N * 640}px` }}
      data-cursor="scroll"
    >
      <div className="sticky top-0 flex h-svh min-h-[640px] items-stretch overflow-hidden pt-24">
        <div className="container-page grid w-full grid-cols-12 gap-8">
          {/* ---------- Copy column ---------- */}
          <div className="col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: DUR.slow, ease: EASE.outSoft }}
            >
              <span className="eyebrow text-gold">{hero.kicker}</span>
            </motion.div>

            <div className="pt-6">
              <h1
                className="font-display text-cream"
                style={{ fontSize: "var(--text-hero)", lineHeight: 0.95, paddingBottom: "0.12em" }}
              >
                {hero.lines.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        delay: 0.5 + i * 0.12,
                        duration: DUR.cinematic,
                        ease: EASE.outSoft,
                      }}
                    >
                      {i === hero.lines.length - 1 ? (
                        <span className="italic text-gold">{line}</span>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-8 max-w-md text-lg leading-relaxed text-cream/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: DUR.slow, ease: EASE.outSoft }}
              >
                {hero.sub}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: DUR.slow, ease: EASE.outSoft }}
              >
                <LinkButton
                  href={whatsappUrl("Hi PilatesHub, I'd like to book a trial session.")}
                  external
                  variant="solid"
                >
                  Book a trial
                </LinkButton>
                <a href="#about" className="link-underline text-cream/80" data-cursor="view">
                  Explore Pilates ↓
                </a>
              </motion.div>
            </div>

            <div className="flex items-center gap-6 pb-10">
              <div className="flex flex-col">
                <span className="font-display text-4xl text-cream">1,000+</span>
                <span className="eyebrow mt-1 text-cream/60">Clients trained</span>
              </div>
              <div className="h-10 w-px bg-cream/20" />
              <div className="flex flex-col">
                <span className="font-display text-4xl text-cream">03</span>
                <span className="eyebrow mt-1 text-cream/60">Bengaluru studios</span>
              </div>
            </div>
          </div>

          {/* ---------- Sequence column ---------- */}
          <motion.div
            style={{ scale: stackScale, x: parX }}
            className="relative col-span-7 self-stretch overflow-hidden rounded-[var(--radius-lg)]"
          >
            {hero.sequence.map((id, i) => (
              <SequenceFrame
                key={id + i}
                src={img(id, 1800, 74)}
                index={i}
                total={N}
                progress={scrollYProgress}
                parY={parY}
                alt={`Pilates practitioner, pose ${i + 1} of ${N}`}
                priority={i === 0}
              />
            ))}

            <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] ring-1 ring-inset ring-cream/10" />

            {/* Frame progress rail — bottom */}
            <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center gap-3">
              <FrameCounter progress={scrollYProgress} total={N} />
              <div className="relative h-px flex-1 bg-cream/20">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-0 origin-left bg-gold"
                />
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-cream/70">
                In practice
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Mobile --------------------------------- */

function MobileHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-noir pt-24">
      {/* Full-bleed background image (only one — mobile keeps it simple) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={img(hero.sequence[0], 1400, 72)}
          alt="Pilates practitioner at the studio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legible-copy scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/40" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-6rem)] flex-col justify-between pb-10">
        <motion.span
          className="eyebrow text-gold"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: DUR.slow, ease: EASE.outSoft }}
        >
          {hero.kicker}
        </motion.span>

        <div>
          <h1
            className="font-display text-cream"
            style={{ fontSize: "var(--text-hero)", lineHeight: 0.95, paddingBottom: "0.12em" }}
          >
            {hero.lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.5 + i * 0.12, duration: DUR.cinematic, ease: EASE.outSoft }}
                >
                  {i === hero.lines.length - 1 ? (
                    <span className="italic text-gold">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-cream/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: DUR.slow, ease: EASE.outSoft }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: DUR.slow, ease: EASE.outSoft }}
          >
            <LinkButton
              href={whatsappUrl("Hi PilatesHub, I'd like to book a trial session.")}
              external
              variant="solid"
            >
              Book a trial
            </LinkButton>
            <a href="#about" className="link-underline text-sm text-cream/85">
              Explore Pilates ↓
            </a>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 border-t border-cream/15 pt-6">
            <div className="flex flex-col">
              <span className="font-display text-3xl text-cream">1,000+</span>
              <span className="eyebrow mt-1 text-cream/60">Clients trained</span>
            </div>
            <div className="h-8 w-px bg-cream/20" />
            <div className="flex flex-col">
              <span className="font-display text-3xl text-cream">03</span>
              <span className="eyebrow mt-1 text-cream/60">Studios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Sequence frame (desktop) ---------------------- */

function SequenceFrame({
  src,
  alt,
  index,
  total,
  progress,
  parY,
  priority,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  parY: MotionValue<number>;
  priority?: boolean;
}) {
  const slot = 1 / total;
  // Wider fade windows so consecutive frames overlap smoothly.
  const start = Math.max(0, index * slot - slot * 0.5);
  const peak = index * slot + slot * 0.15;
  const end = Math.min(1, index * slot + slot * 1.35);

  // First frame stays fully visible at scroll=0, last stays fully visible at scroll=1.
  const opacity = useTransform(
    progress,
    [start, peak, end],
    [index === 0 ? 1 : 0, 1, index === total - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [start, peak, end], [1.06, 1, 0.98]);

  return (
    <motion.div style={{ opacity, scale, y: parY }} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent" />
    </motion.div>
  );
}

function FrameCounter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const idx = useTransform(progress, (p) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(p * total * 0.999)));
    return `0${i + 1} / 0${total}`;
  });
  return <motion.span className="font-mono text-[0.7rem] text-gold">{idx}</motion.span>;
}
