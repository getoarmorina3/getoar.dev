import { CafeBooth } from "@/components/cafe-booth";
import { site } from "@/content/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>getoar</h1>

      <div className={styles.copy}>
        {site.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <CafeBooth />

      <footer className={styles.footer}>
        <a href={`mailto:${site.email}`} className={styles.sayHi}>
          say hi
        </a>
        <p className={styles.links}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span aria-hidden="true">·</span>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
        </p>
      </footer>
    </main>
  );
}
