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
          <h1 className="vbg-visually-hidden">Writing</h1>
          <p className="vbg-lede">
            Short notes that wander and land somewhere useful — usually near
            code.
          </p>
        </>
      }
    >
      <section className="vbg-section" aria-labelledby="posts">
        <h2 id="posts" className="vbg-visually-hidden">
          Posts
        </h2>
        <ul className="vbg-custom-post-list">
          {posts.map((post) => (
            <li key={post.slug} className="vbg-custom-post-item">
              <div className="vbg-custom-post-row">
                <Link
                  href={`/blog/${post.slug}`}
                  className="vbg-link"
                  transitionTypes={["nav-forward"]}
                >
                  {post.title}
                </Link>
                <p className="vbg-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
              </div>
              <p className="vbg-meta">{post.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
