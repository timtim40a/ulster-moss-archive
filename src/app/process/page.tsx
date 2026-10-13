import { fullPhoto } from "@/lib/images";
import styles from "./page.module.css";

export default function Process() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.heading} display-lg`}>Process / Reconstruction</h1>

      <section className={styles.row}>
        <figure className={styles.image}>
          <img src={fullPhoto("IMG_9270-2.jpg")} alt="Placeholder -- process photo" />
        </figure>
        <div className={styles.text}>
          <h2 className={`${styles.stepTitle} display-md`}>Recovery</h2>
          <p className="body">
            Placeholder copy. Each piece begins as it was found -- unwashed, unsorted,
            photographed in place before anything is touched. This first stage is about
            documentation, not restoration.
          </p>
          <p className="body">
            Placeholder copy. Sample text describing the recovery stage of the process in
            more detail, to be replaced later.
          </p>
        </div>
      </section>

      <section className={`${styles.row} ${styles.rowReverse}`}>
        <figure className={styles.image}>
          <img src={fullPhoto("IMG_9298.jpg")} alt="Placeholder -- process photo" />
        </figure>
        <div className={styles.text}>
          <h2 className={`${styles.stepTitle} display-md`}>Cleaning</h2>
          <p className="body">
            Placeholder copy. Cleaning is done by hand, under magnification, with the
            smallest tools that will do the job. The aim is to reveal what is already
            there, not to add anything back.
          </p>
          <p className="body">
            Placeholder copy. Sample text describing the cleaning stage of the process in
            more detail, to be replaced later.
          </p>
        </div>
      </section>

      <section className={styles.row}>
        <figure className={styles.image}>
          <img src={fullPhoto("IMG_9323.jpg")} alt="Placeholder -- process photo" />
        </figure>
        <div className={styles.text}>
          <h2 className={`${styles.stepTitle} display-md`}>Reconstruction</h2>
          <p className="body">
            Placeholder copy. Where fragments belong together, they are set only as
            far as the evidence allows -- visible joins are left visible, and gaps are
            left as gaps.
          </p>
          <p className="body">
            Placeholder copy. Sample text describing the reconstruction stage of the
            process in more detail, to be replaced later.
          </p>
        </div>
      </section>
    </main>
  );
}
