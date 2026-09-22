"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Manual IntersectionObserver hook with belt-and-braces fallbacks.
 *
 * Critical fix: the immediate-visibility check that used to fire `setInView(true)`
 * synchronously inside the mount `useEffect` was crashing the browser tab on
 * Chrome + Brave (both desktop and mobile) when it wrapped a framer-motion
 * `motion.div` that was above the fold at hydration. The crash happened because
 * the state update ran in the same tick as framer-motion's initial mount, and
 * the resulting re-render triggered an animation before the initial DOM was
 * fully committed — producing a renderer crash ("This page couldn't load")
 * on the affected pages. Deferring the reveal by one animation frame fixes it.
 *
 * Why not framer-motion's `whileInView`: it fires unreliably in this project
 * (Lenis smooth scroll interferes with FM's internal viewport detection).
 * This hook uses a plain IntersectionObserver plus:
 *   - a **deferred** immediate position check (already visible → reveal on
 *     the next animation frame, not synchronously during mount)
 *   - a scroll-listener fallback that runs while `inView` is still false
 *   - a `visibilitychange` re-check for tabs that were backgrounded
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    once = true,
    amount = 0.1,
    rootMargin = "0px 0px -5% 0px",
  }: { once?: boolean; amount?: number; rootMargin?: string } = {},
): boolean {
  const [inView, setInView] = useState(false);
  const latched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const isVisibleNow = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visibleH = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (visibleH <= 0) return false;
      const target = Math.max(1, r.height * amount);
      return visibleH >= target || r.top < vh * 0.95;
    };

    const reveal = () => {
      if (latched.current) return;
      // Defer state update until the next frame so framer-motion (or anything
      // else listening for our state) has finished its initial mount cycle.
      rafId = requestAnimationFrame(() => {
        if (latched.current) return;
        setInView(true);
        if (once) {
          latched.current = true;
          cleanup();
        }
      });
    };

    // Immediate position check (deferred one frame via reveal())
    if (isVisibleNow()) {
      reveal();
    }

    // Primary: IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            break;
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: amount, rootMargin },
    );
    io.observe(el);

    // Fallback: scroll listener (in case IO is throttled — hidden tabs etc.)
    const onScroll = () => {
      if (isVisibleNow()) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Fallback: re-check when tab becomes visible
    const onVis = () => {
      if (document.visibilityState === "visible" && isVisibleNow()) reveal();
    };
    document.addEventListener("visibilitychange", onVis);

    function cleanup() {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    }
    return cleanup;
  }, [ref, once, amount, rootMargin]);

  return inView;
}
