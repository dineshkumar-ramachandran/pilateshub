"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Manual IntersectionObserver hook with belt-and-braces fallbacks.
 *
 * Why not framer-motion's `whileInView`: it fires unreliably in this project
 * (Lenis smooth scroll appears to interfere with FM's internal viewport
 * detection). This hook uses a plain IntersectionObserver plus:
 *   - an immediate position check on mount (already visible → reveal now)
 *   - a scroll-listener fallback that runs while `inView` is still false
 *   - a `visibilitychange` re-check for tabs that were backgrounded
 *
 * Together these make revealing bulletproof across smooth-scroll, hash-jumps,
 * bfcache restores, and briefly-hidden tabs.
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
      setInView(true);
      if (once) {
        latched.current = true;
        cleanup();
      }
    };

    // Immediate check
    if (isVisibleNow()) {
      reveal();
      if (latched.current) return;
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
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    }
    return cleanup;
  }, [ref, once, amount, rootMargin]);

  return inView;
}
