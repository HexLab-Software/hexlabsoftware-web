"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Icon } from "@/components/icon";
import { SITE } from "@/lib/site";

/**
 * Cal.com inline booking, wrapped in the glass-panel container from the
 * Stitch screen. Uses `@calcom/embed-react` (free tier, no Platform plan).
 */
export function Booking() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hexlab-call" });
      const theme = {
        "cal-bg": "#1e2840",
        "cal-bg-muted": "#152238",
        "cal-bg-emphasis": "#243252",
        "cal-brand": "#6d7793",
        "cal-border": "#334155",
        "cal-border-emphasis": "#858fac",
        "cal-text": "#e2e8f0",
        "cal-text-muted": "#94a3b8",
        "cal-text-emphasis": "#ffffff",
      };
      cal("ui", {
        cssVarsPerTheme: { light: theme, dark: theme },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      id="contact"
      className="mx-auto max-w-4xl px-6 py-24 text-center"
    >
      <h2 className="mb-4 font-headline text-3xl font-bold text-white">
        Parliamo del tuo prossimo progetto
      </h2>
      <p className="mb-12 text-slate-400">
        Seleziona uno slot libero dal mio calendario per una consulenza tecnica o
        per discutere di opportunità di collaborazione.
      </p>

      <div className="glass-panel flex min-h-[600px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-700/50 bg-surface-container-lowest/5 p-4 md:p-8">
        <div className="w-full">
          <Cal
            namespace="hexlab-call"
            calLink={`${SITE.cal.username}/${SITE.cal.eventSlug}`}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 600,
              overflow: "scroll",
            }}
            config={{
              layout: "month_view",
              theme: "dark",
            }}
          />
        </div>

        <p className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <Icon name="lock" size={12} />
          Powered by Cal.com · Calendario sincronizzato in tempo reale
        </p>
      </div>
    </section>
  );
}
