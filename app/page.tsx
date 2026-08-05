import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { site } from "@/content/site";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} · ${site.title}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} · ${site.title}`,
    description: siteDescription,
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <SiteShell
      active="home"
      header={
        <>
          <PageTitle>{site.title}</PageTitle>
          <div className="brand-lede">
            <p>{site.bio[0]}</p>
          </div>
          <div className="brand-reading">
            <p>{site.bio[1]}</p>
            <p>
              You can learn more about my background and interests through my{" "}
              <Link
                href="/about"
                className="brand-link"
                transitionTypes={["nav-forward"]}
              >
                about
              </Link>{" "}
              page and{" "}
              <Link
                href="/blog"
                className="brand-link"
                transitionTypes={["nav-forward"]}
              >
                writing
              </Link>
              . Find me on{" "}
              <a
                href="https://github.com/getoarmorina3"
                className="brand-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/getoarmorina/"
                className="brand-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , or email{" "}
              <a href={`mailto:${site.email}`} className="brand-link">
                {site.email}
              </a>
              .
            </p>
          </div>
        </>
      }
    />
  );
}
