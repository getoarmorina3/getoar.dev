import { getAllPosts } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl, siteDescription } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const socials = site.socials
    .map((social) => `- [${social.label}](${social.href})`)
    .join("\n");

  const writing = posts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`,
    )
    .join("\n");

  const body = `# ${site.name}

> ${site.title} based in ${site.location}. ${siteDescription}

${site.bio.join("\n\n")}

## Pages

- [Home](${absoluteUrl("/")}): Introduction and recent writing
- [About](${absoluteUrl("/about")}): Path and credentials
- [Writing](${absoluteUrl("/blog")}): Essays on interfaces, AI workflows, and maintainable systems
- [RSS feed](${absoluteUrl("/feed.xml")}): Subscribe to new writing

## Writing

${writing}

## Contact

${socials}

## Optional

- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): Fuller plain-text digest for agents
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
