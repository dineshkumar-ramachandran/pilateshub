import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import Accordion from "@/components/ui/Accordion";
import { JsonLd, faqSchema } from "@/lib/schema";
import { LinkButton } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Pilates at PilatesHub, Bengaluru — sessions, equipment, what to wear, pricing and how to book.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHeader
        eyebrow="Questions"
        title="Everything you might ask."
        intro="New to Pilates or returning after a while? Here's what most people want to know before their first session."
      />
      <section className="bg-noir pb-28">
        <div className="container-page">
          <Accordion items={faqs} />
          <div className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-10">
            <p className="font-display text-[length:var(--text-h2)] text-cream">Still curious?</p>
            <p className="max-w-md text-mist">
              Message us and we&apos;ll help you find the right starting point.
            </p>
            <LinkButton
              href={whatsappUrl("Hi PilatesHub, I have a question.")}
              external
              variant="outline"
            >
              Ask on WhatsApp
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
