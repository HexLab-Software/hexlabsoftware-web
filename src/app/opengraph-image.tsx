// Next.js parses `runtime` statically — it must be declared here, not
// re-exported. The rest of the metadata travels via the shared module.
export const runtime = "nodejs";
export { default, alt, size, contentType } from "@/lib/og-image";
