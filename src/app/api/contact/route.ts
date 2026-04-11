import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";
import { verifyRecaptcha } from "@/lib/recaptcha-server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 *
 * Required env vars (set in Vercel project settings):
 *   - BREVO_API_KEY             Brevo SMTP & API → API keys
 *   - BREVO_SENDER_EMAIL        a sender verified in Brevo
 *   - BREVO_SENDER_NAME         display name for the sender (optional)
 *   - CONTACT_TO_EMAIL          recipient override (optional)
 *   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY   reCAPTCHA Enterprise site key (public)
 *   - RECAPTCHA_PROJECT_ID            GCP project id hosting the key
 *   - RECAPTCHA_API_KEY               GCP API key with reCAPTCHA Enterprise API
 *
 * If the reCAPTCHA env vars are unset the verification is skipped (useful
 * for local dev); production deployments MUST set all three.
 *
 * Brevo transactional HTTP API — https://developers.brevo.com/reference/sendtransacemail
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? SITE.name;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? SITE.email;

  if (!apiKey || !senderEmail) {
    return NextResponse.json(
      { ok: false, error: "server-misconfigured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;

  const recaptchaToken =
    typeof input.recaptchaToken === "string" ? input.recaptchaToken : null;
  const captcha = await verifyRecaptcha(recaptchaToken, {
    action: "contact",
    minScore: 0.5,
  });
  if (captcha.status === "failed" || captcha.status === "missing-token") {
    const reason =
      captcha.status === "missing-token"
        ? "missing-token"
        : captcha.reason;
    const score = captcha.status === "failed" ? captcha.score : undefined;
    console.error("[contact] recaptcha rejected", { reason, score });
    return NextResponse.json(
      {
        ok: false,
        reason,
        score,
        errors: {
          form: "Verifica anti-bot non superata. Ricarica la pagina e riprova.",
        },
      },
      { status: 403 },
    );
  }

  const result = validateContact(input);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const { name, email, subject, message } = result.data;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;line-height:1.6;color:#131313;">
      <h2 style="margin:0 0 16px;">Nuova richiesta dal sito</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;width:120px;color:#666;">Nome</td><td style="padding:6px 0;"><strong>${safe.name}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666;">Oggetto</td><td style="padding:6px 0;">${safe.subject}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="margin:0;"><strong>Messaggio</strong></p>
      <p style="margin:12px 0 0;white-space:pre-wrap;">${safe.message}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:28px 0 12px;">
      <p style="margin:0;font-size:12px;color:#888;">Inviato da ${SITE.url}</p>
    </div>
  `.trim();

  const text = `Nuova richiesta dal sito

Nome: ${name}
Email: ${email}
Oggetto: ${subject}

${message}

---
Inviato da ${SITE.url}`;

  const brevoPayload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: toEmail, name: SITE.name }],
    replyTo: { email, name },
    subject: `[HexLab] ${subject} — ${name}`,
    htmlContent: html,
    textContent: text,
    tags: ["contact-form", "hexlabsoftware.it"],
  };

  let brevoRes: Response;
  try {
    brevoRes = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(brevoPayload),
      // Vercel serverless has strict defaults; keep the request fast.
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "brevo-unreachable" },
      { status: 502 },
    );
  }

  if (!brevoRes.ok) {
    return NextResponse.json(
      { ok: false, error: "brevo-rejected", status: brevoRes.status },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
