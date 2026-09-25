import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { equipment, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

type Params = { slug: string };

export function generateStaticParams() {
  return equipment.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = equipment.find((e) => e.slug === slug);
  if (!item) return {};
  return {
    title: item.name,
    description: `${item.name} at PilatesHub — ${item.short}`,
    alternates: { canonical: `/equipment/${item.slug}` },
  };
}

export default async function EquipmentDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = equipment.findIndex((e) => e.slug === slug);
  if (idx === -1) notFound();
  const item = equipment[idx];
  const next = equipment[(idx + 1) % equipment.length];

  return (
    <>
      <section className="bg-noir pb-20 pt-36 md:pt-44">
        <div className="container-page grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-inset ring-line">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:pl-4">
            <SectionLabel>The apparatus</SectionLabel>
            <RevealText
              as="h1"
              text={item.name}
              by="word"
              className="mt-6 font-display text-[length:var(--text-display)] leading-none text-cream"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[length:var(--text-lead)] leading-relaxed text-mist">
                {item.copy}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
              <LinkButton
                href={whatsappUrl(`Hi PilatesHub, I'd like to train on the ${item.name}.`)}
                external
              >
                Train with us
              </LinkButton>
              <LinkButton
                href={whatsappUrl(`Hi PilatesHub, I'd like to enquire about buying a ${item.name}.`)}
                external
                variant="outline"
              >
                Enquire to buy
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-noir py-14">
        <div className="container-page flex items-center justify-between">
          <Link href="/equipment" className="link-underline text-mist">
            ← All equipment
          </Link>
          <Link href={`/equipment/${next.slug}`} className="link-underline text-cream" data-cursor="view">
            {next.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
