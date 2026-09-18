"use client";

import { useState } from "react";
import { Field, TextArea, Select } from "@/components/ui/Field";
import { ActionButton } from "@/components/ui/Button";
import { sessions, locations, whatsappUrl } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,60}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,20}$/;

function validate(fd: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (!NAME_RE.test(name)) errors.name = "Please use letters only (no numbers or symbols).";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email address.";

  if (phone && !PHONE_RE.test(phone))
    errors.phone = "Phone should be digits only, optionally starting with +.";

  if (!message) errors.message = "Please tell us a little about your goals.";

  return errors;
}

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const activeLocations = locations.filter((l) => l.status === "active");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Client-side validation first — friendlier than a round-trip.
    const clientErrors = validate(fd);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-coal/60 p-8">
        <p className="font-display text-3xl">Thank you.</p>
        <p className="text-mist">
          Your enquiry is in. We&apos;ll be in touch shortly — for anything urgent,
          message us on WhatsApp.
        </p>
        <a
          href={whatsappUrl("Hi PilatesHub, I just sent an enquiry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-gold"
        >
          Open WhatsApp →
        </a>
      </div>
    );
  }

  const clearError = (name: string) =>
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Your name"
          required
          autoComplete="name"
          pattern="[A-Za-z][A-Za-z .'\-]{1,60}"
          title="Letters, spaces, hyphens and apostrophes only"
          onChange={() => clearError("name")}
          error={errors.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
          autoComplete="email"
          inputMode="email"
          onChange={() => clearError("email")}
          error={errors.email}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 90000 00000"
          autoComplete="tel"
          inputMode="tel"
          pattern="[+\d][\d\s\-()]{6,20}"
          title="Digits only — optional + at the start"
          onChange={() => clearError("phone")}
          error={errors.phone}
        />
        <Select label="Interested in" name="interest" defaultValue="">
          <option value="" disabled>
            Select a session
          </option>
          {sessions.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title} — {s.tag}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </Select>
      </div>
      <Select label="Preferred location" name="location" defaultValue={activeLocations[0]?.name}>
        {activeLocations.map((l) => (
          <option key={l.slug} value={l.name}>
            {l.name}, {l.city}
          </option>
        ))}
      </Select>
      <TextArea
        label="Your goals"
        name="message"
        placeholder="Tell us what you'd like to work on…"
        required
        onChange={() => clearError("message")}
        error={errors.message}
      />

      {status === "error" && !Object.keys(errors).length && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Please try again, or message us on WhatsApp.
        </p>
      )}

      <div className="flex items-center gap-5">
        <ActionButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </ActionButton>
        <p className="text-xs text-haze">We reply within 24 hours.</p>
      </div>
    </form>
  );
}
