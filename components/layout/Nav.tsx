"use client";

import { useEffect, useState } from "react";
import { nav, whatsappUrl } from "@/lib/content";
import { LinkButton } from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top scrim keeps white menu text legible over the hero image */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-[65] h-28 bg-gradient-to-b from-noir/80 to-transparent transition-opacity duration-[var(--dur-standard)] ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,backdrop-filter,padding,border-color] duration-[var(--dur-standard)] ease-[var(--ease-out-soft)] ${
          scrolled
            ? "border-b border-line-soft bg-noir/85 py-3 backdrop-blur-md"
            : "border-b border-transparent py-5"
        }`}
      >
        <div className="container-page flex items-center justify-between">
          <a
            href="#top"
            className="font-display text-xl tracking-tight text-cream sm:text-2xl"
            aria-label="PilatesHub home"
          >
            Pilates<span className="text-gold">Hub</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium tracking-wide text-cream transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LinkButton
                href={whatsappUrl("Hi PilatesHub, I'd like to book a session.")}
                external
                variant="solid"
                className="!px-6 !py-3"
              >
                Book a session
              </LinkButton>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex flex-col items-end gap-[5px] py-2 lg:hidden"
            >
              <span className="block h-px w-7 bg-cream" />
              <span className="block h-px w-5 bg-cream" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
