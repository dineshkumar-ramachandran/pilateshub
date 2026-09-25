"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { benefits, img } from "@/lib/content";
import { DUR, EASE } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function Benefits() {
  const [active, setActive] = useState(0);
  const current = benefits[active];

  return (
    <section className="bg-noir py-24 md:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="03">Why Pilates</SectionLabel>
            <h2 className="mt-6 max-w-xl font-display text-[length:var(--text-h1)] text-cream">
              Seven ways it changes how you move.
            </h2>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          {/* Interactive list */}
          <ul className="md:col-span-7">
            {benefits.map((b, i) => {
              const isActive = i === active;
              return (
                <li key={b.title} className="border-t border-line last:border-b">
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    data-cursor="view"
                    className="group flex w-full items-baseline gap-5 py-5 text-left md:py-7"
                  >
                    <span className="font-mono text-xs text-gold">{b.n}</span>
                    <span
                      className={`font-display text-[length:var(--text-h2)] leading-none transition-colors duration-[var(--dur-fast)] ${
                        isActive ? "text-cream" : "text-cream/35 group-hover:text-cream/70"
                      }`}
                    >
                      {b.title}
                    </span>
                    <motion.span
                      className="ml-auto max-w-xs self-center text-sm text-mist"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: DUR.fast }}
                    >
                      <span className="hidden lg:block">{b.copy}</span>
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Accompanying visual (desktop) */}
          <div className="relative hidden md:col-span-5 md:block">
            <div className="sticky top-28 aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-ash">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR.standard, ease: EASE.outSoft }}
                >
                  <Image quality={90}
                    src={img(current.image, 900, 72)}
                    alt={current.title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-6">
                <p className="font-display text-2xl text-cream">{current.title}</p>
                <p className="mt-1 text-sm text-cream/80">{current.copy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: horizontally swipeable cards */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {benefits.map((b) => (
            <article
              key={b.title}
              className="relative aspect-[3/4] w-[74%] shrink-0 snap-center overflow-hidden rounded-[var(--radius-lg)] bg-ash"
            >
              <Image quality={90} src={img(b.image, 700, 70)} alt={b.title} fill sizes="74vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
                <span className="font-mono text-xs text-cream/70">{b.n}</span>
                <p className="font-display text-2xl text-cream">{b.title}</p>
                <p className="mt-1 text-sm text-cream/80">{b.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
