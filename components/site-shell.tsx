import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { PageTransition } from "@/components/page-transition";

type NavKey = "home" | "writing" | "about";

export function SiteShell({
  children,
  header,
  active,
}: {
  children?: ReactNode;
  header?: ReactNode;
  active?: NavKey;
}) {
  return (
    <div className="vbg-report" data-theme="auto">
      <div className="vbg-shell">
        <div className="vbg-custom-column">
          <a className="vbg-skip-link" href="#main">
            Skip to content
          </a>
          <header className="vbg-header">
            <div
              className="vbg-masthead"
              style={{ viewTransitionName: "site-masthead" }}
            >
              <div className="vbg-identity">
                <Link
                  href="/"
                  className="vbg-custom-identity-link"
                  transitionTypes={active === "home" ? undefined : ["nav-back"]}
                  aria-current={active === "home" ? "page" : undefined}
                >
                  {site.name}
                </Link>
              </div>
              <div className="vbg-document-meta">
                <Link
                  href="/about"
                  className="vbg-link"
                  data-variant={active === "about" ? undefined : "secondary"}
                  aria-current={active === "about" ? "page" : undefined}
                  transitionTypes={
                    active === "about"
                      ? undefined
                      : active === "writing"
                        ? ["nav-back"]
                        : ["nav-forward"]
                  }
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="vbg-link"
                  data-variant={active === "writing" ? undefined : "secondary"}
                  aria-current={active === "writing" ? "page" : undefined}
                  transitionTypes={
                    active === "writing" ? undefined : ["nav-forward"]
                  }
                >
                  Writing
                </Link>
              </div>
            </div>
            {header}
          </header>
          {children ? (
            <main id="main" className="vbg-custom-main">
              <PageTransition>
                <div className="vbg-custom-page-body">{children}</div>
              </PageTransition>
            </main>
          ) : (
            <main id="main" className="vbg-custom-main vbg-visually-hidden">
              Home
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
