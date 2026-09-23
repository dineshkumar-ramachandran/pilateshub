"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { sessions } from "@/lib/content";
import { DUR, EASE } from "@/lib/motion";

/** All four sessions now ship with a real studio photo; keep a helper so
 *  future sessions can be added with just an `imageUrl`. */
type Session = (typeof sessions)[number];
const imgFor = (s: Session) => s.imageUrl;
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function Sessions() {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? 0;

  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="04" className="text-cream/60">
              The experience
            </SectionLabel>
            <h2 className="mt-6 max-w-xl font-display text-[length:var(--text-h1)] text-cream">
              Four ways to practise.
            </h2>
          </div>
          <a href="#contact" className="link-underline text-cream/70">
            Enquire now →
          </a>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Floating image preview (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-ink-soft/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sessions[shown].slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR.standard, ease: EASE.outSoft }}
                >
                  <Image
                    src={imgFor(sessions[shown])}
                    alt={sessions[shown].title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* List */}
          <ul className="lg:col-span-7">
            {sessions.map((s, i) => (
              <li key={s.slug} className="border-t border-cream/15 last:border-b">
                <a
                  href="#contact"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  data-cursor="view"
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 py-7 md:py-9"
                >
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <span
                    className={`font-display text-[length:var(--text-h2)] leading-none transition-colors duration-[var(--dur-fast)] ${
                      hover === i ? "text-gold" : "text-cream group-hover:text-gold"
                    }`}
                  >
                    {s.title}
                  </span>

                  {/* Inline image on mobile */}
                  <div className="col-span-2 overflow-hidden rounded-[var(--radius-md)] bg-noir lg:hidden">
                    <div className="relative aspect-[4/5]">
                      <Image src={imgFor(s)} alt={s.title} fill sizes="100vw" className="object-contain" />
                    </div>
                  </div>

                  <div className="col-start-2 max-w-md text-cream/70">
                    <span className="mb-1 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/40">
                      {s.tag}
                    </span>
                    <p>{s.copy}</p>
                    {s.plans && (
                      <ul className="mt-3 space-y-1 text-[0.78rem] text-cream/55">
                        {s.plans.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="mt-[0.55em] h-px w-3 shrink-0 bg-gold/60" aria-hidden />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
