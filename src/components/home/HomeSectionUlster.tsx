import { HomeImage } from "./HomeImage";
import frame from "./HomeSection.module.css";
import styles from "./HomeSectionUlster.module.css";

// PDF page 2 (landscape): "Ulster Moss&Artefacts"
export function HomeSectionUlster() {
    return (
        <section className={frame.landscape} aria-label="Ulster Moss and Artefacts">
            <div className={frame.stage}>
                {/*
                 * One composite: inset photo + dark base photo, with the paper strip
                 * left transparent. Cropped so the inset's left edge sits at 8%.
                 */}
                <HomeImage
                    src="/HomePhotos/2.png"
                    alt="A small circular mirror wrapped in white biomorphic fragments leans against a weathered rock, beside a large moss-edged mirror set into dark, wet coastal rock"
                    sizes="100vw"
                    objectPosition="34.1% 50%"
                />
            </div>

            <ul className={styles.tags}>
                <li>#SculpturalMirror</li>
                <li>#BiomorphicArt</li>
                <li>#IrishArt</li>
            </ul>

            <h2 className={styles.title}>Ulster Moss&amp;Artefacts</h2>

            <div className={styles.journal}>
                <h3 className={styles.journalHeading}>Last from the Journal:</h3>
                <p className={styles.journalEntry}>
                    Entry, September 11...
                    <br />
                    “I looked around. It felt as though someone were watching me.
                    <br />
                    This particular artefact bore traces of moss beginning to grow, or perhaps
                    seaweed. How long has it been here? I took out my phone to photograph its
                    glow, but for some reason the camera could not focus on the object...”
                </p>
            </div>
        </section>
    );
}
