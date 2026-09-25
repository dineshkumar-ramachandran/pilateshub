import Image from "next/image";
import { equipment, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

export default function EquipmentSection() {
  return (
    <section className="bg-coal py-24 md:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="06">The apparatus</SectionLabel>
            <h2 className="mt-6 max-w-xl font-display text-[length:var(--text-h1)] text-cream">
              Classical equipment,{" "}
              <span className="italic text-gold">precisely</span> maintained.
            </h2>
          </div>
          <p className="max-w-xs text-mist">
            Every session is taught on precision Pilates apparatus — train on it here, or
            enquire to buy for your own space.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 0.06}>
              <article className="group">
                <a
                  href={`https://pilates-hub.com/${e.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-inset ring-line">
                    <Image
                      src={e.imageUrl}
                      alt={e.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-[var(--radius-pill)] bg-noir/85 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gold backdrop-blur">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[length:var(--text-h2)] text-cream transition-colors group-hover:text-gold">
                    {e.name}
                  </h3>
                </a>
                <p className="mt-2 text-gold">{e.short}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{e.copy}</p>
              </article>
            </Reveal>
          ))}

          {/* Enquiry card fills the 6th slot */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-center rounded-[var(--radius-lg)] border border-line p-8">
              <p className="font-display text-[length:var(--text-h3)] text-cream">
                Want a studio-grade setup at home?
              </p>
              <p className="mt-3 text-sm text-mist">
                We supply and guide you on the right apparatus for your space and goals.
              </p>
              <div className="mt-6">
                <LinkButton
                  href={whatsappUrl("Hi PilatesHub, I'd like to enquire about buying equipment.")}
                  external
                  variant="outline"
                >
                  Enquire to buy
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
