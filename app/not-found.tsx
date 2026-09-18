import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-noir">
      <div className="container-page">
        <p className="eyebrow text-gold">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-[length:var(--text-display)] leading-none text-cream">
          This page has drifted off-centre.
        </h1>
        <p className="mt-6 max-w-md text-lg text-mist">
          The page you&apos;re looking for isn&apos;t here — let&apos;s guide you back.
        </p>
        <div className="mt-10">
          <LinkButton href="/">Return home</LinkButton>
        </div>
      </div>
    </section>
  );
}
