import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/content/posts";
import { OgFrame, ogSize } from "@/lib/og-frame";
import { site } from "@/content/site";

export const alt = `${site.name} · Writing`;
export const size = ogSize;
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

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={`${site.name}  ·  Writing`}
        title={title}
        footer={post?.description}
      />
    ),
    { ...ogSize },
  );
}
