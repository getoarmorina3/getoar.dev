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
          <div className="vbg-lede">
            <p>{site.bio[0]}</p>
          </div>
          <div className="vbg-reading">
            <p>{site.bio[1]}</p>
            <p>
              You can learn more about my background and interests through my{" "}
              <Link
                href="/about"
                className="vbg-link"
                transitionTypes={["nav-forward"]}
              >
                about
              </Link>{" "}
              page and{" "}
              <Link
                href="/blog"
                className="vbg-link"
                transitionTypes={["nav-forward"]}
              >
                writing
              </Link>
              . Find me on{" "}
              <a
                href="https://github.com/getoarmorina3"
                className="vbg-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/getoarmorina/"
                className="vbg-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , or email{" "}
              <a href={`mailto:${site.email}`} className="vbg-link">
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
