import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Brevo transactional email — HTTP API (not SMTP).
 * https://developers.brevo.com/reference/sendtransacemail
 *
 * Required env vars (set in Vercel project settings):
 *   - BREVO_API_KEY        Brevo SMTP & API → API keys
 *   - BREVO_SENDER_EMAIL   a sender verified in Brevo (e.g. no-reply@hexlabsoftware.it)
 *   - BREVO_SENDER_NAME    display name for the sender
 *   - CONTACT_TO_EMAIL     (optional) override recipient, defaults to site email
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

  const result = validateContact((body ?? {}) as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const { name, email, message } = result.data;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;line-height:1.6;color:#131313;">
      <h2 style="margin:0 0 16px;font-family:'Space Grotesk',Inter,sans-serif;">Nuova richiesta di preventivo</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;width:120px;color:#666;">Nome</td><td style="padding:6px 0;"><strong>${safe.name}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="margin:0;"><strong>Messaggio</strong></p>
      <p style="margin:12px 0 0;white-space:pre-wrap;">${safe.message}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:28px 0 12px;">
      <p style="margin:0;font-size:12px;color:#888;">Inviato da ${SITE.url}</p>
    </div>
  `.trim();

  const text = `Nuova richiesta di preventivo

Nome: ${name}
Email: ${email}

${message}

---
Inviato da ${SITE.url}`;

  const brevoPayload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: toEmail, name: SITE.name }],
    replyTo: { email, name },
    subject: `[HexLab] Richiesta di preventivo — ${name}`,
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
