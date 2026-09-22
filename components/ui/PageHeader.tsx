import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Page-level header. Uses NO client-side motion components because
 * useInView + motion.div at the top of the viewport at mount was
 * causing renderer crashes in Chrome/Brave (both desktop and mobile).
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
          <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] text-mist">{intro}</p>
        )}
      </div>
    </header>
  );
}
