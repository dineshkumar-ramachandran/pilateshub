import Link from "next/link";
import { nav, site, locations, whatsappUrl } from "@/lib/content";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  const active = locations.filter((l) => l.status === "active");

  return (
    <footer className="bg-ink text-cream/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand + statement */}
        <div className="md:col-span-5">
          <Link href="/" className="font-display text-3xl text-cream">
            Pilates<span className="text-gold">Hub</span>
          </Link>
          <p className="mt-5 max-w-xs text-cream/60">
            A studio for deliberate movement in Bengaluru. Strength, control and the
            way you live.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>

        {/* Explore */}
        <nav className="md:col-span-2" aria-label="Footer">
          <p className="eyebrow mb-5 text-cream/40">Explore</p>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-cream/80 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit */}
        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-cream/40">Visit</p>
          <ul className="space-y-4">
            {active.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="text-cream/80 hover:text-cream">
                  {l.name}
                </Link>
                <p className="mt-1 text-sm text-cream/50">{l.city}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <p className="eyebrow mb-5 text-cream/40">Get in touch</p>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-cream/80 hover:text-cream">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneRaw}`} className="link-underline text-cream/80 hover:text-cream">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl("Hi PilatesHub, I'd like to know more.")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream/80 hover:text-cream"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-underline text-cream/80 hover:text-cream">
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-underline text-cream/80 hover:text-cream">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-cream/40 sm:flex-row sm:items-center">
          <p>© {site.copyrightYear} PilatesHub · {site.tagline}</p>
          <p className="font-mono tracking-wide">HSR Layout · Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
