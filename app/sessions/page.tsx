import type { Metadata } from "next";
import Image from "next/image";
import { sessions, img, whatsappUrl } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sessions",
  description:
    "Private, couples, group and specialized Pilates sessions at PilatesHub, HSR Layout, Bengaluru — each tailored to how you want to move.",
  alternates: { canonical: "/sessions" },
};

export default function SessionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The experience"
        title={["Four ways", "to practise."]}
        intro="Whether you want one-on-one attention or the energy of a small group, there's a way in that fits you."
      />

      <section className="bg-noir pb-10">
        <div className="container-page">
          {sessions.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                className={`grid items-center gap-8 border-t border-line py-14 md:grid-cols-2 md:gap-16 md:py-20 ${
                  i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-ash">
                  <Image
                    src={img(s.image, 1000, 72)}
                    alt={`${s.title} Pilates session`}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </figure>
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    0{i + 1} · {s.tag}
                  </span>
                  <h2 className="mt-4 font-display text-[length:var(--text-display)] leading-none text-cream">
                    {s.title}
                  </h2>
                  <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-mist">
                    {s.copy}
                  </p>
                  <div className="mt-8">
                    <LinkButton
                      href={whatsappUrl(`Hi PilatesHub, I'm interested in ${s.title} sessions.`)}
                      external
                      variant="outline"
                    >
                      Enquire about {s.title}
                    </LinkButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-cream">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-2xl font-display text-[length:var(--text-h1)] leading-[1.05]">
            Not sure which is right for you?
          </p>
          <LinkButton href="/contact">
            Ask us
          </LinkButton>
        </div>
      </section>
    </>
  );
}
