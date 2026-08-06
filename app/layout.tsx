import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  JsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/components/json-ld";
import { site } from "@/content/site";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/site";
import "./brand.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: siteDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Getoar Morina",
    "getoar.dev",
    "web engineer",
    "frontend engineer",
    "product interfaces",
    "UI engineering",
    "Next.js",
    "React",
    "TypeScript",
    "Kosovo",
    "remote web engineer",
    "design systems",
    "clean code",
  ],
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: absoluteUrl("/feed.xml"), title: `${site.name} Writing` },
      ],
      "text/plain": [
        { url: absoluteUrl("/llms.txt"), title: "llms.txt" },
        { url: absoluteUrl("/llms-full.txt"), title: "llms-full.txt" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} · ${site.title}`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "ai-content": absoluteUrl("/llms.txt"),
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
