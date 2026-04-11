"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

/**
 * Cal.com inline booking.
 *
 * Uses `@calcom/embed-react` (the free embed SDK, no Platform plan required).
 * Oreste had initially referenced `@calcom/atoms` `BookerEmbed`, but that
 * requires the paid Cal.com Platform plan + OAuth CalProvider setup — not
 * worth it for a single marketing site. If we ever migrate to atoms we only
 * need to swap this component.
 */
export function Booking() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hexlab-call" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: {
            "cal-bg": "#131313",
            "cal-bg-muted": "#1c1b1b",
            "cal-bg-emphasis": "#2a2a2a",
            "cal-brand": "#00ff41",
            "cal-border": "#3b4b37",
            "cal-border-emphasis": "#84967e",
            "cal-text": "#e5e2e1",
            "cal-text-muted": "#b9ccb2",
            "cal-text-emphasis": "#ffffff",
          },
          dark: {
            "cal-bg": "#131313",
            "cal-bg-muted": "#1c1b1b",
            "cal-bg-emphasis": "#2a2a2a",
            "cal-brand": "#00ff41",
            "cal-border": "#3b4b37",
            "cal-border-emphasis": "#84967e",
            "cal-text": "#e5e2e1",
            "cal-text-muted": "#b9ccb2",
            "cal-text-emphasis": "#ffffff",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      id="prenota"
      className="relative bg-[color:var(--color-surface-2)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          index="03"
          eyebrow="Parliamo"
          title={
            <>
              Prenota una call di{" "}
              <span className="text-[color:var(--color-phosphor)]">30 minuti</span>.
            </>
          }
          lede="Gratuita, senza impegno. Mi racconti il progetto, ti rispondo con una prima stima di fattibilità, tempistiche e budget."
        />

        <div className="mt-16 bg-[color:var(--color-surface-1)] p-2 md:p-4">
          <div className="relative min-h-[720px]">
            <Cal
              namespace="hexlab-call"
              calLink={`${SITE.cal.username}/${SITE.cal.eventSlug}`}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 720,
                overflow: "scroll",
              }}
              config={{
                layout: "month_view",
                theme: "dark",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
