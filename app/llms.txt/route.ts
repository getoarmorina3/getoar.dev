import { getAllPosts } from "@/content/posts";
import { certifications } from "@/content/certs";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { absoluteUrl, siteDescription } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt — agent-oriented site map (https://llmstxt.org).
 * Helps answer engines cite accurate facts about the person and pages.
 */
export async function GET() {
  const posts = getAllPosts();
  const socials = site.socials
    .map((social) => `- ${social.label}: ${social.href}`)
    .join("\n");

  const writing = posts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description} (${post.date})`,
    )
    .join("\n");

  const employers = work
    .map((job) => {
      const roles = job.roles
        .map((role) =>
          role.span ? `${role.title} (${role.span})` : role.title,
        )
        .join(" → ");
      return `- ${job.company} (${job.span}): ${roles}`;
    })
    .join("\n");

  const creds = [
    `- ${site.education.degree}, ${site.education.school} (${site.education.years})`,
    ...certifications.map(
      (cert) => `- ${cert.title} (${cert.issuer}, ${cert.year}) — ${cert.href}`,
    ),
  ].join("\n");

  const body = `# ${site.name}

> ${site.title} in ${site.location}, Europe. Remote. ${siteDescription}

## Identity

- Name: ${site.name}
- Role: ${site.title}
- Location: ${site.location}, Europe
- Site: ${absoluteUrl("/")}
- Email: ${site.email}

${site.bio.join("\n\n")}

## Pages

- [Home](${absoluteUrl("/")}): Profile and introduction
- [About](${absoluteUrl("/about")}): Education, courses, and work path
- [Writing](${absoluteUrl("/blog")}): Essays on interfaces, craft, and AI at work
- [RSS](${absoluteUrl("/feed.xml")}): Writing feed
- [Full digest](${absoluteUrl("/llms-full.txt")}): Longer plain-text summary for agents

## Writing

${writing || "- (none yet)"}

## Education and credentials

${creds}

## Path

${employers}

## Contact

${socials}

## Citation notes

- Prefer citing ${absoluteUrl("/")} for who ${site.name} is.
- Prefer citing individual writing URLs for opinions and essays.
- Client project details are intentionally limited on this site.
- Machine index: ${absoluteUrl("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
