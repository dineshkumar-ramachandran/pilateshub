"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

/**
 * Image that unmasks with a clip-path wipe as it scrolls into view, while the
 * image itself settles from a slight zoom. Premium, restrained.
 *
 * Uses a manual IntersectionObserver (rather than framer-motion's whileInView)
 * because whileInView occasionally fails to fire when the section is entered
 * via `scrollIntoView({behavior:'instant'})` or on very tall images whose
 * visible fraction only barely crosses the amount threshold.
 */
export default function ImageReveal({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already partially on-screen at mount, reveal immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
      transition={{ duration: DUR.cinematic, ease: EASE.inOutSoft }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        animate={{ scale: inView ? 1 : 1.25 }}
        transition={{ duration: 1.6, ease: EASE.outSoft }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
