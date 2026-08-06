import { ImageResponse } from "next/og";
import { OgFrame, ogOptions } from "@/lib/og-frame";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgFrame title={site.name} brand="getoar.dev" />,
    await ogOptions(),
  );
}
