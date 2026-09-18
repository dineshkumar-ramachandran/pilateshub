"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { setLenis } from "@/lib/lenis";

/**
 * Smooth scrolling (Lenis) wired into GSAP's ticker + ScrollTrigger.
 *
 * Key fix (from experience): pinned ScrollTriggers add page height, but Lenis
 * caches the scroll limit. We call lenis.resize() on every ScrollTrigger.refresh
 * so the page can scroll past the first pin.
 *
 * Disabled entirely under prefers-reduced-motion — native scrolling remains.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // On touch devices Lenis's smoothed inertia fights the browser's native
    // touch scroll (finger flicks feel dead or laggy, sticky pins can jitter
    // and long pages can appear to "stop scrolling"). Keep smooth wheel on
    // desktop only — leave native scroll for phones and tablets.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches);

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 },
    });

    // Drive Lenis from GSAP's ticker for a single synced RAF loop.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis scroll position.
    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    // The important bit: recompute Lenis limits whenever ScrollTrigger refreshes
    // (pins change document height).
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      setLenis(null);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
