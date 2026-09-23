import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  locations,
  sessions,
  BOOKING_POLICY,
  amenitiesFor,
  whatsappUrl,
} from "@/lib/content";
import { LocationHeader } from "@/components/locations/LocationHeader";
import { LocationGallery } from "@/components/locations/LocationGallery";
import { TrustBadges } from "@/components/locations/TrustBadges";
import { AmenityIcon } from "@/components/locations/AmenityIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

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
    title: `${loc.name} Studio`,
    description: `PilatesHub ${loc.name}, ${loc.city}. ${loc.address}`,
    alternates: { canonical: `/locations/${loc.slug}` },
  };
}

export default async function LocationOverview({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const amenities = amenitiesFor(slug);

  return (
    <>
      <LocationHeader loc={loc} />

      {/* Gallery */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Studio · Inside look</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-[length:var(--text-h2)] leading-tight text-cream">
            Inside the {loc.name} studio.
          </h2>
          <div className="mt-10">
            <LocationGallery images={loc.gallery} name={loc.name} />
          </div>
        </div>
      </section>

      {/* Snapshot: address, hours, apparatus, amenity preview */}
      <section className="bg-coal py-16 md:py-24">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Visit</SectionLabel>
            <p className="mt-6 flex max-w-sm items-start gap-3 text-[length:var(--text-lead)] leading-relaxed text-cream">
              <Icon name="pin" className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <span>{loc.address}</span>
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 text-gold" />
                <a href={`tel:${loc.phoneRaw}`} className="link-underline text-cream">
                  {loc.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 text-gold" />
                <a href={`mailto:${loc.email}`} className="link-underline text-cream">
                  {loc.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="instagram" className="h-4 w-4 text-gold" />
                <a
                  href={loc.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-cream"
                >
                  {loc.instagramHandle}
                </a>
              </li>
            </ul>

            <dl className="mt-8 space-y-2 text-sm text-cream/80">
              {loc.hours.map((h) => (
                <div key={h.days} className="flex items-center gap-3">
                  <Icon name="calendar" className="h-4 w-4 shrink-0 text-gold" />
                  <dt className="w-28 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                    {h.days}
                  </dt>
                  <Icon name="clock" className="h-4 w-4 shrink-0 text-gold/80" />
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
              {BOOKING_POLICY.headline}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-cream/70">
              {loc.apparatus.map((a) => (
                <li
                  key={a}
                  className="rounded-[var(--radius-pill)] border border-line px-3 py-1"
                >
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton
                href={whatsappUrl(`Hi PilatesHub, I'd like to book at ${loc.name}.`)}
                external
              >
                Book a session
              </LinkButton>
              <LinkButton
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`}
                external
                variant="outline"
              >
                Get directions
              </LinkButton>
            </div>
          </div>

          {/* Amenity preview + map */}
          <div className="md:col-span-7">
            <SectionLabel>Amenities at this branch</SectionLabel>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {amenities.map((a) => (
                <li
                  key={a.key}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-noir/60 px-3 py-2.5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 text-gold">
                    <AmenityIcon name={a.key} className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-cream">{a.label}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/locations/${loc.slug}/amenities`}
              className="link-underline mt-6 inline-block text-sm text-gold"
            >
              All amenities & facilities →
            </Link>

            <div className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-line">
              <iframe
                title={`${loc.name} location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&output=embed`}
                className="h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust markers */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Why train here</SectionLabel>
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* Programs at this branch */}
      <section className="bg-coal py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Programs available</SectionLabel>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((s) => (
              <Reveal key={s.slug}>
                <div className="border-t border-line pt-5">
                  <h3 className="font-display text-[length:var(--text-h3)] text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-mist">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <LinkButton href={`/locations/${loc.slug}/book`}>Book a visit</LinkButton>
            <LinkButton href={`/locations/${loc.slug}/amenities`} variant="outline">
              See amenities
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
