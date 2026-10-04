import { ImageResponse } from "next/og";
import { ogColors, ogOptions } from "@/lib/og-frame";

export async function iconMark(px: number) {
  const { fonts } = await ogOptions();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ogColors.ink,
          color: ogColors.bg,
          fontFamily: "Jersey",
          fontSize: px * 1.05,
          lineHeight: 1,
          paddingBottom: px * 0.18,
        }}
      >
        g
      </div>
    ),
    { width: px, height: px, fonts },
  );
}
