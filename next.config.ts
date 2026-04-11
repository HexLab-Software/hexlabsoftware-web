import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The OG / Twitter image routes read TTFs from `src/lib/assets/` via
   * `fs.readFileSync` — Next.js file-tracing doesn't follow dynamic
   * string joins, so we whitelist them explicitly here.
   */
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/lib/assets/*.ttf"],
    "/twitter-image": ["./src/lib/assets/*.ttf"],
  },

  // Reverse-proxy PostHog through `/ingest` — ad blockers blacklist
  // `*.i.posthog.com` and drop events for a meaningful slice of visitors.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },

  /**
   * 301 redirects preserving link equity from the legacy PHP site at
   * hexlabsoftware.it. Every path below was indexed by Google from the
   * Bootstrap/jQuery era and must land the user (and the crawler) on
   * the matching section of the new one-page site — a 404 would drop
   * us out of the SERP. `permanent: true` → HTTP 308, which Google
   * treats as 301 for ranking-signal transfer.
   */
  async redirects() {
    return [
      // Landing / home aliases
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.old.html", destination: "/", permanent: true },
      { source: "/404.html", destination: "/", permanent: true },

      // Portfolio / projects
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/projects/", destination: "/#projects", permanent: true },
      { source: "/portfolio", destination: "/#projects", permanent: true },
      { source: "/portfolio-grid-col2.html", destination: "/#projects", permanent: true },
      { source: "/portfolio-grid-col3.html", destination: "/#projects", permanent: true },
      { source: "/portfolio-grid-col4.html", destination: "/#projects", permanent: true },
      { source: "/portfolio-masonry.html", destination: "/#projects", permanent: true },
      { source: "/portfolio-loadmore.html", destination: "/#projects", permanent: true },
      { source: "/portfolio-infinityload.html", destination: "/#projects", permanent: true },

      // Contact / preventivo
      { source: "/contact", destination: "/#message-form", permanent: true },
      { source: "/contact/", destination: "/#message-form", permanent: true },
      { source: "/contact.php", destination: "/#message-form", permanent: true },

      // WordPress services subfolders — now gone, land on skills/stack
      { source: "/services", destination: "/#stack", permanent: true },
      { source: "/services/", destination: "/#stack", permanent: true },
      { source: "/services/:slug*", destination: "/#stack", permanent: true },
      { source: "/services2", destination: "/#stack", permanent: true },
      { source: "/services2/", destination: "/#stack", permanent: true },
      { source: "/services2/:slug*", destination: "/#stack", permanent: true },

      // About pages referenced in the legacy nav but never filled in
      { source: "/about-agency.html", destination: "/", permanent: true },
      { source: "/about-minimal.html", destination: "/", permanent: true },

      // Legacy sitemap variant — keep only /sitemap.xml
      { source: "/sitemap_ssl.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
