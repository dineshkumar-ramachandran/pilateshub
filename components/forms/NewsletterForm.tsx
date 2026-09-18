"use client";

import { useState } from "react";

/**
 * Newsletter signup. Frontend only — POSTs to the shared /api/enquiry stub with
 * an `interest: "Newsletter"` marker. Swap for a real list provider when ready.
 */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          interest: "Newsletter",
          message: "Newsletter signup",
        }),
      });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-cream/70">Thanks — you&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm">
      <p className="eyebrow mb-3 text-cream/40">Stay connected</p>
      <div className="flex items-center border-b border-cream/25">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email"
          aria-label="Email address"
          className="w-full bg-transparent py-2.5 text-cream placeholder:text-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-gold disabled:opacity-50"
        >
          {status === "submitting" ? "…" : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-gold">Please enter a valid email.</p>
      )}
    </form>
  );
}
