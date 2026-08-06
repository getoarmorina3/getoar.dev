import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, blogJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { getAllPosts } from "@/content/posts";
import { formatDate } from "@/lib/format-date";

const writingDescription =
  "Notes on product interfaces, craft, AI at work, and systems that stay editable.";

export const metadata: Metadata = {
  title: "Writing",
  description: writingDescription,
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Writing",
    description: writingDescription,
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={[
          blogJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ]),
        ]}
      />
      <SiteShell
        active="writing"
        header={
          <>
            <PageTitle>Writing</PageTitle>
            <p className="brand-lede">{writingDescription}</p>
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
    </>
  );
}
