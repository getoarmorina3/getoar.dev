/** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://getoar.dev"
).replace(/\/$/, "");

export const siteDescription =
  "Getoar Morina is a web engineer from Kosovo who grew up in his dad's internet café.";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
