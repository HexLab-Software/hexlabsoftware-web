/**
 * reCAPTCHA Enterprise server-side verification.
 * https://cloud.google.com/recaptcha/docs/create-assessment-website
 *
 * As of 2025 Google no longer issues "classic" v3 secret keys for new sites —
 * keys live inside a Google Cloud project and verification is done via the
 * `projects.assessments.create` endpoint of the reCAPTCHA Enterprise API.
 *
 * The client SDK (`grecaptcha.execute(...)`) is unchanged: the same site key
 * and the same token flow still work. Only the server verification path has
 * moved from `https://www.google.com/recaptcha/api/siteverify` to the
 * Enterprise endpoint below, which requires:
 *   - RECAPTCHA_PROJECT_ID   your Google Cloud project id (not number)
 *   - RECAPTCHA_API_KEY      a GCP API key with "reCAPTCHA Enterprise API" enabled
 *   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY   echoed back in the request body
 *
 * Returns a discriminated result so the caller can tell the difference
 * between "disabled on purpose" (missing env vars → allowed) and "present
 * but failed verification" (blocked).
 */

export type VerifyResult =
  | { status: "disabled" }
  | { status: "missing-token" }
  | { status: "passed"; score: number }
  | { status: "failed"; reason: string; score?: number };

/**
 * In production, missing GCP credentials would silently let spam through. If
 * any of the three env vars are set, they must ALL be set — an incomplete
 * config is treated as a hard verification failure. In dev (NODE_ENV !==
 * "production"), `disabled` still bypasses verification so local iteration
 * without GCP keys keeps working.
 */
function resolveCredentials():
  | { projectId: string; apiKey: string; siteKey: string }
  | { status: "disabled" }
  | { status: "failed"; reason: string } {
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const apiKey = process.env.RECAPTCHA_API_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const any = Boolean(projectId || apiKey || siteKey);
  const all = Boolean(projectId && apiKey && siteKey);

  if (!all) {
    if (process.env.NODE_ENV === "production") {
      return { status: "failed", reason: any ? "partial-config" : "no-config" };
    }
    return { status: "disabled" };
  }

  return { projectId: projectId!, apiKey: apiKey!, siteKey: siteKey! };
}

export type RecaptchaConfig = {
  /** Expected action name, must match the client-side action. */
  action: string;
  /** Minimum risk-analysis score (0..1). Higher = stricter. */
  minScore?: number;
};

type EnterpriseAssessment = {
  tokenProperties?: {
    valid?: boolean;
    invalidReason?: string;
    action?: string;
    hostname?: string;
    createTime?: string;
  };
  riskAnalysis?: {
    score?: number;
    reasons?: string[];
  };
  name?: string;
};

export async function verifyRecaptcha(
  token: string | undefined | null,
  config: RecaptchaConfig,
): Promise<VerifyResult> {
  const credentials = resolveCredentials();
  if ("status" in credentials) return credentials;
  const { projectId, apiKey, siteKey } = credentials;
  if (!token) return { status: "missing-token" };

  const minScore = config.minScore ?? 0.5;

  const endpoint =
    `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments` +
    `?key=${encodeURIComponent(apiKey)}`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: {
          token,
          expectedAction: config.action,
          siteKey,
        },
      }),
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    return { status: "failed", reason: "network" };
  }

  if (!response.ok) {
    return { status: "failed", reason: `http-${response.status}` };
  }

  const data = (await response
    .json()
    .catch(() => null)) as EnterpriseAssessment | null;

  if (!data?.tokenProperties?.valid) {
    return {
      status: "failed",
      reason: data?.tokenProperties?.invalidReason ?? "invalid-token",
    };
  }

  if (data.tokenProperties.action && data.tokenProperties.action !== config.action) {
    return {
      status: "failed",
      reason: "action-mismatch",
      score: data.riskAnalysis?.score,
    };
  }

  const score = data.riskAnalysis?.score ?? 0;
  if (score < minScore) {
    return { status: "failed", reason: "low-score", score };
  }

  return { status: "passed", score };
}
