import { archiveImage } from "@/lib/images";
import styles from "./page.module.css";

const ITEMS = [
  { file: "01-intertidal-discovery-zone.png", code: "UMA / 01", title: "Intertidal Discovery Zone" },
  { file: "02-specimen-study-uma-02.png", code: "UMA / 02", title: "Specimen Study, UMA-02" },
  { file: "03-ecological-context.png", code: "UMA / 03", title: "Ecological Context" },
  { file: "04-traces-of-presence.png", code: "UMA / 04", title: "Traces of Presence" },
  { file: "05-maghera-strand-donegal-coast.png", code: "UMA / 05", title: "Maghera Strand, Donegal Coast" },
  { file: "06-ards-forest-park-marine-trail.png", code: "UMA / 06", title: "Ards Forest Park, Marine Trail" },
  { file: "07-glenveagh-woodland-correspondence.png", code: "UMA / 07", title: "Glenveagh Woodland Correspondence" },
  { file: "08-donegal-field-index.png", code: "UMA / 08", title: "Donegal Field Index" },
];

export default function UlsterArchive() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.heading} display-lg`}>Ulster Archive</h1>
      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <figure className={styles.item} key={item.file}>
            <div className={styles.frame}>
              <img src={archiveImage(item.file)} alt={item.title} />
            </div>
            <figcaption>
              <span className={`${styles.code} eyebrow`}>{item.code}</span>
              <span className={`${styles.title} display-sm`}>{item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
