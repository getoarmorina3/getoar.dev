/**
 * Quiet career path — company first, titles only, no project write-ups.
 * Multiple roles under one company read as a promotion path.
 */
export type WorkRole = {
  title: string;
  /** Role span when it differs from the company span (promotions). */
  span?: string;
  start: string;
  end: string;
};

export type WorkEntry = {
  company: string;
  /** Overall time at the company */
  span: string;
  start: string;
  end: string;
  roles: WorkRole[];
};

export const pathIntro = [
  "Over the years I have had the privilege of working with talented teams and great companies, on everything from focused product tools to larger applications.",
  "What follows is a short outline of that path.",
] as const;

export const work: WorkEntry[] = [
  {
    company: "AMARQUEZ",
    span: "2026 – Present",
    start: "2026-07",
    end: "present",
    roles: [
      {
        title: "Web Specialist",
        start: "2026-07",
        end: "present",
      },
    ],
  },
  {
    company: "Evergreen Strategic Systems",
    span: "2026",
    start: "2026-05",
    end: "2026-07",
    roles: [
      {
        title: "Web Developer",
        start: "2026-05",
        end: "2026-07",
      },
    ],
  },
  {
    company: "Lawnline Marketing",
    span: "2024 – 2026",
    start: "2024-08",
    end: "2026-05",
    roles: [
      {
        title: "Full Stack Engineer",
        start: "2024-08",
        end: "2026-05",
      },
    ],
  },
  {
    company: "Varitech Systems",
    span: "2025",
    start: "2025-07",
    end: "2025-09",
    roles: [
      {
        title: "Software Engineer",
        start: "2025-07",
        end: "2025-09",
      },
    ],
  },
  {
    company: "Tree Care Marketing Solutions",
    span: "2023 – 2024",
    start: "2023-02",
    end: "2024-07",
    roles: [
      {
        title: "Automation Lead",
        span: "2024",
        start: "2024-02",
        end: "2024-07",
      },
      {
        title: "Web Developer",
        span: "2023 – 2024",
        start: "2023-02",
        end: "2024-07",
      },
    ],
  },
  {
    company: "Forgeway",
    span: "2022 – 2023",
    start: "2022-03",
    end: "2023-01",
    roles: [
      {
        title: "Web Developer",
        start: "2022-03",
        end: "2023-01",
      },
    ],
  },
  {
    company: "Staxon Digital",
    span: "2020 – 2022",
    start: "2020-01",
    end: "2022-02",
    roles: [
      {
        title: "Web Developer",
        start: "2020-01",
        end: "2022-02",
      },
    ],
  },
];
