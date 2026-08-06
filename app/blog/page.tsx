import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, blogJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { getAllPosts } from "@/content/posts";
import { formatDate } from "@/lib/format-date";
import ui from "@/styles/ui.module.css";
import styles from "./blog.module.css";

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
            <p className={ui.lede}>{writingDescription}</p>
          </>
        }
      >
        <section className={ui.section} aria-labelledby="posts">
          <h2 id="posts" className={ui.visuallyHidden}>
            Posts
          </h2>
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={ui.link}
                  transitionTypes={["nav-forward"]}
                >
                  {post.title}
                </Link>
                <div className={styles.metaRow}>
                  <p className={`${ui.meta} ${styles.desc}`}>
                    {post.description}
                  </p>
                  <p className={`${ui.meta} ${styles.date}`}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </SiteShell>
    </>
  );
}
