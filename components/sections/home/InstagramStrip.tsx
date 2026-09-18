"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { community, site, img } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function InstagramStrip() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const images = [...community.images, ...community.images]; // duplicate for seamless loop

  useEffect(() => {
    if (reduced || !track.current) return;
    const el = track.current;
    const ctx = gsap.context(() => {
      // Drift left continuously; the duplicated set makes it seamless.
      const tween = gsap.to(el, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
      el.addEventListener("mouseenter", () => tween.timeScale(0.15));
      el.addEventListener("mouseleave", () => tween.timeScale(1));
    }, track);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="overflow-hidden bg-noir py-24 md:py-28">
      <div className="container-page mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel index="08">Community</SectionLabel>
          <h2 className="mt-6 font-display text-[length:var(--text-h1)] text-cream">
            {community.hashtag}
          </h2>
          <p className="mt-3 max-w-md text-mist">{community.blurb}</p>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-gold"
          data-cursor="view"
        >
          Follow {site.instagramHandle} →
        </a>
      </div>

      <div className="relative">
        <div
          ref={track}
          className="flex w-max gap-4 pl-4 will-change-transform"
          data-cursor="drag"
        >
          {images.map((id, i) => (
            <a
              key={`${id}-${i}`}
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/5] w-[46vw] shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-ash sm:w-[30vw] lg:w-[20vw]"
            >
              <Image
                src={img(id, 700, 70)}
                alt="PilatesHub community moment"
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw"
                className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
