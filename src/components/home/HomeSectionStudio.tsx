import { HomeImage } from "./HomeImage";
import frame from "./HomeSection.module.css";
import styles from "./HomeSectionStudio.module.css";

const STUDIO_PICTURE = "/HomePhotos/3.png";

// PDF page 3 (landscape): "I am finding these objects..."
export function HomeSectionStudio() {
    return (
        <section className={frame.landscape} aria-label="I am finding these objects">
            <div className={frame.stage}>
                {/* Left panel of the composite; the specimen sketches are part of the photo. */}
                <div className={styles.photo}>
                    <HomeImage
                        src={STUDIO_PICTURE}
                        alt="Hands shaping white plaster fragments around a circular mirror on a paint-stained wooden table, beside pencil specimen sketches A, B and F01 with their measurements"
                        sizes="59vw"
                        objectPosition="0% 50%"
                    />
                </div>

                {/* The same composite's etching, shown through a window at the PDF's slot. */}
                <div className={styles.etching}>
                    <div className={styles.etchingSheet}>
                        <HomeImage
                            src={STUDIO_PICTURE}
                            alt="Etching of sea cliffs and caves across a tidal beach, seen from a dune ridge at Maghera Strand, Co. Donegal"
                            sizes="62vw"
                        />
                    </div>
                </div>
            </div>

            <blockquote className={styles.quote}>
                “I am finding these objects more and more often. Or are they finding me?”
            </blockquote>

            <div className={styles.text}>
                <p className={styles.paragraph}>
                    The textures themselves - objects - belong to a rare breed of unknown,
                    probably unearthly origin. Its fragments were left in Ireland long before the
                    emergence of our civilisation or its coming in now; we can’t answer yet.
                    Artefacts are still found among forests, bogs and rocky landscapes. Their
                    surface resembles at once an old bone, a fragment of ancient sculpture and the
                    biological remains of creatures that never existed in our world.
                </p>
                <p className={styles.paragraph}>
                    The moss growing on the artefacts may not just be part of the local nature, but
                    evidence of their slow awakening. I collect the found fragments, reconstruct
                    them and combine them with mirrors. The mirror surface here functions as a
                    portal: it releases the energy accumulated in the artefacts and directs it to
                    alternative worlds - perhaps where they once came to Ireland.
                </p>
            </div>
        </section>
    );
}
