import type { Metadata } from "next";
import { benefits, philosophy, img } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import ImageReveal from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Method",
  description:
    "The Pilates method at PilatesHub — alignment, breath and control. Discover how deliberate, equipment-based movement builds strength that lasts.",
  alternates: { canonical: "/method" },
};

const principles = [
  { title: "Alignment", copy: "Every movement begins from a well-organised body — the foundation for safe, effective strength." },
  { title: "Breath", copy: "Breath directs effort and focus, connecting mind to movement in every repetition." },
  { title: "Control", copy: "Precision over momentum. Slow, deliberate control is where real change happens." },
  { title: "Centering", copy: "Strength radiates from a strong centre — the powerhouse of the whole practice." },
];

export default function MethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="The method"
        title={["A practice,", "not a workout."]}
        intro="At PilatesHub, movement is deliberate — built around the principles Joseph Pilates called Contrology."
      />

      <section className="bg-noir pb-24 md:pb-28">
        <div className="container-page grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ImageReveal
              src={img(philosophy.image, 1400, 74)}
              alt="Controlled reformer movement at PilatesHub"
              sizes="(max-width: 768px) 100vw, 58vw"
              className="aspect-[4/3] w-full rounded-[var(--radius-lg)]"
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <div className="space-y-5 text-lg leading-relaxed text-mist">
              {philosophy.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-coal py-24 md:py-28">
        <div className="container-page">
          <SectionLabel>Principles</SectionLabel>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="border-t border-line pt-6">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-[length:var(--text-h2)] text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-mist">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-noir py-24 md:py-28">
        <div className="container-page">
          <SectionLabel>What it builds</SectionLabel>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4 border-t border-line pt-5">
                <span className="font-mono text-xs text-gold">{b.n}</span>
                <div>
                  <h3 className="font-display text-[length:var(--text-h3)] text-cream">{b.title}</h3>
                  <p className="mt-1 text-sm text-mist">{b.copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <LinkButton href="/sessions" variant="outline">
              Explore the sessions
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
