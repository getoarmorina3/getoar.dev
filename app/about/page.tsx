import type { Metadata } from "next";
import { JsonLd, aboutPageJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PageTitle } from "@/components/page-title";
import { certifications } from "@/content/certs";
import { site } from "@/content/site";
import { pathIntro, work } from "@/content/work";

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
            <p className="brand-lede">
              Education, courses that shaped how I build, and the places I have
              worked.
            </p>
          </>
        }
      >
      <section className="brand-section" aria-labelledby="education">
        <h2 id="education" className="brand-heading-24">
          Education
        </h2>
        <ul className="brand-custom-cert-list">
          <li className="brand-custom-cert">
            <p className="brand-custom-degree">{site.education.degree}</p>
            <p className="brand-meta">
              {site.education.school}
              <span aria-hidden="true"> · </span>
              {site.education.years}
            </p>
          </li>
          {certifications.map((cert) => (
            <li
              key={`${cert.title}-${cert.issuer}`}
              className="brand-custom-cert"
            >
              <a
                href={cert.href}
                className="brand-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cert.title}
              </a>
              <p className="brand-meta">
                {cert.issuer}
                <span aria-hidden="true"> · </span>
                {cert.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="brand-section" aria-labelledby="path">
        <h2 id="path" className="brand-heading-24">
          Path
        </h2>
        <div className="brand-reading">
          {pathIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="brand-custom-path-list">
          {work.map((job) => (
            <li key={`${job.company}-${job.span}`} className="brand-custom-path">
              <p className="brand-custom-path-company">{job.company}</p>
              <ul className="brand-custom-path-roles">
                {job.roles.map((role) => (
                  <li key={`${role.title}-${role.start}`}>
                    <span className="brand-meta">
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
              <p className="brand-meta brand-custom-path-span">{job.span}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
    </>
  );
}
