import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, amenitiesFor, BOOKING_POLICY, whatsappUrl } from "@/lib/content";
import { LocationHeader } from "@/components/locations/LocationHeader";
import { LocationGallery } from "@/components/locations/LocationGallery";
import { AmenitiesGrid } from "@/components/locations/AmenitiesGrid";
import { TrustBadges } from "@/components/locations/TrustBadges";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: `${loc.name} — Amenities`,
    description: `Amenities and facilities at the PilatesHub ${loc.name} studio in Bengaluru — parking, lockers, changing rooms, air-conditioning and more.`,
    alternates: { canonical: `/locations/${loc.slug}/amenities` },
  };
}

export default async function AmenitiesPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const amenities = amenitiesFor(slug);

  return (
    <>
      <LocationHeader loc={loc} />

      {/* Intro */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Amenities & facilities</SectionLabel>
          <RevealText
            as="h2"
            text={`Everything you need for practice at ${loc.name}.`}
            by="word"
            className="mt-6 max-w-3xl pb-2 font-display text-[length:var(--text-h1)] leading-[1.05] text-cream"
          />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-mist">
              We keep the studio simple and considered — the essentials done properly,
              so you can walk in, train and get on with your day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Amenities grid */}
      <section className="bg-coal py-16 md:py-20">
        <div className="container-page">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-gold">
            {amenities.length} amenities available at this branch
          </p>
          <div className="mt-8">
            <AmenitiesGrid activeKeys={loc.amenityKeys} />
          </div>
        </div>
      </section>

      {/* Hygiene + trainer trust */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Our standards</SectionLabel>
          <RevealText
            as="h2"
            text="Trained, tidy, and welcoming to first-timers."
            by="word"
            className="mt-6 max-w-3xl pb-2 font-display text-[length:var(--text-h2)] leading-tight text-cream"
          />
          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-coal py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Studio · Inside look</SectionLabel>
          <div className="mt-8">
            <LocationGallery images={loc.gallery} name={loc.name} />
          </div>
        </div>
      </section>

      {/* Booking policy footer */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <SectionLabel>{BOOKING_POLICY.headline}</SectionLabel>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-cream">
              {BOOKING_POLICY.copy}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:col-span-4 md:justify-end">
            <LinkButton href={`/locations/${loc.slug}/book`}>Book a visit</LinkButton>
            <LinkButton
              href={whatsappUrl(`Hi PilatesHub, I'd like to visit ${loc.name}.`)}
              external
              variant="outline"
            >
              WhatsApp
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
