import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { equipment, img } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Classical Pilates apparatus at PilatesHub — Reformer, Cadillac, Stability Chair, Ladder Barrel and Swedish Ladder. Train on, or enquire to buy.",
  alternates: { canonical: "/equipment" },
};

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="The apparatus"
        title={["Classical", "equipment."]}
        intro="Every session is taught on precision Pilates apparatus. Train on it at the studio — or enquire to buy for your own space."
      />

      <section className="bg-noir pb-24 md:pb-32">
        <div className="container-page grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e) => (
            <Reveal key={e.slug}>
              <Link href={`/equipment/${e.slug}`} className="group block" data-cursor="view">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-inset ring-line">
                  <Image
                    src={e.imageUrl}
                    alt={e.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-5 font-display text-[length:var(--text-h2)] text-cream">{e.name}</h2>
                <p className="mt-2 text-mist">{e.short}</p>
                <span className="link-underline mt-3 inline-block text-sm text-gold">
                  Learn more →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
