import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { getAllPosts, getPost, getPostContent } from "@/content/posts";
import { site } from "@/content/site";
import { formatLongDate } from "@/lib/format-date";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Not found" };
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: site.name, url: absoluteUrl("/") }],
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [site.name],
      locale: "en_US",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  const loaded = post ? await getPostContent(slug) : null;

  if (!post || !loaded) {
    notFound();
  }

  const Content = loaded.default;

  return (
    <SiteShell
      active="writing"
      header={
        <>
          <p className="brand-context">
            <Link
              href="/blog"
              className="brand-link"
              data-variant="secondary"
              transitionTypes={["nav-back"]}
            >
              Writing
            </Link>
          </p>
          <PageTitle>{post.title}</PageTitle>
          <p className="brand-meta">
            <time dateTime={post.date}>{formatLongDate(post.date)}</time>
          </p>
          <p className="brand-lede">{post.description}</p>
        </>
      }
    >
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="brand-section">
        <div className="brand-reading brand-flow">
          <Content />
        </div>
      </article>
    </SiteShell>
  );
}
