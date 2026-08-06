/** Centered OG card inspired by ik-montage.de — dark field, grain, title + tracked brand. */
export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogGrainDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)}`;

const typeface =
  'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif';

function titleFontSize(title: string) {
  if (title.length > 60) return 48;
  if (title.length > 42) return 56;
  if (title.length > 28) return 68;
  if (title.length > 16) return 84;
  return 104;
}

export function OgFrame({
  title,
  brand = "GETOAR.DEV",
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
        position: "relative",
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: typeface,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "radial-gradient(ellipse 70% 65% at 50% 50%, #161616 0%, #0a0a0a 55%, #050505 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "radial-gradient(ellipse 90% 80% at 80% 40%, rgba(255,255,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ogGrainDataUri}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.16,
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 80px",
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: size,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "#ffffff",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.42em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.92)",
            paddingLeft: "0.42em",
          }}
        >
          {brand}
        </div>
      </div>
    </div>
  );
}
