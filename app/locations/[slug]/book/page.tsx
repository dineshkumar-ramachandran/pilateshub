import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  locations,
  sessions,
  amenitiesFor,
  BOOKING_POLICY,
  whatsappUrl,
} from "@/lib/content";
import { LocationHeader } from "@/components/locations/LocationHeader";
import { LocationGallery } from "@/components/locations/LocationGallery";
import { AmenityIcon } from "@/components/locations/AmenityIcon";
import { TrustBadges } from "@/components/locations/TrustBadges";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import EnquiryForm from "@/components/forms/EnquiryForm";

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
    title: `${loc.name} — Book a visit`,
    description: `Book a Pilates session at PilatesHub ${loc.name}, Bengaluru. Sessions run by appointment only — reach out to schedule your visit.`,
    alternates: { canonical: `/locations/${loc.slug}/book` },
  };
}

export default async function BookPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const amenities = amenitiesFor(slug);
  const waMessage = whatsappUrl(
    `Hi PilatesHub, I'd like to book a session at ${loc.name}.`,
  );
  const mailtoLink = `mailto:${loc.email}?subject=${encodeURIComponent(
    `Booking enquiry — ${loc.name}`,
  )}&body=${encodeURIComponent(
    `Hi PilatesHub,\n\nI'd like to book a session at your ${loc.name} studio.\n\nMy details:\nName:\nPhone:\nPreferred day/time:\nProgram of interest:\n\nThank you.`,
  )}`;

  return (
    <>
      <LocationHeader loc={loc} />

      {/* Appointment intro */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel className="text-gold">{BOOKING_POLICY.headline}</SectionLabel>
          <RevealText
            as="h2"
            text={`Book a visit to ${loc.name}.`}
            by="word"
            className="mt-6 max-w-3xl pb-2 font-display text-[length:var(--text-h1)] leading-[1.05] text-cream"
          />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-mist">
              {BOOKING_POLICY.copy}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact row + hours */}
      <section className="bg-coal py-14">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
              <Icon name="phone" className="h-3.5 w-3.5 text-gold" /> WhatsApp
            </p>
            <a
              href={waMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-display text-2xl text-cream hover:text-gold"
            >
              {loc.phone}
            </a>
            <p className="mt-2 text-xs text-mist">Fastest way to confirm a slot.</p>
          </div>

          <div className="md:col-span-4">
            <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
              <Icon name="phone" className="h-3.5 w-3.5 text-gold" /> Call
            </p>
            <a
              href={`tel:${loc.phoneRaw}`}
              className="mt-2 block font-display text-2xl text-cream hover:text-gold"
            >
              {loc.phone}
            </a>
            <p className="mt-2 text-xs text-mist">Between studio hours below.</p>
          </div>

          <div className="md:col-span-4">
            <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
              <Icon name="mail" className="h-3.5 w-3.5 text-gold" /> Email
            </p>
            <a
              href={mailtoLink}
              className="mt-2 block font-display text-2xl text-cream hover:text-gold"
            >
              {loc.email}
            </a>
            <p className="mt-2 text-xs text-mist">We reply within 24 hours.</p>
          </div>

          <div className="md:col-span-6">
            <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
              <Icon name="instagram" className="h-3.5 w-3.5 text-gold" /> Instagram
            </p>
            <a
              href={loc.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-display text-2xl text-cream hover:text-gold"
            >
              {loc.instagramHandle}
            </a>
            <p className="mt-2 text-xs text-mist">Follow the studio for updates and stories.</p>
          </div>

          <div className="md:col-span-12">
            <div className="mt-4 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                  <Icon name="calendar" className="h-3.5 w-3.5 text-gold" /> Studio hours
                </p>
                <dl className="mt-3 space-y-2 text-sm text-cream">
                  {loc.hours.map((h) => (
                    <div key={h.days} className="flex items-center gap-3">
                      <Icon name="clock" className="h-4 w-4 shrink-0 text-gold/80" />
                      <dt className="w-28 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                        {h.days}
                      </dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                  <Icon name="pin" className="h-3.5 w-3.5 text-gold" /> Address
                </p>
                <p className="mt-3 max-w-md text-sm text-cream">{loc.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form (client, pre-labelled with this location) */}
      <section className="bg-noir py-16 md:py-24">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Tell us about your goals</SectionLabel>
            <h3 className="mt-6 max-w-md font-display text-[length:var(--text-h2)] leading-tight text-cream">
              Send an enquiry — we'll come back with a slot.
            </h3>
            <p className="mt-6 max-w-md text-mist">
              A quick note about what you're looking for helps us match you to the
              right program and instructor at {loc.name}.
            </p>

            <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-gold">
              Programs available at this branch
            </p>
            <ul className="mt-3 space-y-1 text-sm text-cream/80">
              {sessions.map((s) => (
                <li key={s.slug} className="flex gap-2">
                  <span className="mt-[0.55em] h-px w-3 shrink-0 bg-gold/60" aria-hidden />
                  <span>
                    {s.title} — <span className="text-cream/50">{s.tag}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <EnquiryForm defaultLocation={loc.name} defaultInterest="" />
          </div>
        </div>
      </section>

      {/* Amenities strip (compact preview) */}
      <section className="bg-coal py-12">
        <div className="container-page">
          <SectionLabel>What's on-site</SectionLabel>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {amenities.map((a) => (
              <li
                key={a.key}
                className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-line bg-noir/40 px-3 py-4 text-center"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold">
                  <AmenityIcon name={a.key} className="h-5 w-5" />
                </span>
                <span className="text-xs text-cream">{a.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust markers */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <SectionLabel>Why train with us</SectionLabel>
          <div className="mt-8">
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

      {/* Final line */}
      <section className="bg-noir py-16 md:py-20">
        <div className="container-page">
          <p className="max-w-2xl font-display text-[length:var(--text-h2)] leading-tight text-cream">
            Ready to visit? WhatsApp is quickest —
            <a href={waMessage} target="_blank" rel="noopener noreferrer" className="ml-2 italic text-gold underline">
              message us
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={waMessage} external variant="solid">
              WhatsApp {loc.name}
            </LinkButton>
            <LinkButton href={`/locations/${loc.slug}/amenities`} variant="outline">
              See amenities
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
