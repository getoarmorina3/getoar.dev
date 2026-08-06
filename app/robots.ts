import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** AI / answer-engine crawlers commonly used for GEO discovery. */
const aiAgents = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "YouBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiAgents.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteHost(),
  };
}

function siteHost() {
  try {
    return new URL(absoluteUrl("/")).host;
  } catch {
    return "getoar.dev";
  }
}
