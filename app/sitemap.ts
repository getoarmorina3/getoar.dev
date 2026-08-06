import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0] ? new Date(posts[0].date) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/feed.xml"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...postRoutes];
}
