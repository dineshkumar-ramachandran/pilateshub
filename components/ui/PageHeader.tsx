import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string | readonly string[];
  intro?: string;
}) {
  return (
    <header className="bg-noir pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="container-page">
        <SectionLabel>{eyebrow}</SectionLabel>
        <RevealText
          as="h1"
          text={title}
          by={Array.isArray(title) ? "line" : "word"}
          className="mt-8 max-w-4xl font-display text-[length:var(--text-display)] leading-[1.0] text-cream"
        />
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] text-mist">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
