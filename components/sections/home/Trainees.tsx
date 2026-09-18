"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { traineeVideos, site, whatsappUrl, poses } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { useInView } from "@/lib/useInView";
import Image from "next/image";

/**
 * Trainees — a wall of 8 real trainee testimonial clips.
 *
 * Interaction:
 *  - Tiles play muted on hover (desktop) / when in viewport (touch).
 *  - Click opens the clip in a lightbox with sound.
 *  - Tiles are laid out as a staggered mosaic that gently parallaxes on scroll.
 */
export default function Trainees() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const colAY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const colBY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Split the 8 clips into 2 parallaxed columns (mobile: single stack)
  const colA = traineeVideos.filter((_, i) => i % 2 === 0);
  const colB = traineeVideos.filter((_, i) => i % 2 === 1);

  return (
    <section ref={ref} className="relative overflow-hidden bg-noir py-24 md:py-32">
      <div className="container-page">
        <SectionLabel index="07">A word from our trainees</SectionLabel>

        <p className="mt-6 max-w-xl font-mono text-[0.7rem] uppercase tracking-[0.28em] text-gold">
          {site.clientsTrained.toLocaleString()}+ clients trained across Bengaluru
        </p>

        <RevealText
          as="h2"
          text="Their stories, in motion."
          by="word"
          className="mt-8 max-w-4xl pb-2 font-display text-[length:var(--text-h1)] leading-[1.08] text-cream"
        />

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-mist">
            Eight of our trainees, in their own words. Hover a tile to preview, tap to watch.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <motion.div style={{ y: colAY }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
            {colA.map((src, i) => (
              <VideoTile
                key={src}
                src={src}
                index={i * 2}
                pose={POSE_ROTATION[i * 2 % POSE_ROTATION.length]}
                onOpen={() => setOpen(src)}
              />
            ))}
          </motion.div>
          <motion.div style={{ y: colBY }} className="mt-0 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:grid-cols-1">
            {colB.map((src, i) => (
              <VideoTile
                key={src}
                src={src}
                index={i * 2 + 1}
                pose={POSE_ROTATION[(i * 2 + 1) % POSE_ROTATION.length]}
                onOpen={() => setOpen(src)}
              />
            ))}
          </motion.div>
        </div>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center gap-5">
          <LinkButton href={site.instagram} external variant="outline">
            Watch more on Instagram
          </LinkButton>
          <a
            href={whatsappUrl("Hi PilatesHub, I'd love to share my experience.")}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-gold"
          >
            Share your story →
          </a>
        </Reveal>
      </div>

      <Lightbox src={open} onClose={() => setOpen(null)} />
    </section>
  );
}

const POSE_ROTATION = [
  poses.hundred,
  poses.rollup,
  poses.swan,
  poses.teaser,
  poses.bridge,
  poses.plank,
  poses.hundred,
  poses.teaser,
];

function VideoTile({
  src,
  index,
  pose,
  onOpen,
}: {
  src: string;
  index: number;
  pose: string;
  onOpen: () => void;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(btnRef, { amount: 0.15 });

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <motion.button
      ref={btnRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative block aspect-[9/13] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ash"
      data-cursor="watch"
      aria-label={`Play trainee testimonial ${index + 1}`}
    >
      <video
        ref={vidRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
      {/* Frame overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/10 to-transparent" />

      {/* Corner pose mark */}
      <span className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-cream/25 bg-noir/50 text-gold backdrop-blur-md">
        <Image src={pose} alt="" width={20} height={20} className="opacity-90" />
      </span>

      {/* Play glyph — centered */}
      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-cream/70 bg-noir/40 text-cream backdrop-blur-md transition-all group-hover:scale-110 group-hover:border-gold group-hover:text-gold">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
            <path d="M0 0v16l14-8L0 0z" />
          </svg>
        </span>
      </span>

      {/* Number */}
      <span className="pointer-events-none absolute bottom-4 left-4 flex items-baseline gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-cream/80">
        <span className="text-gold">0{index + 1}</span>
        <span>Trainee</span>
      </span>
    </motion.button>
  );
}

function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // lock scroll while lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-noir/95 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[9/16] max-h-[85vh] w-auto max-w-full overflow-hidden rounded-[var(--radius-lg)] bg-black"
          >
            <video
              key={src}
              src={src}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-cream/40 bg-noir/60 text-cream backdrop-blur-md hover:border-gold hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
