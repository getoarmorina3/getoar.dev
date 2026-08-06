import type { Metadata } from "next";
import { JsonLd, profilePageJsonLd } from "@/components/json-ld";
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
    type: "profile",
    firstName: "Getoar",
    lastName: "Morina",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
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
            </div>
          </>
        }
      />
    </>
  );
}
