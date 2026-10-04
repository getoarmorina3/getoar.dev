import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogColors = {
  bg: "#f4ede1",
  ink: "#2a2bd8",
} as const;

export async function ogOptions() {
  const data = await readFile(
    join(process.cwd(), "lib/fonts/Jersey10-Regular.ttf"),
  );

  return {
    ...ogSize,
    fonts: [
      {
        name: "Jersey",
        data,
        weight: 400 as const,
        style: "normal" as const,
      },
    ],
  };
}

export function OgFrame({ lines, footer }: { lines: string[]; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: ogColors.bg,
        color: ogColors.ink,
        fontFamily: "Jersey",
      }}
    >
      {lines.map((line) => (
        <div
          key={line}
          style={{ display: "flex", fontSize: 220, lineHeight: 0.8 }}
        >
          {line}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          display: "flex",
          fontSize: 40,
        }}
      >
        {footer}
      </div>
    </div>
  );
}
