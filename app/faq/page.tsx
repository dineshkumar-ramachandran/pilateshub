import { JsonLd, faqSchema } from "@/lib/schema";

export default function FaqPage() {
  return (
    <div style={{ padding: "8rem 2rem", color: "white", background: "#111" }}>
      <JsonLd data={faqSchema} />
      <h1>FAQ with JsonLd only</h1>
      <p>If this renders, JsonLd is not the crash. If it crashes, JsonLd is.</p>
    </div>
  );
}
