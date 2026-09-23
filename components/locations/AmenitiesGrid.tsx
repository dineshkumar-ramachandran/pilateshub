import { AmenityIcon } from "./AmenityIcon";
import { AMENITIES } from "@/lib/content";

/**
 * Amenity cards. Only renders the amenities this branch actually offers —
 * we deliberately omit anything the branch doesn't have so visitors read
 * the page as a positive list of what's available, not what's missing.
 */
export function AmenitiesGrid({
  activeKeys,
}: {
  activeKeys: readonly string[];
}) {
  const active = new Set<string>(activeKeys);
  const items = AMENITIES.filter((a) => active.has(a.key));
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
      {items.map((a) => (
        <li
          key={a.key}
          className="relative flex items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-coal/60 p-5 text-cream"
        >
          <span
            aria-hidden
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 bg-noir text-gold"
          >
            <AmenityIcon name={a.key} className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold">
              {a.label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{a.copy}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
