import PageHeader from "@/components/ui/PageHeader";

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="Everything you might ask."
        intro="Diagnostic: does the new PageHeader alone crash?"
      />
      <div style={{ padding: "2rem", color: "white" }}>
        <p>PageHeader-only diagnostic v2.</p>
      </div>
    </>
  );
}
