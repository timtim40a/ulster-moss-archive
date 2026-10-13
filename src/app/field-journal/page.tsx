import { fullPhoto, journalImage } from "@/lib/images";
import styles from "./page.module.css";

export default function FieldJournal() {
  return (
    <main className={styles.journal}>
      <section className={styles.entry}>
        <span className={`${styles.entryDate} eyebrow`}>14 March -- low tide, overcast</span>
        <p className="body">
          Placeholder copy. Went out before the tide turned, following the line where the
          moss gives way to bare rock. Found the first fragment wedged under a shelf of
          stone, half-covered by a mat of bladderwrack. It took the better part of an hour
          to work it free without breaking the surrounding growth.
        </p>
        <p className="body">
          Placeholder copy. The surface is smoother than I expected -- worn in a way that
          suggests long tidal action rather than a single impact. No tool marks visible
          under the hand lens. Logged its position and photographed it in place before
          lifting it.
        </p>
        <aside className={styles.marginPhoto}>
          <img src={journalImage("2.png")} alt="Placeholder -- journal sketch" />
          <span className={`${styles.marginCaption} caption`}>field sketch, entry 1</span>
        </aside>
      </section>

      <section className={styles.entry}>
        <span className={`${styles.entryDate} eyebrow`}>22 March -- clear, strong wind</span>
        <p className="body">
          Placeholder copy. Returned to the same stretch with the full kit this time.
          Wind made the fine brushwork difficult, so most of the cleaning was done back at
          the workbench. Photographed the surrounding context before anything was
          disturbed -- the moss cover here is unusually dense for this part of the shore.
        </p>
        <p className="body">
          Placeholder copy. A second, smaller fragment turned up roughly four metres from
          the first, at a similar depth. Possible they are related, though the materials
          differ enough that I am not yet confident in that reading.
        </p>
        <aside className={`${styles.marginPhoto} ${styles.marginPhotoLeft}`}>
          <img src={fullPhoto("IMG_9258.jpg")} alt="Placeholder -- field photo" />
          <span className={`${styles.marginCaption} caption`}>in situ, second find</span>
        </aside>
      </section>

      <section className={styles.entry}>
        <span className={`${styles.entryDate} eyebrow`}>2 April -- rain, cut short</span>
        <p className="body">
          Placeholder copy. Weather cut the survey short, but not before mapping out the
          rest of the immediate area with the tape and compass. The notes from today are
          rougher than I would like -- transcribed properly once home, with the sketches
          redrawn from memory where the rain had made the field notebook illegible.
        </p>
        <p className="body">
          Placeholder copy. Still unclear whether this is a single dispersal event or an
          accumulation over a much longer period. The next visit should focus on depth
          measurements rather than further collection.
        </p>
        <aside className={styles.marginPhoto}>
          <img src={journalImage("мала16.png")} alt="Placeholder -- journal sketch" />
          <span className={`${styles.marginCaption} caption`}>rough map, redrawn</span>
        </aside>
      </section>

      <section className={styles.entry}>
        <span className={`${styles.entryDate} eyebrow`}>9 April -- calm</span>
        <p className="body">
          Placeholder copy. A quieter visit. Spent most of the time on measurement rather
          than collection, which felt like the right call after the last entry. Depth
          readings are logged separately and will be cross-referenced with the site map
          once the Archive entry is drafted.
        </p>
        <p className="body">
          Placeholder copy. Closing thought for the week: the pattern here resists a tidy
          explanation, and that is probably fine for now.
        </p>
        <aside className={`${styles.marginPhoto} ${styles.marginPhotoLeft}`}>
          <img src={journalImage("приклад.png")} alt="Placeholder -- journal sketch" />
          <span className={`${styles.marginCaption} caption`}>depth notes, week 4</span>
        </aside>
      </section>
    </main>
  );
}
