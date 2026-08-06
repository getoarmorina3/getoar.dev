import { certifications } from "@/content/certs";
import { getAllPosts } from "@/content/posts";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/site";

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
    image: absoluteUrl("/opengraph-image"),
    jobTitle: site.title,
    description: site.bio[0],
    email: `mailto:${site.email}`,
    nationality: {
      "@type": "Country",
      name: "Kosovo",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "XK",
      addressRegion: "Europe",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.education.school,
    },
    sameAs: site.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
    knowsAbout: [
      "Web engineering",
      "Product interfaces",
      "Frontend architecture",
      "UI design systems",
      "Clean code",
      "Next.js",
      "React",
      "TypeScript",
      "AI-assisted workflows",
    ],
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "certificate",
      url: cert.href,
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
      },
      dateCreated: cert.year,
    })),
    worksFor: work.slice(0, 1).map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
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
    publisher: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
    copyrightHolder: { "@id": `${siteUrl}/#person` },
  };
}

export function profilePageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: `${site.name} · ${site.title}`,
    description: siteDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    dateModified: new Date().toISOString().slice(0, 10),
  };
}

export function aboutPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": absoluteUrl("/about"),
    url: absoluteUrl("/about"),
    name: `About · ${site.name}`,
    description: `Education, courses, and career path for ${site.name}, web engineer based in Kosovo.`,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    mainEntity: { "@id": `${siteUrl}/#person` },
  };
}

export function blogJsonLd(): JsonLd {
  const posts = getAllPosts();

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    url: absoluteUrl("/blog"),
    name: `${site.name} · Writing`,
    description:
      "Notes on product interfaces, craft, AI at work, and systems that stay editable.",
    inLanguage: "en",
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      author: { "@id": `${siteUrl}/#person` },
    })),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
}): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(`/blog/${post.slug}/opengraph-image`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    image: [image],
    thumbnailUrl: image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    creator: { "@id": `${siteUrl}/#person` },
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "Blog",
      "@id": absoluteUrl("/blog"),
      name: `${site.name} · Writing`,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
