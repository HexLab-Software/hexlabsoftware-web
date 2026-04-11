/**
 * reCAPTCHA v3 client helper.
 *
 * Lazy-loads google's `api.js` the first time someone actually interacts with
 * the form, so the ~250kB script never touches first paint or LCP. Exposes
 * two functions:
 *
 *   - `primeRecaptcha()`    — start downloading the script (call on first
 *                             focus / intersection). Safe to call many times.
 *   - `executeRecaptcha()`  — resolves with a fresh token or `null` if
 *                             reCAPTCHA isn't configured / failed to load.
 */

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const SCRIPT_ID = "recaptcha-v3";
let loadingPromise: Promise<Grecaptcha | null> | null = null;

function loadScript(): Promise<Grecaptcha | null> {
  if (typeof window === "undefined" || !SITE_KEY) return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const handleReady = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve(window.grecaptcha ?? null));
      } else {
        resolve(null);
      }
    };

    if (existing) {
      existing.addEventListener("load", handleReady, { once: true });
      existing.addEventListener(
        "error",
        () => {
          loadingPromise = null;
          resolve(null);
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleReady, { once: true });
    script.addEventListener(
      "error",
      () => {
        loadingPromise = null;
        resolve(null);
      },
      { once: true },
    );
    document.head.appendChild(script);
  });

  return loadingPromise;
}

export function primeRecaptcha(): void {
  void loadScript();
}

export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  const grecaptcha = await loadScript();
  if (!grecaptcha) return null;
  try {
    return await grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return null;
  }
}

export const RECAPTCHA_ENABLED = Boolean(SITE_KEY);
