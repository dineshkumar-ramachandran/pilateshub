"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "@/lib/useInView";

/**
 * Editorial gallery: first image is a large hero tile spanning two columns
 * on desktop; the remaining six sit as a 3×2 grid to its right. On mobile
 * everything stacks into a two-column masonry.
 */
export function LocationGallery({
  images,
  name,
}: {
  images: readonly string[];
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [hero, ...rest] = images;

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-4 md:gap-4">
      {/* Hero tile */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-ash md:row-span-2 md:aspect-auto"
      >
        <Image
          src={hero}
          alt={`${name} studio, main`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Rest as a 2× or 3× grid */}
      {rest.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.06 }}
          className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-ash"
        >
          <Image
            src={src}
            alt={`${name} studio, ${i + 2}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
          />
        </motion.div>
      ))}
    </div>
  );
}
