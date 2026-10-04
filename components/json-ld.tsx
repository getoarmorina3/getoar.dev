import { site } from "@/content/site";
import { siteDescription, siteUrl } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLd | JsonLd[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          payload.length === 1 ? payload[0] : payload,
        ).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    url: siteUrl,
    jobTitle: site.title,
    description: siteDescription,
    email: `mailto:${site.email}`,
    sameAs: [site.github],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    alternateName: ["getoar.dev", "Getoar"],
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
    author: { "@id": `${siteUrl}/#person` },
  };
}
