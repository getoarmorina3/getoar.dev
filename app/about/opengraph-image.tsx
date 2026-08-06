import { ImageResponse } from "next/og";
import { OgFrame, ogOptions } from "@/lib/og-frame";

export const alt = "About";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgFrame title="About" />, await ogOptions());
}
