declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export const metadata: {
    title: string;
    date: string;
    description: string;
  };

  export default function MDXContent(props: MDXProps): React.ReactElement;
}
