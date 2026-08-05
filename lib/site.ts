import { site } from "@/content/site";

/** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://getoar.dev"
).replace(/\/$/, "");

export const siteDescription =
  "Web engineer based in Kosovo. Product interfaces, exacting design, and clean code. Remote.";

export const siteTagline = `${site.title} · ${site.location}`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
