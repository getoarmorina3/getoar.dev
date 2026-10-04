import { ImageResponse } from "next/og";
import { OgFrame, ogOptions, ogSize } from "@/lib/og-frame";
import { site } from "@/content/site";

export const alt = site.name;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgFrame
      lines={["getoar", "morina"]}
      footer="internet café · est. 2003"
    />,
    await ogOptions(),
  );
}
