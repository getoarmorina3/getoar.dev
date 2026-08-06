import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Mirror of /llms.txt for crawlers that look under /.well-known/ */
export async function GET() {
  return Response.redirect(absoluteUrl("/llms.txt"), 308);
}
