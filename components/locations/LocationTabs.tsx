"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sub-nav shown at the top of every per-location page.
 * Three tabs: Overview / Amenities / Book.
 */
export function LocationTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const base = `/locations/${slug}`;

  const tabs = [
    { href: base, label: "Overview" },
    { href: `${base}/amenities`, label: "Amenities" },
    { href: `${base}/book`, label: "Book a visit" },
  ];

  return (
    <nav
      aria-label="Location sections"
      className="mt-8 flex flex-wrap gap-2 border-b border-line pb-2 md:mt-10"
    >
      {tabs.map((t) => {
        const active =
          t.href === base ? pathname === base : pathname?.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-t-md px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.22em] transition-colors ${
              active
                ? "bg-gold text-noir"
                : "text-mist hover:bg-cream/5 hover:text-cream"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
