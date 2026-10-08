import { HomeImage } from "./HomeImage";
import frame from "./HomeSection.module.css";
import styles from "./HomeSectionTraces.module.css";

// PDF page 1 (portrait): "Traces of Presence around..."
export function HomeSectionTraces() {
    return (
        <section className={frame.portrait} aria-label="Traces of Presence around">
            <div className={frame.stage}>
                <div className={styles.collage}>
                    <HomeImage
                        src="/HomePhotos/1.png"
                        alt="Circular mirror framed by white biomorphic fragments and moss, set among barnacled coastal rocks"
                        sizes="166vw"
                        preload
                    />
                </div>
            </div>

            <h1 className={styles.title}>Traces of Presence around...</h1>

            <p className={`${styles.text} ${styles.first}`}>
                Among the rocks, I saw what looked like a whitish bone about twenty centimetres
                long. At least, that was what I thought until I came closer. No, it was not a
                bone. Something twisted... a white horn? I picked the thing up. It looked
                like...
            </p>

            <p className={`${styles.text} ${styles.second}`}>
                It looked like nothing I had ever seen. It resembled an oddly shaped ceramic
                piece or a fragment of white limestone, polished in places. Somehow, the object
                was warm, although it had been lying in the shade. Up close, I would have said
                it was part of some organism whose anatomy had no place in the natural world as
                we know it.
                <br />
                I raised the object, holding it against the sun. For a moment, its edges became
                almost translucent. Then I felt a faint vibration in my palms.
            </p>
        </section>
    );
}
