import { getAllPosts } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl, siteDescription } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  const writing = posts
    .map(
      (post) => `## ${post.title}

Published: ${post.date}
URL: ${absoluteUrl(`/blog/${post.slug}`)}

${post.description}
`,
    )
    .join("\n");

  const body = `# ${site.name} · Full digest

> ${siteDescription}

## About

${site.bio.join("\n\n")}

Education: ${site.education.degree}, ${site.education.school} (${site.education.years})

Role: ${site.title}. Public writing covers craft and systems.

## Writing

${writing}

## Contact

${site.socials.map((social) => `- ${social.label}: ${social.href}`).join("\n")}

## Machine-readable

- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}
- RSS: ${absoluteUrl("/feed.xml")}
- Short agent summary: ${absoluteUrl("/llms.txt")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
