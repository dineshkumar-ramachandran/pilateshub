import type { Metadata } from "next";
import { site, locations, whatsappUrl } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PilatesHub in HSR Layout, Bengaluru. Book a session by WhatsApp, email or the enquiry form.",
  alternates: { canonical: "/contact" },
};

const hsr = locations.find((l) => l.slug === "hsr-layout")!;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={["Come and", "move with us."]}
        intro="Tell us a little about your goals and we'll help you find the right way to begin. We reply within 24 hours."
      />

      <section className="bg-noir pb-24 md:pb-32">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <SectionLabel>Enquiry</SectionLabel>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>

          {/* Details */}
          <aside className="lg:col-span-5">
            <SectionLabel>Studio</SectionLabel>
            <div className="mt-8 space-y-8">
              <div>
                <p className="font-display text-[length:var(--text-h3)] text-cream">
                  {hsr.name}, {hsr.city}
                </p>
                <p className="mt-3 max-w-xs text-mist">{hsr.address}</p>
              </div>

              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline text-cream">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phoneRaw}`} className="link-underline text-cream">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl("Hi PilatesHub, I'd like to book a session.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-gold"
                  >
                    Message on WhatsApp →
                  </a>
                </li>
              </ul>

              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
                <iframe
                  title="PilatesHub HSR Layout location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(hsr.mapsQuery)}&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
