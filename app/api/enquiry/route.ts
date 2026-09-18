import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — forwards to a destination email via FormSubmit.co.
 *
 * FormSubmit needs no signup. The first POST to a new address triggers a
 * one-time activation email to that address; clicking the link inside it
 * activates the endpoint. All subsequent POSTs are delivered as email.
 *
 * The destination email is read from ENQUIRY_TO env var, falling back to
 * onprimehub@gmail.com for local testing.
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

  // Newsletter signup has a relaxed schema — only the email is required.
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

  // Compose the email body.
  const subject = isNewsletter
    ? "PilatesHub — new newsletter signup"
    : `PilatesHub enquiry from ${name}`;

  const body = [
    isNewsletter ? "Newsletter signup" : "New enquiry from the PilatesHub site.",
    "",
    `Name:      ${name || "(newsletter)"}`,
    `Email:     ${email}`,
    phone ? `Phone:     ${phone}` : null,
    data.interest ? `Interest:  ${data.interest}` : null,
    data.location ? `Location:  ${data.location}` : null,
    "",
    message ? `Message:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const fsRes = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_TO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name: name || "(newsletter)",
        email,
        phone: phone || "-",
        interest: data.interest || "-",
        location: data.location || "-",
        message: message || "-",
        _body: body,
      }),
    });

    if (!fsRes.ok) {
      const text = await fsRes.text().catch(() => "");
      console.warn("[enquiry] FormSubmit non-OK:", fsRes.status, text.slice(0, 200));
    }
  } catch (err) {
    console.error("[enquiry] delivery error:", err);
    // Don't fail the UI — still log so nothing is lost.
    console.info("[enquiry] payload was:", { name, email, phone, interest: data.interest, location: data.location, message });
  }

  return NextResponse.json({ ok: true });
}
