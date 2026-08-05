export type Certification = {
  title: string;
  issuer: string;
  year: string;
  href: string;
};

export const certifications: Certification[] = [
  {
    title: "UI Engineering 101 for Designers",
    issuer: "Maven",
    year: "2025",
    href: "https://maven.com/certificate/CaWiZmbb",
  },
  {
    title: "Animations on the Web",
    issuer: "Emil Kowalski",
    year: "2024",
    href: "https://animations.dev/certificate/93b13cfd-2d9d-41d8-a9ff-3429d3d98245",
  },
  {
    title: "Joy of React & CSS for JS",
    issuer: "Josh W. Comeau",
    year: "2024",
    href: "https://courses.joshwcomeau.com/certificate/65b3d009c5f3759cf1b274f5",
  },
  {
    title: "Fullstack JavaScript Techdegree",
    issuer: "Team Treehouse",
    year: "2022",
    href: "https://www.credential.net/1aca2859-d1ab-419e-a27d-71542e4dd3c9#acc.fMpks0Rv",
  },
];
