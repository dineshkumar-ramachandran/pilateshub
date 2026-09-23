"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { locations } from "@/lib/content";
import { DUR, EASE } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function LocationsTeaser() {
  const [active, setActive] = useState(0);
  const current = locations[active];

  return (
    <section className="bg-coal py-24 md:py-32">
      <div className="container-page">
        <SectionLabel index="05">Locations</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-[length:var(--text-h1)] text-cream">
          Three studios across Bengaluru.
        </h2>
        <p className="mt-5 max-w-xl text-mist">
          Purpose-built spaces for deliberate movement — fully equipped with classical
          Pilates apparatus at every branch.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Selector */}
          <div>
            {locations.map((l, i) => {
              const isActive = i === active;
              return (
                <div
                  key={l.slug}
                  onMouseEnter={() => setActive(i)}
                  className="group block w-full border-t border-line py-8 text-left last:border-b"
                >
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`font-display text-[length:var(--text-h2)] leading-none transition-colors ${
                      isActive ? "text-cream" : "text-cream/40 group-hover:text-cream/70"
                    }`}
                  >
                    {l.name}
                  </button>
                  <p className="mt-3 max-w-sm text-sm text-mist">{l.address}</p>

                  <dl className="mt-4 grid gap-1 text-xs text-mist">
                    <div className="flex gap-2">
                      <dt className="font-mono uppercase tracking-[0.18em] text-cream/60">Call</dt>
                      <dd>
                        <a href={`tel:${l.phoneRaw}`} className="link-underline text-cream/90">
                          {l.phone}
                        </a>
                      </dd>
                    </div>
                    {l.hours.map((h) => (
                      <div key={h.days} className="flex gap-2">
                        <dt className="font-mono uppercase tracking-[0.18em] text-cream/60">
                          {h.days}
                        </dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Two CTAs — Book a visit (Book page) + Take a look (Overview page) */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <Link
                      href={`/locations/${l.slug}/book`}
                      className="link-underline text-gold"
                    >
                      Book a visit →
                    </Link>
                    <Link
                      href={`/locations/${l.slug}`}
                      className="link-underline text-cream/85"
                    >
                      Take a look →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual — real studio photo from the shared gallery */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-ash md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.standard, ease: EASE.outSoft }}
              >
                <Image
                  src={current.homeImage}
                  alt={`${current.name} studio`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                {/* Soft gradient so the label reads on any photo */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/10 to-transparent" />
                <Link
                  href={`/locations/${current.slug}`}
                  className="absolute bottom-5 left-5 rounded-[var(--radius-pill)] bg-noir/85 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold backdrop-blur-md hover:bg-gold hover:text-noir"
                >
                  Take a look at {current.name} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
