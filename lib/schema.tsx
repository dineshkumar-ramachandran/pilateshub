import { site, locations, faqs } from "@/lib/content";

const hsr = locations.find((l) => l.slug === "hsr-layout")!;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: site.name,
  description:
    "Premium Pilates studio in HSR Layout, Bengaluru offering private, couples, group and specialized sessions on classical equipment.",
  url: site.domain,
  email: site.email,
  telephone: site.phone,
  image: `${site.domain}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "#2577, 13th Cross, 27th Main Rd, opp. Cafe Azzure, 1st Sector, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  geo: hsr.geo
    ? { "@type": "GeoCoordinates", latitude: hsr.geo.lat, longitude: hsr.geo.lng }
    : undefined,
  sameAs: [site.instagram, site.facebook],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
