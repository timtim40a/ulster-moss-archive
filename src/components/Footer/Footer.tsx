import styles from "./Footer.module.css";

export interface FooterProps {
  name?: string;
  tagline?: string;
}

/** A minimal closing bar. The contact form lives on its own page now, not here. */
export function Footer({ name = "Ulster Moss & Artefacts", tagline }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={`${styles.name} eyebrow`}>{name}</p>
      {tagline && <p className={`${styles.tagline} eyebrow`}>{tagline}</p>}
    </footer>
  );
}
