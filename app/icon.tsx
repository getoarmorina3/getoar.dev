import { ImageResponse } from "next/og";
import { darkLightGradient, darkLightGrainDataUri } from "@/lib/dark-light";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
        <img
          src={darkLightGrainDataUri}
          alt=""
          width={32}
          height={32}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.22,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
