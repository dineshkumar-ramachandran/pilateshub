import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { locations, img } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find PilatesHub in Bengaluru — three studios at HSR Layout, Bellandur and Koramangala, fully equipped with classical Pilates apparatus.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Locations"
        title={["Studios in", "Bengaluru."]}
        intro="Purpose-built spaces for deliberate movement, fully equipped with classical Pilates apparatus."
      />

      <section className="bg-noir pb-24 md:pb-32">
        <div className="container-page grid gap-10 md:grid-cols-2">
          {locations.map((l) => (
            <Reveal key={l.slug}>
              <Link href={`/locations/${l.slug}`}>
                <article className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-ash">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={img(l.image, 1100, 72)}
                      alt={`${l.name} studio`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
                    <h2 className="font-display text-[length:var(--text-h1)] leading-none">{l.name}</h2>
                    <p className="mt-3 max-w-sm text-cream/80">{l.address}</p>
                    <span className="link-underline mt-4 inline-block text-cream">Explore studio →</span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
