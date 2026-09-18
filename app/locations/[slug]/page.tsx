import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { locations, sessions, site, img, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

type Params = { slug: string };

// Only pre-render active studios; coming-soon stays on the index.
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

export default async function LocationDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden pt-32 text-cream">
        <div className="absolute inset-0 -z-10">
          <Image
            src={img(loc.image, 2000, 74)}
            alt={`${loc.name} studio`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />
        </div>
        <div className="container-page pb-14">
          <SectionLabel className="text-cream/70">{loc.city}</SectionLabel>
          <RevealText
            as="h1"
            text={loc.name}
            by="word"
            className="mt-6 font-display text-[length:var(--text-hero)] leading-[0.9] text-cream"
          />
        </div>
      </section>

      {/* Details */}
      <section className="bg-noir py-20 md:py-28">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Visit</SectionLabel>
            <p className="mt-6 max-w-sm text-[length:var(--text-lead)] leading-relaxed text-cream">
              {loc.address}
            </p>
            <ul className="mt-8 space-y-3">
              <li>
                <a href={`tel:${loc.phoneRaw}`} className="link-underline text-cream">
                  {loc.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline text-cream">
                  {site.email}
                </a>
              </li>
            </ul>

            <dl className="mt-8 space-y-1 text-sm text-cream/80">
              {loc.hours.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt className="w-28 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                    {h.days}
                  </dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>

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

          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
              <iframe
                title={`${loc.name} location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&output=embed`}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sessions available here */}
      <section className="bg-coal py-20 md:py-24">
        <div className="container-page">
          <SectionLabel>Available here</SectionLabel>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((s) => (
              <Reveal key={s.slug}>
                <div className="border-t border-line pt-5">
                  <h3 className="font-display text-[length:var(--text-h3)] text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm text-mist">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
