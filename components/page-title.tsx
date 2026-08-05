import type { ReactNode } from "react";
import { ViewTransition } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="page-title" share="title-morph" default="none">
      <h1 className="vbg-title">{children}</h1>
    </ViewTransition>
  );
}
