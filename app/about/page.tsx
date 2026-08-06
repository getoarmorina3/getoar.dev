import type { Metadata } from "next";
import { JsonLd, aboutPageJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { certifications } from "@/content/certs";
import { site } from "@/content/site";
import { pathIntro, work } from "@/content/work";
import ui from "@/styles/ui.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `Education, courses, and career path for ${site.name}, web engineer based in Kosovo, Europe.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About · ${site.name}`,
    description: `Education, courses, and career path for ${site.name}, web engineer based in Kosovo, Europe.`,
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <SiteShell
        active="about"
        header={
          <>
            <PageTitle>About</PageTitle>
            <p className={ui.lede}>
              Education, courses that shaped how I build, and the places I have
              worked.
            </p>
          </>
        }
      >
        <section className={ui.section} aria-labelledby="education">
          <h2 id="education" className={ui.heading}>
            Education
          </h2>
          <ul className={styles.list}>
            <li className={styles.cert}>
              <p className={styles.degree}>{site.education.degree}</p>
              <p className={ui.meta}>
                {site.education.school}
                <span aria-hidden="true"> · </span>
                {site.education.years}
              </p>
            </li>
            {certifications.map((cert) => (
              <li
                key={`${cert.title}-${cert.issuer}`}
                className={styles.cert}
              >
                <a
                  href={cert.href}
                  className={ui.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cert.title}
                </a>
                <p className={ui.meta}>
                  {cert.issuer}
                  <span aria-hidden="true"> · </span>
                  {cert.year}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={ui.section} aria-labelledby="path">
          <h2 id="path" className={ui.heading}>
            Path
          </h2>
          <div className={ui.reading}>
            {pathIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className={styles.list}>
            {work.map((job) => (
              <li
                key={`${job.company}-${job.span}`}
                className={styles.path}
              >
                <p className={styles.company}>{job.company}</p>
                <ul className={styles.roles}>
                  {job.roles.map((role) => (
                    <li key={`${role.title}-${role.start}`}>
                      <span className={ui.meta}>
                        {role.title}
                        {role.span ? (
                          <>
                            <span aria-hidden="true"> · </span>
                            {role.span}
                          </>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={`${ui.meta} ${styles.span}`}>{job.span}</p>
              </li>
            ))}
          </ul>
        </section>
      </SiteShell>
    </>
  );
}
