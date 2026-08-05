import { ImageResponse } from "next/og";
import { OgFrame, ogSize } from "@/lib/og-frame";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow={`${site.title}  ·  ${site.location}`}
        title={site.name}
        footer="Interfaces that stay calm when the product gets complicated."
      />
    ),
    { ...ogSize },
  );
}
