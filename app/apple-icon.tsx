import { ImageResponse } from "next/og";
import { darkLightGradient, darkLightGrainDataUri } from "@/lib/dark-light";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#000000",
          backgroundImage: darkLightGradient,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={darkLightGrainDataUri}
          alt=""
          width={180}
          height={180}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.2,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
