import { site, locations, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import EnquiryForm from "@/components/forms/EnquiryForm";

const hsr = locations.find((l) => l.slug === "hsr-layout")!;

export default function ContactSection() {
  return (
    <section className="bg-noir py-24 md:py-32">
      <div className="container-page">
        <SectionLabel index="09">Get in touch</SectionLabel>
        <RevealText
          as="h2"
          text={["Come and move", "with us."]}
          by="line"
          className="mt-8 max-w-4xl font-display text-[length:var(--text-display)] leading-[1.0] text-cream"
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-8">
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
                  className="h-64 w-full grayscale-[0.3]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
