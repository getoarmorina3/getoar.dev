import { certifications } from "@/content/certs";
import { getAllPosts } from "@/content/posts";
import { site } from "@/content/site";
import { pathIntro, work } from "@/content/work";
import { absoluteUrl, siteDescription } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  const writing = posts
    .map(
      (post) => `## ${post.title}

- Published: ${post.date}
- URL: ${absoluteUrl(`/blog/${post.slug}`)}
- Summary: ${post.description}
`,
    )
    .join("\n");

  const path = work
    .map((job) => {
      const roles = job.roles
        .map((role) =>
          role.span ? `${role.title} (${role.span})` : role.title,
        )
        .join(" → ");
      return `- ${job.span}: ${job.company} — ${roles}`;
    })
    .join("\n");

  const creds = certifications
    .map((cert) => `- ${cert.title} — ${cert.issuer} (${cert.year}) — ${cert.href}`)
    .join("\n");

  const body = `# ${site.name} · Full digest for language models

> ${siteDescription}

This file is a plain-text digest intended for AI agents and answer engines.
Canonical HTML pages remain the source of truth.

## Person

- Name: ${site.name}
- Job title: ${site.title}
- Based in: ${site.location}, Europe
- Working style: Remote
- Education: ${site.education.degree}, ${site.education.school} (${site.education.years})

## Biography

${site.bio.join("\n\n")}

## Path notes

${pathIntro.join("\n\n")}

${path}

## Credentials

${creds}

## Writing index

${writing || "No posts published yet."}

## Contact

${site.socials.map((social) => `- ${social.label}: ${social.href}`).join("\n")}

## Discovery

- Home: ${absoluteUrl("/")}
- About: ${absoluteUrl("/about")}
- Writing: ${absoluteUrl("/blog")}
- Short agent summary: ${absoluteUrl("/llms.txt")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}
- RSS: ${absoluteUrl("/feed.xml")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
