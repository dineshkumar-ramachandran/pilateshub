import Link from "next/link";
import MagneticButton from "@/components/motion/MagneticButton";

type Variant = "solid" | "outline" | "ghost";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm tracking-wide transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] font-medium";

const variants: Record<Variant, string> = {
  solid: "bg-gradient-to-b from-[#f3d67f] to-[#dcae3a] text-cream shadow-[0_10px_24px_-12px_rgba(169,131,42,0.7)] hover:from-[#f6dd92] hover:to-[#e4b94a]",
  outline: "border border-gold/40 text-cream hover:border-gold hover:bg-gold hover:text-noir",
  ghost: "text-cream hover:text-gold",
};

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-[var(--dur-standard)] ease-[var(--ease-out-soft)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

export function LinkButton({
  children,
  href,
  external,
  variant = "solid",
  className,
  magnetic = true,
}: LinkButtonProps) {
  const cls = `${base} ${variants[variant]} ${className ?? ""}`;
  const content = <Inner>{children}</Inner>;
  const isHash = href.startsWith("#");

  const el =
    external || isHash ? (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
      >
        {content}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );

  return magnetic ? <MagneticButton>{el}</MagneticButton> : el;
}

type ActionButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  children,
  variant = "solid",
  className,
  magnetic = false,
  ...rest
}: ActionButtonProps) {
  const cls = `${base} ${variants[variant]} disabled:opacity-50 disabled:pointer-events-none ${className ?? ""}`;
  const el = (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
  return magnetic ? <MagneticButton>{el}</MagneticButton> : el;
}
