import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blog/what-the-biography-left-out-of-the-demo",
        destination: "/blog/reading-jobs",
        permanent: true,
      },
      {
        source: "/blog/no-other-choice-said-the-sprint",
        destination: "/blog/no-other-choice",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
