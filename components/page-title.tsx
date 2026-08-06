import type { ReactNode } from "react";
import { ViewTransition } from "react";
import ui from "@/styles/ui.module.css";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="page-title" share="title-morph" default="none">
      <h1 className={ui.title}>{children}</h1>
    </ViewTransition>
  );
}
