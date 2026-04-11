"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { SITE } from "@/lib/site";

let initialised = false;

function initPostHog() {
  if (initialised || typeof window === "undefined") return;
  if (!SITE.posthog.key) return;
  posthog.init(SITE.posthog.key, {
    api_host: SITE.posthog.host,
    ui_host: SITE.posthog.uiHost,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
  });
  initialised = true;
}

/**
 * Anything that reads useSearchParams must sit inside Suspense, otherwise
 * Next.js falls back to fully client-side rendering for the whole tree.
 * The actual pageview emitter lives in this inner component.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initialised || !pathname) return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
