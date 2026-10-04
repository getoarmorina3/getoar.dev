/**
 * 10×12 pixel maps. x = ink, o = background (face fill), s = soft ink.
 */
const maps = {
  getoar: [
    "..xxxxxx..",
    ".xxxxxxxx.",
    ".xxoooxxx.",
    ".xoooooox.",
    ".xoxooxox.",
    ".xoooooox.",
    ".xooxxoox.",
    "..xoooox..",
    "...xxxx...",
    ".xxxxxxxx.",
    "xxxxoxoxxx",
    "xxxxoxoxxx",
  ],
  kid: [
    "..xxxxxx..",
    ".xxxxxxxx.",
    "xxxxxxxxxx",
    "sxooooooxs",
    "sxoxooxoxs",
    ".xoooooox.",
    "sxoxxxxox.",
    ".sxoooox..",
    "...xxxx...",
    ".ssssssss.",
    "ssssssssss",
    "ssssssssss",
  ],
  dad: [
    "...xxxx...",
    "..xoooox..",
    ".xxooooxx.",
    ".xoooooox.",
    ".xoxooxox.",
    ".xoooooox.",
    ".xoxxxxox.",
    "..xoooox..",
    "...xxxx...",
    ".xxxoxxxx.",
    "xxxxoxxxxx",
    "xxxxoxxxxx",
  ],
  cat: [
    "..........",
    "..........",
    ".x......x.",
    ".xx....xx.",
    ".xxxxxxxx.",
    ".xoxxxxox.",
    ".xxxxxxxx.",
    "..xxooxx..",
    "..xxxxxx..",
    "..xxxxxx.x",
    "..xxxxxx.x",
    "..xxxxxxxx",
  ],
} as const;

export type SpriteId = keyof typeof maps;

const fills = {
  x: "var(--ink)",
  o: "var(--bg)",
  s: "var(--ink-soft)",
} as const;

export function Sprite({
  id,
  size = 40,
  className,
}: {
  id: SpriteId;
  size?: number;
  className?: string;
}) {
  const rows = maps[id];
  return (
    <svg
      viewBox="0 0 10 12"
      width={size}
      height={(size * 12) / 10}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1.02}
              height={1.02}
              fill={fills[cell as keyof typeof fills]}
            />
          ),
        ),
      )}
    </svg>
  );
}
