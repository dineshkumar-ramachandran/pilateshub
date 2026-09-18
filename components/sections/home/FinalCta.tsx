import { finalCta, img, whatsappUrl } from "@/lib/content";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden text-cream">
      <ParallaxImage
        src={img(finalCta.image, 2000, 74)}
        alt="Poised, controlled Pilates movement"
        className="absolute inset-0 -z-10"
        strength={22}
      />
      <div className="absolute inset-0 -z-10 bg-ink/55" />

      <div className="container-page py-28">
        <RevealText
          as="h2"
          text={finalCta.lines}
          by="line"
          className="font-display text-[length:var(--text-display)] leading-[0.98] text-cream"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-md text-lg text-cream/85">{finalCta.sub}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-5">
          <LinkButton
            href={whatsappUrl("Hi PilatesHub, I'd like to start my Pilates journey.")}
            external
          >
            Start your journey
          </LinkButton>
          <LinkButton href="#contact" variant="ghost" className="!text-cream">
            Contact the studio
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
