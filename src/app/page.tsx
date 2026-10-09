import { HomeImage } from "@/components/home/HomeImage";
import { journalImage } from "@/lib/images";
import styles from "./page.module.css";

// Web adaptation of the three-page "Ulster Moss & Artefacts" PDF: one section per page.
export default function Home() {
    return (
        <main className={styles.main}>
            <section className={`${styles.section} ${styles.portrait}`} aria-label="Traces of Presence around...">
                <div className={styles.stage}>
                    <div className={styles.tracesCollage}>
                        <HomeImage
                            src="/HomePhotos/1.png"
                            alt="Circular mirror framed by white biomorphic fragments and moss, set among barnacled coastal rocks"
                            sizes="159vw"
                            preload
                            className={styles.shadow}
                        />
                    </div>
                    <div className={styles.tracesMap}>
                        <HomeImage
                            src={journalImage("малі10.png")}
                            alt="Hand-drawn map of the route from Lough Sladdamore to Sheephaven Bay"
                            sizes="23vw"
                        />
                    </div>
                    <div className={styles.tracesScale}>
                        <HomeImage src={journalImage("мала21.png")} alt="" sizes="23vw" />
                    </div>
                </div>

                <h1 className={styles.tracesTitle}>Traces of Presence around...</h1>
                <p className={`${styles.tracesText} ${styles.tracesFirst}`}>
                    Among the rocks, I saw what looked like a whitish bone about twenty centimetres long. At
                    least, that was what I thought until I came closer. No, it was not a bone. Something
                    twisted... a white horn? I picked the thing up. It looked like...
                </p>
                <p className={`${styles.tracesText} ${styles.tracesSecond}`}>
                    It looked like nothing I had ever seen. It resembled an oddly shaped ceramic piece or a
                    fragment of white limestone, polished in places. Somehow, the object was warm, although it
                    had been lying in the shade. Up close, I would have said it was part of some organism whose
                    anatomy had no place in the natural world as we know it.
                    <br />
                    I raised the object, holding it against the sun. For a moment, its edges became almost
                    translucent. Then I felt a faint vibration in my palms.
                </p>
            </section>
        </main>
    );
}
