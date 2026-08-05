/**
 * Quiet career path — privacy-safe, consistent titles.
 * No project details. LinkedIn holds the full record.
 */
export type WorkEntry = {
  company: string;
  /** Display title — keep consistent across roles. */
  role: string;
  start: string;
  end: string;
  /** Year span for the quiet list, e.g. "2024 – 2026" */
  span: string;
};

export const pathIntro = [
  "Over the years I have had the privilege of working with talented teams and great companies, on everything from focused product tools to larger applications.",
  "What follows is a short outline of that path.",
] as const;


export const work: WorkEntry[] = [
  {
    company: "AMARQUEZ",
    role: "Engineer",
    start: "2026-07",
    end: "present",
    span: "2026 – Present",
  },
  {
    company: "Lawnline Marketing",
    role: "Engineer",
    start: "2024-08",
    end: "2026-05",
    span: "2024 – 2026",
  },
  {
    company: "Tree Care Marketing Solutions",
    role: "Engineer",
    start: "2023-02",
    end: "2024-07",
    span: "2023 – 2024",
  },
  {
    company: "Forgeway",
    role: "Engineer",
    start: "2022-03",
    end: "2023-01",
    span: "2022 – 2023",
  },
  {
    company: "Staxon Digital",
    role: "Engineer",
    start: "2020-01",
    end: "2022-02",
    span: "2020 – 2022",
  },
];
