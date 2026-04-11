/**
 * reCAPTCHA v3 server-side verification.
 * https://developers.google.com/recaptcha/docs/verify
 *
 * Returns a discriminated result so the caller can tell the difference
 * between "disabled on purpose" (missing env vars → allowed) and "present
 * but failed verification" (blocked).
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export type VerifyResult =
  | { status: "disabled" }
  | { status: "missing-token" }
  | { status: "passed"; score: number }
  | { status: "failed"; reason: string; score?: number };

export type RecaptchaConfig = {
  /** Expected action name, must match the client-side action. */
  action: string;
  /** Minimum score (0..1). v3 default 0.5. Higher = stricter. */
  minScore?: number;
};

export async function verifyRecaptcha(
  token: string | undefined | null,
  config: RecaptchaConfig,
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { status: "disabled" };
  if (!token) return { status: "missing-token" };

  const minScore = config.minScore ?? 0.5;

  let response: Response;
  try {
    response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    return { status: "failed", reason: "network" };
  }

  if (!response.ok) {
    return { status: "failed", reason: `http-${response.status}` };
  }

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    score?: number;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  } | null;

  if (!data || !data.success) {
    const err = data?.["error-codes"]?.join(",") ?? "unknown";
    return { status: "failed", reason: err };
  }

  if (typeof data.score === "number" && data.score < minScore) {
    return { status: "failed", reason: "low-score", score: data.score };
  }

  if (data.action && data.action !== config.action) {
    return { status: "failed", reason: "action-mismatch", score: data.score };
  }

  return { status: "passed", score: data.score ?? 1 };
}
