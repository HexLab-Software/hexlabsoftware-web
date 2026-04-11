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
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ensurePostHog() || !pathname) return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    posthog.capture("$pageview", { $current_url: url });
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
