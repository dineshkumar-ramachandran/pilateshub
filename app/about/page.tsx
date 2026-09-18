import type { Metadata } from "next";
import { founders, img } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of PilatesHub — founded in HSR Layout, Bengaluru by Bhagya & Manju, with over a decade of experience in high-quality Pilates training.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={["A studio built", "on care."]}
        intro="PilatesHub began with a shared passion for Pilates and a dedication to helping people move — and live — better."
      />

      <section className="bg-noir pb-24 md:pb-32">
        <div className="container-page grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <ImageReveal
              src={img(founders.image, 1200, 74)}
              alt={`${founders.fullNames}, founders of PilatesHub`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[4/5] w-full rounded-[var(--radius-lg)]"
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:pl-4">
            <SectionLabel>The founders</SectionLabel>
            <h2 className="mt-6 font-display text-[length:var(--text-h1)] text-cream">
              {founders.fullNames}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-mist">
              {founders.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
              <Reveal delay={0.1}>
                <p>
                  Over the years, the studio has grown its team of certified instructors,
                  continually updated its class offerings and invested in the latest Pilates
                  equipment — always with individual attention at the heart of the practice.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-cream md:py-28">
        <div className="container-page flex flex-col items-start gap-8">
          <SectionLabel className="text-cream/60">The mission</SectionLabel>
          <p className="max-w-4xl font-display text-[length:var(--text-h1)] leading-[1.05]">
            To improve our clients&apos; health, well-being and quality of life through the
            practice of Pilates.
          </p>
          <LinkButton href="/contact">
            Start a conversation
          </LinkButton>
        </div>
      </section>
    </>
  );
}
