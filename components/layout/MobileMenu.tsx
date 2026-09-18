"use client";

import { AnimatePresence, motion } from "framer-motion";
import { nav, site, whatsappUrl } from "@/lib/content";
import { EASE, DUR } from "@/lib/motion";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[80] flex flex-col bg-ink text-cream"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: DUR.cinematic, ease: EASE.inOutSoft }}
        >
          <div className="container-page flex items-center justify-between py-6">
            <span className="font-display text-2xl">PilatesHub</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="font-mono text-xs uppercase tracking-[0.25em]"
            >
              Close ×
            </button>
          </div>

          <nav className="container-page flex flex-1 flex-col justify-center gap-1">
            {nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: DUR.slow, ease: EASE.outSoft }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block w-full text-left font-display text-[13vw] leading-[1.05] tracking-tight text-cream/90 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </nav>

          <div className="container-page flex flex-col gap-3 py-8 text-cream/70">
            <a href={whatsappUrl("Hi PilatesHub, I'd like to book a session.")} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
              Book on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="link-underline w-fit">
              {site.email}
            </a>
            <a href={`tel:${site.phoneRaw}`} className="link-underline w-fit">
              {site.phone}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
