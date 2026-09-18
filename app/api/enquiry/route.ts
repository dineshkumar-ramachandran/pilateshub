import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — delivers by (in order):
 *   1. Resend API, if RESEND_API_KEY is set (best deliverability, sender-signed)
 *   2. FormSubmit.co (needs one-time activation click on first send)
 *   3. Always: `console.info` a structured log so nothing is ever lost — the
 *      full enquiry is retrievable via `vercel logs` even if 1 and 2 fail.
 *
 * Env vars:
 *   ENQUIRY_TO       — destination email (default: onprimehub@gmail.com)
 *   RESEND_API_KEY   — optional; when set, primary delivery uses Resend
 *   RESEND_FROM      — optional Resend sender (default: onboarding@resend.dev)
 *
 * The previous version failed silently because FormSubmit rejects POSTs
 * without an `Origin` / `Referer` header — Vercel serverless functions
 * don't set one automatically. We set them explicitly here.
 */

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  location?: string;
  message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isName = (v: string) => /^[A-Za-z][A-Za-z .'-]{1,60}$/.test(v);
const isPhone = (v: string) => /^[+\d][\d\s\-()]{6,20}$/.test(v);

const ENQUIRY_TO = process.env.ENQUIRY_TO || "onprimehub@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "PilatesHub <onboarding@resend.dev>";
const SITE_ORIGIN_ENV = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.pilateshub.in";
function siteOriginFrom(req: Request): string {
  // Prefer the caller's origin so FormSubmit sees a real referer. Falls
  // back to the env var when a request lacks the header (curl, some SSR).
  const h = req.headers.get("origin") || req.headers.get("referer");
  if (h) {
    try {
      return new URL(h).origin;
    } catch {
      /* fall through */
    }
  }
  return SITE_ORIGIN_ENV;
}

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  location: string;
  message: string;
  isNewsletter: boolean;
};

function composeSubject(e: Enquiry): string {
  if (e.isNewsletter) return "PilatesHub — new newsletter signup";
  return `PilatesHub enquiry from ${e.name}`;
}

function composeText(e: Enquiry): string {
  return [
    e.isNewsletter ? "Newsletter signup" : "New enquiry from the PilatesHub site.",
    "",
    `Name:      ${e.name || "(newsletter)"}`,
    `Email:     ${e.email}`,
    e.phone ? `Phone:     ${e.phone}` : null,
    e.interest ? `Interest:  ${e.interest}` : null,
    e.location ? `Location:  ${e.location}` : null,
    "",
    e.message ? `Message:\n${e.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function composeHtml(e: Enquiry): string {
  const rows: [string, string][] = [
    ["Name", e.name || "(newsletter)"],
    ["Email", e.email],
    ["Phone", e.phone || "—"],
    ["Interest", e.interest || "—"],
    ["Location", e.location || "—"],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#8a7f66;font-family:monospace;text-transform:uppercase;letter-spacing:.15em;font-size:12px;">${k}</td><td style="padding:6px 12px;font-family:sans-serif;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const messageBlock = e.message
    ? `<div style="margin-top:16px;padding:16px;background:#faf7f0;border-left:3px solid #e8c65c;font-family:sans-serif;white-space:pre-wrap;">${escapeHtml(e.message)}</div>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4ecda;font-family:sans-serif;color:#0b0a07;">
    <div style="max-width:560px;margin:0 auto;">
      <h1 style="font-size:20px;margin:0 0 8px;">${e.isNewsletter ? "New newsletter signup" : "New PilatesHub enquiry"}</h1>
      <p style="margin:0 0 20px;color:#7a7161;">Site: ${SITE_ORIGIN_ENV}</p>
      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e5dfd0;">${tableRows}</table>
      ${messageBlock}
    </div>
  </body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

async function deliverViaResend(e: Enquiry): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [ENQUIRY_TO],
        reply_to: e.email,
        subject: composeSubject(e),
        text: composeText(e),
        html: composeHtml(e),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `Resend threw: ${String(err)}` };
  }
}

async function deliverViaFormSubmit(e: Enquiry, origin: string): Promise<{ ok: boolean; error?: string; needsActivation?: boolean }> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_TO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit rejects requests without Origin/Referer — Vercel
        // functions don't send one by default, so we forge them from the
        // caller's origin so FormSubmit accepts the request.
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        _subject: composeSubject(e),
        _template: "table",
        _captcha: "false",
        _replyto: e.email,
        name: e.name || "(newsletter)",
        email: e.email,
        phone: e.phone || "-",
        interest: e.interest || "-",
        location: e.location || "-",
        message: e.message || "-",
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    const ok = res.ok && (json.success === true || json.success === "true");
    if (ok) return { ok: true };
    const msg = String(json.message || "");
    const needsActivation = /activation/i.test(msg);
    return { ok: false, error: `FormSubmit ${res.status}: ${msg}`, needsActivation };
  } catch (err) {
    return { ok: false, error: `FormSubmit threw: ${String(err)}` };
  }
}

export async function POST(req: Request) {
  let data: EnquiryPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const message = data.message?.trim() ?? "";
  const isNewsletter = data.interest === "Newsletter";

  if (isNewsletter) {
    if (!email || !isEmail(email)) errors.email = "Please enter a valid email.";
  } else {
    if (!name) errors.name = "Please enter your name.";
    else if (!isName(name)) errors.name = "Please use letters only (no numbers).";

    if (!email) errors.email = "Please enter your email.";
    else if (!isEmail(email)) errors.email = "That doesn't look like a valid email.";

    if (phone && !isPhone(phone)) errors.phone = "Phone should be digits only.";

    if (!message) errors.message = "Please tell us a little about your goals.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry: Enquiry = {
    name,
    email,
    phone,
    interest: data.interest || "",
    location: data.location || "",
    message,
    isNewsletter,
  };

  // Always log a structured record so `vercel logs` retrieves everything
  // even if downstream delivery fails.
  console.info("[enquiry] received:", JSON.stringify(enquiry));

  // 1) Resend if configured
  let delivered = false;
  const attempts: string[] = [];
  if (RESEND_API_KEY) {
    const r = await deliverViaResend(enquiry);
    attempts.push(`resend: ${r.ok ? "ok" : r.error}`);
    if (r.ok) delivered = true;
  }

  // 2) FormSubmit fallback
  if (!delivered) {
    const f = await deliverViaFormSubmit(enquiry, siteOriginFrom(req));
    attempts.push(`formsubmit: ${f.ok ? "ok" : f.error}`);
    if (f.ok) delivered = true;
    else if (f.needsActivation) {
      console.warn(
        "[enquiry] FormSubmit needs activation — the destination inbox " +
          `${ENQUIRY_TO} must click the activation email once. ` +
          "Set RESEND_API_KEY in Vercel env for immediate reliable delivery instead.",
      );
    }
  }

  console.info("[enquiry] delivery attempts:", attempts.join(" | "));

  // Always respond ok to the client — the enquiry is captured in logs.
  return NextResponse.json({ ok: true });
}
