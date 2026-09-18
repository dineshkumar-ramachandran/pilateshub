import { faqs, whatsappUrl } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/RevealText";
import Accordion from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/Button";

export default function FaqSection() {
  return (
    <section className="bg-coal py-24 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <SectionLabel index="08">Questions</SectionLabel>
            <RevealText
              as="h2"
              text={["Everything", "you might", "ask."]}
              by="line"
              className="mt-8 font-display text-[length:var(--text-h1)] text-cream"
            />
            <p className="mt-6 max-w-xs text-mist">
              New to Pilates or returning after a while? Here&apos;s what most people want
              to know first.
            </p>
            <div className="mt-8">
              <LinkButton
                href={whatsappUrl("Hi PilatesHub, I have a question.")}
                external
                variant="outline"
              >
                Ask on WhatsApp
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="md:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
