import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import ui from "@/styles/ui.module.css";

function Heading2({ children }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={`${ui.headingMd} ${ui.block}`}>{children}</h2>;
}

function Heading3({ children }: ComponentPropsWithoutRef<"h3">) {
  return <h3 className={`${ui.headingSm} ${ui.block}`}>{children}</h3>;
}

function Paragraph({ children }: ComponentPropsWithoutRef<"p">) {
  return <p className={ui.block}>{children}</p>;
}

function Anchor({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      className={ui.link}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function UnorderedList({ children }: ComponentPropsWithoutRef<"ul">) {
  return <ul className={`${ui.list} ${ui.block}`}>{children}</ul>;
}

function OrderedList({ children }: ComponentPropsWithoutRef<"ol">) {
  return <ol className={`${ui.list} ${ui.block}`}>{children}</ol>;
}

function Blockquote({ children }: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote className={ui.block}>{children}</blockquote>;
}

function HorizontalRule() {
  return <hr className={`${ui.rule} ${ui.block}`} />;
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
