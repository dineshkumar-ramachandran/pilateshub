import Hero from "@/components/sections/home/Hero";
import BrandStatement from "@/components/sections/home/BrandStatement";
import Philosophy from "@/components/sections/home/Philosophy";
import Benefits from "@/components/sections/home/Benefits";
import Sessions from "@/components/sections/home/Sessions";
import Progression from "@/components/sections/home/Progression";
import LocationsTeaser from "@/components/sections/home/LocationsTeaser";
import EquipmentSection from "@/components/sections/home/EquipmentSection";
import Founders from "@/components/sections/home/Founders";
import Trainees from "@/components/sections/home/Trainees";
import FaqSection from "@/components/sections/home/FaqSection";
import ContactSection from "@/components/sections/home/ContactSection";
import FinalCta from "@/components/sections/home/FinalCta";
import { JsonLd, localBusinessSchema, faqSchema } from "@/lib/schema";

/** Anchor wrapper with scroll-margin for the fixed nav (native fallback). */
function Anchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <div id="top" />
      <Hero />
      <BrandStatement />

      <Anchor id="about">
        <Founders />
      </Anchor>

      <Anchor id="method">
        <Philosophy />
        <Benefits />
      </Anchor>

      <Anchor id="sessions">
        <Sessions />
      </Anchor>

      <Anchor id="progression">
        <Progression />
      </Anchor>

      <Anchor id="locations">
        <LocationsTeaser />
      </Anchor>

      <Anchor id="equipment">
        <EquipmentSection />
      </Anchor>

      <Anchor id="trainees">
        <Trainees />
      </Anchor>

      <Anchor id="faq">
        <FaqSection />
      </Anchor>

      <Anchor id="contact">
        <ContactSection />
      </Anchor>

      <FinalCta />
    </>
  );
}
