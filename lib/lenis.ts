"use client";

import type Lenis from "lenis";

// Shared Lenis instance so nav/anchor links can drive smooth scrolling.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

/** Smooth-scroll to an element by hash id (e.g. "#sessions"). */
export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: -72, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", hash);
}
