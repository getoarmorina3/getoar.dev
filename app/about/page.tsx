import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { certifications } from "@/content/certs";
import { site } from "@/content/site";
import { pathIntro, work } from "@/content/work";

export const metadata: Metadata = {
  title: "About",
  description:
    "Education and path for Getoar Morina, web engineer based in Kosovo.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About",
    description:
      "Education and path for Getoar Morina, web engineer based in Kosovo.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <SiteShell
      active="about"
      header={
        <>
          <PageTitle>About</PageTitle>
          <p className="vbg-lede">
            Education, courses that shaped how I build, and the places I have
            worked.
          </p>
        </>
      }
    >
      <section className="vbg-section" aria-labelledby="education">
        <h2 id="education" className="vbg-heading-24">
          Education
        </h2>
        <ul className="vbg-custom-cert-list">
          <li className="vbg-custom-cert">
            <p className="vbg-custom-degree">{site.education.degree}</p>
            <p className="vbg-meta">
              {site.education.school}
              <span aria-hidden="true"> · </span>
              {site.education.years}
            </p>
          </li>
          {certifications.map((cert) => (
            <li
              key={`${cert.title}-${cert.issuer}`}
              className="vbg-custom-cert"
            >
              <a
                href={cert.href}
                className="vbg-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cert.title}
              </a>
              <p className="vbg-meta">
                {cert.issuer}
                <span aria-hidden="true"> · </span>
                {cert.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="vbg-section" aria-labelledby="path">
        <h2 id="path" className="vbg-heading-24">
          Path
        </h2>
        <div className="vbg-reading">
          {pathIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="vbg-custom-path-list">
          {work.map((job) => (
            <li key={`${job.company}-${job.span}`} className="vbg-custom-path">
              <p className="vbg-meta">{job.span}</p>
              <p>
                {job.role}
                <span className="vbg-meta"> · {job.company}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
