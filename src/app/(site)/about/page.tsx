import styles from "./page.module.css";

export default function AboutTheArtist() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.heading} display-lg`}>About the Artist</h1>
      <p className="body">
        Placeholder copy. A short biography goes here -- where the artist works, how long
        Ulster Moss &amp; Artefacts has been underway, and what first drew them to the
        practice of collecting and recording along this stretch of coast.
      </p>
      <p className="body">
        Placeholder copy. A paragraph on method and materials: how pieces are found,
        documented, and eventually either reconstructed or left as they are. This is also
        a reasonable place to mention training, past exhibitions, or residencies, once
        that information is available.
      </p>
      <p className="body">
        Placeholder copy. A closing paragraph on what the archive is for -- who it serves,
        and what the artist hopes a visitor takes from it.
      </p>
    </main>
  );
}
