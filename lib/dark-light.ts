/** Soft top-right light like ik-montage — matte charcoal, deep black left. */
export const darkLightGradient =
  "radial-gradient(ellipse 110% 95% at 92% 28%, #4a4a4a 0%, #2a2a2a 22%, #121212 48%, #050505 72%, #000000 100%)";

export const darkLightGradientOg =
  "radial-gradient(ellipse 95% 85% at 88% 30%, #3f3f3f 0%, #242424 24%, #101010 50%, #050505 74%, #000000 100%)";

/** Fine film grain for the matte field. */
export const darkLightGrainDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)}`;
