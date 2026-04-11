import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Server-rendered JSON-LD structured data (Person + Organization + WebSite).
 * Payload is a typed literal — never touches user input.
 * Uses next/script so the inline script is emitted safely by the framework
 * (escapes the closing-tag sequence to prevent payload-based tag breakout).
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.legalName,
        jobTitle: SITE.role,
        url: SITE.url,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        image: `${SITE.url}/og.png`,
        sameAs: [
          SITE.social.linkedin,
          SITE.social.github,
          SITE.social.githubOrg,
          SITE.social.facebook,
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        vatID: SITE.vat,
        founder: { "@id": `${SITE.url}/#person` },
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        sameAs: [
          SITE.social.linkedin,
          SITE.social.github,
          SITE.social.githubOrg,
          SITE.social.facebook,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: SITE.locale,
        publisher: { "@id": `${SITE.url}/#org` },
      },
    ],
  } as const;

  const payload = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <Script
      id="ld-json"
      type="application/ld+json"
      strategy="beforeInteractive"
    >
      {payload}
    </Script>
  );
}
