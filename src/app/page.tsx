import { HomeImage } from "@/components/home/HomeImage";
import { fullPhoto, journalImage } from "@/lib/images";
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
                            sizes="(min-width: 1440px) 2290px, 159vw"
                            preload
                            className={styles.shadow}
                        />
                    </div>
                    <div className={styles.tracesMap}>
                        <HomeImage
                            src={journalImage("малі10.png")}
                            alt="Hand-drawn map of the route from Lough Sladdamore to Sheephaven Bay"
                            sizes="(min-width: 1440px) 331px, 23vw"
                        />
                    </div>
                    <div className={styles.tracesScale}>
                        <HomeImage src={journalImage("мала21.png")} alt="" sizes="(min-width: 1440px) 331px, 23vw" />
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

            <section className={`${styles.section} ${styles.landscape}`} aria-label="Ulster Moss&Artefacts">
                <div className={styles.stage}>
                    <div className={styles.ulsterBase}>
                        <div className={styles.ulsterBasePlate}>
                            <HomeImage
                                src={fullPhoto("IMG_9253-2.png")}
                                alt="Large round mirror held by white sculptural fragments and moss against dark wet rock"
                                sizes="(min-width: 1440px) 1354px, 94vw"
                            />
                        </div>
                    </div>
                    <div className={styles.ulsterInset}>
                        <div className={styles.ulsterInsetPlate}>
                            <HomeImage
                                src="/HomePhotos/2.png"
                                alt="Small sculptural mirror leaning against a weathered boulder among coastal rocks"
                                sizes="(min-width: 1440px) 1642px, 114vw"
                            />
                        </div>
                    </div>
                    <div className={styles.ulsterScale}>
                        <HomeImage src={journalImage("мала21.png")} alt="" sizes="(min-width: 1440px) 173px, 12vw" />
                    </div>
                </div>

                <ul className={styles.ulsterTags}>
                    <li>#SculpturalMirror</li>
                    <li>#BiomorphicArt</li>
                    <li>#IrishArt</li>
                </ul>
                <h2 className={styles.ulsterTitle}>Ulster Moss&amp;Artefacts</h2>
                <div className={styles.ulsterJournal}>
                    <h3 className={styles.ulsterJournalHeading}>Last from the Journal:</h3>
                    <p className={styles.ulsterJournalEntry}>
                        <strong>Entry, September 11...</strong>
                        <br />
                        “I looked around. It felt as though someone were watching me.
                        <br />
                        This particular artefact bore traces of moss beginning to grow, or perhaps seaweed. How
                        long has it been here? I took out my phone to photograph its glow, but for some reason the
                        camera could not focus on the object...”
                    </p>
                </div>
            </section>

            <section
                className={`${styles.section} ${styles.landscape}`}
                aria-label="I am finding these objects more and more often"
            >
                <div className={styles.stage}>
                    <div className={styles.studioPhoto}>
                        <div className={styles.studioPhotoPlate}>
                            <HomeImage
                                src="/HomePhotos/3.png"
                                alt="Hands shaping a plaster mirror frame on a wooden worktable, beside specimen sketches A, B and F01"
                                sizes="(min-width: 1440px) 1512px, 105vw"
                            />
                        </div>
                    </div>
                    <div className={styles.studioEtching}>
                        <div className={styles.studioEtchingPlate}>
                            <HomeImage
                                src="/HomePhotos/3.png"
                                alt="Pencil etching of coastal cliffs and sea caves, viewed north-east from the dune ridge at Maghera Strand, Co. Donegal"
                                sizes="(min-width: 1440px) 1037px, 72vw"
                            />
                        </div>
                    </div>
                </div>

                <blockquote className={styles.studioQuote}>
                    “I am finding these objects more and more often. Or are they finding me?”
                </blockquote>
                <div className={styles.studioText}>
                    <p>
                        The textures themselves - objects - belong to a rare breed of unknown, probably unearthly
                        origin. Its fragments were left in Ireland long before the emergence of our civilisation or
                        its coming in now; we can’t answer yet. Artefacts are still found among forests, bogs and
                        rocky landscapes. Their surface resembles at once an old bone, a fragment of ancient
                        sculpture and the biological remains of creatures that never existed in our world.
                    </p>
                    <p>
                        The moss growing on the artefacts may not just be part of the local nature, but evidence of
                        their slow awakening. I collect the found fragments, reconstruct them and combine them with
                        mirrors. The mirror surface here functions as a portal: it releases the energy accumulated
                        in the artefacts and directs it to alternative worlds - perhaps where they once came to
                        Ireland.
                    </p>
                </div>
            </section>
        </main>
    );
}
