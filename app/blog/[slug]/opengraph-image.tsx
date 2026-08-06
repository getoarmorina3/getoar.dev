import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/content/posts";
import { OgFrame, ogOptions } from "@/lib/og-frame";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Writing";

  return new ImageResponse(<OgFrame title={title} />, await ogOptions());
}
