import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * `lastModified` is pinned to a constant instead of `new Date()` so Google
 * doesn't see a churning timestamp on every build and start ignoring the
 * signal. Bump this manually when the homepage content actually changes.
 */
const LAST_MODIFIED = "2026-04-11";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { "it-IT": SITE.url },
      },
    },
  ];
}
