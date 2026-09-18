"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

type Item = { q: string; a: string };

export default function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-t border-line last:border-b">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[length:var(--text-h3)] text-cream">
                  {item.q}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-cream transition-transform duration-[var(--dur-standard)] ease-[var(--ease-out-soft)] ${
                    isOpen ? "rotate-45 bg-ink text-cream" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: DUR.standard, ease: EASE.inOutSoft }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-lg leading-relaxed text-mist">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
