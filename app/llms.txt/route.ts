import { site } from "@/content/site";
import { absoluteUrl, siteDescription } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const body = `# ${site.name}

> ${siteDescription}

- Site: ${absoluteUrl("/")}
- Email: ${site.email}
- GitHub: ${site.github}

${site.bio.join("\n\n")}

Work history is intentionally not published.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
