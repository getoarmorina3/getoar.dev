import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  darkLightGradientOg,
  darkLightGrainDataUri,
} from "@/lib/dark-light";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export async function getOgFonts() {
  const dir = join(process.cwd(), "lib/fonts");
  const [light, regular] = await Promise.all([
    readFile(join(dir, "SourceSans3-Light.ttf")),
    readFile(join(dir, "SourceSans3-Regular.ttf")),
  ]);

  return [
    {
      name: "Source Sans 3",
      data: light,
      weight: 300 as const,
      style: "normal" as const,
    },
    {
      name: "Source Sans 3",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

export async function ogOptions() {
  return {
    ...ogSize,
    fonts: await getOgFonts(),
  };
}

function titleFontSize(title: string) {
  if (title.length > 60) return 44;
  if (title.length > 42) return 52;
  if (title.length > 28) return 64;
  if (title.length > 16) return 76;
  return 92;
}

/** ik-montage field: soft top-right light, grain, centered light type. */
export function OgFrame({
  title,
  brand = "getoar.dev",
}: {
  title: string;
  brand?: string;
}) {
  const size = titleFontSize(title);

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
        backgroundColor: "#000000",
        backgroundImage: darkLightGradientOg,
        color: "#ffffff",
        fontFamily: '"Source Sans 3"',
        padding: "88px 112px 120px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkLightGrainDataUri}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.18,
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: size,
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#ffffff",
          maxWidth: 880,
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 52,
          display: "flex",
          justifyContent: "center",
          fontSize: 17,
          fontWeight: 400,
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.38)",
          paddingLeft: "0.32em",
        }}
      >
        {brand.toLowerCase()}
      </div>
    </div>
  );
}
