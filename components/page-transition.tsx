import type { ReactNode } from "react";
import { ViewTransition } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "soft-fade",
        "nav-back": "soft-fade",
        default: "none",
      }}
      exit={{
        "nav-forward": "soft-fade",
        "nav-back": "soft-fade",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
