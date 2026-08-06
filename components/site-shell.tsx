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
    <div className="brand-report" data-theme="auto">
      <div className="brand-shell">
        <div className="brand-custom-column">
          <a className="brand-skip-link" href="#main">
            Skip to content
          </a>
          <header className="brand-header">
            <div
              className="brand-masthead"
              style={{ viewTransitionName: "site-masthead" }}
            >
              <div className="brand-identity">
                <Link
                  href="/"
                  className="brand-custom-identity-link"
                  transitionTypes={active === "home" ? undefined : ["nav-back"]}
                  aria-current={active === "home" ? "page" : undefined}
                >
                  {site.name}
                </Link>
              </div>
              <div className="brand-document-meta">
                <Link
                  href="/about"
                  className="brand-link"
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
                  className="brand-link"
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
            <main id="main" className="brand-custom-main">
              <PageTransition>
                <div className="brand-custom-page-body">{children}</div>
              </PageTransition>
            </main>
          ) : (
            <main id="main" className="brand-custom-main brand-visually-hidden">
              Home
            </main>
          )}
          <footer className="brand-footer">
            <div className="brand-custom-footer-links">
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="brand-link"
                  data-variant="secondary"
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
