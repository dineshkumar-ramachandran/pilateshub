import { AmenityIcon } from "./AmenityIcon";
import { AMENITIES } from "@/lib/content";

/**
 * Amenity cards. `activeKeys` marks which amenities the location actually
 * offers; the others render dimmed with a "Not at this branch" tag.
 * That way visitors can see at a glance what's on offer and what isn't.
 */
export function AmenitiesGrid({
  activeKeys,
}: {
  activeKeys: readonly string[];
}) {
  const active = new Set<string>(activeKeys);
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
      {AMENITIES.map((a) => {
        const on = active.has(a.key);
        return (
          <li
            key={a.key}
            className={`relative flex items-start gap-4 rounded-[var(--radius-lg)] border p-5 transition-colors ${
              on
                ? "border-line bg-coal/60 text-cream"
                : "border-line bg-transparent text-cream/40"
            }`}
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${
                on ? "border-gold/60 bg-noir text-gold" : "border-cream/15 text-cream/30"
              }`}
              aria-hidden
            >
              <AmenityIcon name={a.key} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`font-mono text-[0.72rem] uppercase tracking-[0.2em] ${
                  on ? "text-gold" : "text-cream/30"
                }`}
              >
                {a.label}
              </p>
              <p className={`mt-1.5 text-sm leading-relaxed ${on ? "text-mist" : "text-cream/30"}`}>
                {a.copy}
              </p>
              {!on && (
                <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-cream/25">
                  Not at this branch
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
