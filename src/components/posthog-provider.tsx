"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { SITE } from "@/lib/site";

let initialised = false;

function ensurePostHog(): boolean {
  if (typeof window === "undefined") return false;
  if (initialised) return true;
  if (!SITE.posthog.key) return false;
  posthog.init(SITE.posthog.key, {
    api_host: SITE.posthog.host,
    ui_host: SITE.posthog.uiHost,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
  });
  initialised = true;
  return true;
}

/**
 * Anything that reads useSearchParams must sit inside Suspense, otherwise
 * Next.js falls back to fully client-side rendering for the whole tree.
 * The actual pageview emitter lives in this inner component.
 *
 * Init happens inside this effect (not in the parent) so the first pageview
 * is captured: React runs child effects before parent effects, so gating the
 * capture on a parent-effect-driven flag would drop the initial load —
 * fatal on this one-page site where no further navigation fires the effect.
 *
 * Init + the first capture are deferred to requestIdleCallback so PostHog's
 * bundle work stays out of the hydration/TBT window. The idle callback still
 * fires on this static page, and the 2s timeout (plus the setTimeout
 * fallback) guarantees the initial pageview is never silently dropped.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const capture = () => {
      if (!ensurePostHog()) return;
      const qs = searchParams?.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      posthog.capture("$pageview", { $current_url: url });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(capture, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(capture, 1);
    return () => window.clearTimeout(t);
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
