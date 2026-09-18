export function SectionLabel({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className ?? ""}`}>
      {index && <span className="text-gold">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden />
      {children}
    </span>
  );
}
