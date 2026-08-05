import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function Heading2({ children }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className="brand-heading-20">{children}</h2>;
}

function Heading3({ children }: ComponentPropsWithoutRef<"h3">) {
  return <h3 className="brand-heading-16">{children}</h3>;
}

function Paragraph({ children }: ComponentPropsWithoutRef<"p">) {
  return <p>{children}</p>;
}

function Anchor({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      className="brand-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function UnorderedList({ children }: ComponentPropsWithoutRef<"ul">) {
  return <ul className="brand-list">{children}</ul>;
}

function OrderedList({ children }: ComponentPropsWithoutRef<"ol">) {
  return <ol className="brand-list">{children}</ol>;
}

function Blockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote>{children}</blockquote>;
}

function HorizontalRule() {
  return <hr className="brand-custom-rule" />;
}

const components = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  blockquote: Blockquote,
  hr: HorizontalRule,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
