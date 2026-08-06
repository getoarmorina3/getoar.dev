import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { PageTransition } from "@/components/page-transition";
import ui from "@/styles/ui.module.css";
import styles from "./site-shell.module.css";

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
    <div className={styles.report} data-theme="auto">
      <div className={styles.shell}>
        <div className={styles.column}>
          <a className={styles.skip} href="#main">
            Skip to content
          </a>
          <header className={styles.header}>
            <div
              className={styles.masthead}
              style={{ viewTransitionName: "site-masthead" }}
            >
              <div className={styles.identity}>
                <Link
                  href="/"
                  className={styles.identityLink}
                  transitionTypes={active === "home" ? undefined : ["nav-back"]}
                  aria-current={active === "home" ? "page" : undefined}
                >
                  {site.name}
                </Link>
              </div>
              <div className={styles.nav}>
                <Link
                  href="/about"
                  className={active === "about" ? ui.link : ui.linkMuted}
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
                  className={active === "writing" ? ui.link : ui.linkMuted}
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
            <main id="main" className={styles.main}>
              <PageTransition>
                <div className={styles.pageBody}>{children}</div>
              </PageTransition>
            </main>
          ) : (
            <main id="main" className={`${styles.main} ${ui.visuallyHidden}`}>
              Home
            </main>
          )}
          <footer className={styles.footer}>
            <div className={styles.footerLinks}>
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className={ui.linkMuted}
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
