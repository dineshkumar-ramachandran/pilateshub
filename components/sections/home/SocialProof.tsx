import { testimonials, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

export default function SocialProof() {
  const hasQuotes = testimonials.length > 0;

  return (
    <section className="bg-ash py-24 md:py-32">
      <div className="container-page">
        <SectionLabel index="07">A word from our trainees</SectionLabel>

        {hasQuotes ? (
          <div className="mt-12 space-y-16">
            {testimonials.map((t, i) => (
              <Reveal key={i}>
                <figure className="max-w-4xl">
                  <blockquote className="font-display text-[length:var(--text-h1)] leading-[1.1] text-cream">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-mist">
                    {t.author}
                    {t.detail ? ` · ${t.detail}` : ""}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          // Honest placeholder — we do not fabricate testimonials.
          <div className="mt-10 max-w-3xl">
            <RevealText
              as="p"
              text="Real stories from our community are on the way."
              by="word"
              className="font-display text-[length:var(--text-h2)] leading-tight text-cream"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-mist">
                Practised with us at HSR Layout? We&apos;d love to share your
                experience here. Tell us how Pilates changed the way you move.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <LinkButton
                href={whatsappUrl("Hi PilatesHub, I'd like to share my experience.")}
                external
                variant="outline"
              >
                Share your story
              </LinkButton>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
