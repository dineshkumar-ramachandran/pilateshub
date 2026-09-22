import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { LocationTabs } from "./LocationTabs";

type Loc = {
  slug: string;
  name: string;
  city: string;
  address: string;
  gallery: readonly string[];
};

/**
 * Shared header block across all three per-location pages.
 * Renders: full-bleed cover photo + city label + name + address strip + tabs.
 */
export function LocationHeader({ loc }: { loc: Loc }) {
  return (
    <>
      {/* Cover hero */}
      <section className="relative min-h-[60svh] overflow-hidden pt-24 text-cream">
        <div className="absolute inset-0 -z-10">
          <Image
            src={loc.gallery[0]}
            alt={`${loc.name} studio`}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/30" />
        </div>

        <div className="container-page relative z-10 flex min-h-[calc(60svh-6rem)] flex-col justify-end pb-10">
          <SectionLabel className="text-cream/70">{loc.city}</SectionLabel>
          <RevealText
            as="h1"
            text={loc.name}
            by="word"
            className="mt-6 pb-2 font-display text-[length:var(--text-hero)] leading-[0.9] text-cream"
          />
          <p className="mt-6 max-w-2xl text-cream/80">{loc.address}</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-noir">
        <div className="container-page">
          <LocationTabs slug={loc.slug} />
        </div>
      </div>
    </>
  );
}
