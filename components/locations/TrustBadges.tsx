import { TRUST_BADGES } from "@/lib/content";

/** Certified trainers · Knowledgeable · Hygiene · Beginner-friendly. */
export function TrustBadges({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-2">
        {TRUST_BADGES.map((b) => (
          <li
            key={b.label}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-cream/80"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {b.label}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TRUST_BADGES.map((b) => (
        <li key={b.label} className="rounded-[var(--radius-md)] border border-line p-5">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold">
            ✓ {b.label}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">{b.copy}</p>
        </li>
      ))}
    </ul>
  );
}
