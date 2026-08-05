import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getAllPosts } from "@/content/posts";
import { formatDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Short notes that wander and land somewhere useful — usually near code.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Writing",
    description:
      "Short notes that wander and land somewhere useful — usually near code.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <SiteShell
      active="writing"
      header={
        <>
          <h1 className="brand-visually-hidden">Writing</h1>
          <p className="brand-lede">
            Short notes that wander and land somewhere useful — usually near
            code.
          </p>
        </>
      }
    >
      <section className="brand-section" aria-labelledby="posts">
        <h2 id="posts" className="brand-visually-hidden">
          Posts
        </h2>
        <ul className="brand-custom-post-list">
          {posts.map((post) => (
            <li key={post.slug} className="brand-custom-post-item">
              <div className="brand-custom-post-row">
                <Link
                  href={`/blog/${post.slug}`}
                  className="brand-link"
                  transitionTypes={["nav-forward"]}
                >
                  {post.title}
                </Link>
                <p className="brand-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
              </div>
              <p className="brand-meta">{post.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
