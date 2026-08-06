import { site } from "@/content/site";

/** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://getoar.dev"
).replace(/\/$/, "");

export const siteDescription =
  "Getoar Morina is a web engineer based in Kosovo, Europe. He builds product interfaces and web apps with a focus on design detail, clean code, and best practices. Remote.";

export const siteTagline = `${site.title} · ${site.location}`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
