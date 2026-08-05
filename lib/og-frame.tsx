/** Jobs-keynote field: void black, soft vignette, film grain. Text only. */
export const ogSize = {
  width: 1200,
  height: 630,
} as const;

/** Tiny fractal-noise tile — opacity keeps it atmospheric, not gritty. */
export const ogGrainDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)}`;

const typeface =
  'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif';

export function OgFrame({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  const titleSize =
    title.length > 56 ? 52 : title.length > 36 ? 64 : title.length > 22 ? 76 : 88;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#050505",
        color: "#f5f5f5",
        fontFamily: typeface,
      }}
    >
      {/* Soft radial wash — stage light, not a purple glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "radial-gradient(ellipse 80% 70% at 50% 42%, #1c1c1c 0%, #0c0c0c 52%, #050505 100%)",
        }}
      />

      {/* Warm edge falloff */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(165deg, rgba(255,255,255,0.04) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Grain */}
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
          opacity: 0.14,
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(245,245,245,0.48)",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              color: "#fafafa",
            }}
          >
            {title}
          </div>

          {footer ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
                color: "rgba(245,245,245,0.55)",
                maxWidth: 720,
              }}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
