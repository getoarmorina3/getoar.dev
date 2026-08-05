import { metadata as noOtherChoice } from "@/content/posts/no-other-choice.mdx";
import { metadata as readingJobs } from "@/content/posts/reading-jobs.mdx";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

/**
 * Explicit registry keeps imports statically analyzable for Turbopack/Next.
 * Prefer this over fs.readdir for a small fixed set of posts.
 */
const posts: PostMeta[] = [
  { slug: "reading-jobs", ...readingJobs },
  { slug: "no-other-choice", ...noOtherChoice },
];

export function getAllPosts(): PostMeta[] {
  return posts.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function getPostContent(slug: string) {
  switch (slug) {
    case "reading-jobs":
      return import("@/content/posts/reading-jobs.mdx");
    case "no-other-choice":
      return import("@/content/posts/no-other-choice.mdx");
    default:
      return null;
  }
}
