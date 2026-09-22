import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Page-level header (used by /about, /faq, /contact, /equipment, /sessions,
 * /method, /locations). Previously used a framer-motion RevealText at the
 * top of the page which crashed the browser tab on Chrome/Brave/mobile
 * when it was the first paintable element in the viewport at mount.
 * Now renders a plain, guaranteed-visible <h1>.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string | readonly string[];
  intro?: string;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <header className="bg-noir pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="container-page">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-display text-[length:var(--text-display)] leading-[1.0] text-cream">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] text-mist">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
