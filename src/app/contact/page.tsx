import { ContactForm } from "@/components/ContactForm/ContactForm";
import styles from "./page.module.css";

export default function ContactTheArchive() {
  return (
    <main className={styles.main}>
      <div className={styles.info}>
        <h1 className={`${styles.heading} display-lg`}>Contact the Archive</h1>
        <p className="body">
          Placeholder copy. Enquiries about specific objects, provenance, loan requests,
          or the field journal are all welcome -- use the form, or reach out directly.
        </p>
        <ul className={styles.infoList}>
          <li>
            <span className={`${styles.infoLabel} eyebrow`}>Email</span>
            <span className={`${styles.infoValue} body`}>archive@ulstermoss.example</span>
          </li>
          <li>
            <span className={`${styles.infoLabel} eyebrow`}>Location</span>
            <span className={`${styles.infoValue} body`}>Donegal coast, Ireland</span>
          </li>
          <li>
            <span className={`${styles.infoLabel} eyebrow`}>Hours</span>
            <span className={`${styles.infoValue} body`}>By appointment only</span>
          </li>
        </ul>
      </div>
      <ContactForm
        heading="Send an enquiry"
        blurb="Enquiries about specific objects, provenance, or loan requests."
      />
    </main>
  );
}
