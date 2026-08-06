import { ImageResponse } from "next/og";
import { OgFrame, ogSize } from "@/lib/og-frame";
import { site } from "@/content/site";

export const alt = `About · ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgFrame title="About" />, { ...ogSize });
}
