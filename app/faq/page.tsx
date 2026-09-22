import PageHeader from "@/components/ui/PageHeader";

export default function FaqPage() {
  return (
    <div style={{ background: "#111", color: "white", minHeight: "100svh" }}>
      <PageHeader
        eyebrow="Questions"
        title="Everything you might ask."
        intro="Testing PageHeader alone."
      />
      <p style={{ padding: "2rem" }}>PageHeader-only diagnostic</p>
    </div>
  );
}
