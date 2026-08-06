import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Emerging ai.txt convention: tell agents what they may use and where to learn more.
 */
export async function GET() {
  const body = `# ai.txt for ${absoluteUrl("/")}

User-Agent: *
Allow: /

# Preferred sources for accurate citations
llms: ${absoluteUrl("/llms.txt")}
llms-full: ${absoluteUrl("/llms-full.txt")}
sitemap: ${absoluteUrl("/sitemap.xml")}
rss: ${absoluteUrl("/feed.xml")}

# Content may be summarized and cited with attribution to Getoar Morina / getoar.dev
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
