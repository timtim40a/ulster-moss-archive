import { Fragment } from "react";
import { HomeImage } from "@/components/home/HomeImage";
import { fullPhoto, journalImage } from "@/lib/images";
import { sanityFetch } from "@/sanity/fetch";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

interface HomePage {
    heroTitle: string | null;
    storyIntro: string | null;
    storyContinued: string[] | null;
    hashtags: string[] | null;
    projectTitle: string | null;
    journalHeading: string | null;
    journalExcerptTitle: string | null;
    journalExcerpt: string[] | null;
    quote: string | null;
    description: string[] | null;
}

/*
 * The original hardcoded text, no longer used: the Home text is managed in
 * Sanity now. Kept only until the hardcoded text is removed, so this change
 * can be reverted on its own.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HOME_TEXT: HomePage = {
    heroTitle: "Traces of Presence around...",
    storyIntro:
        "Among the rocks, I saw what looked like a whitish bone about twenty centimetres long. At least, that was what I thought until I came closer. No, it was not a bone. Something twisted... a white horn? I picked the thing up. It looked like...",
    storyContinued: [
        "It looked like nothing I had ever seen. It resembled an oddly shaped ceramic piece or a fragment of white limestone, polished in places. Somehow, the object was warm, although it had been lying in the shade. Up close, I would have said it was part of some organism whose anatomy had no place in the natural world as we know it.",
        "I raised the object, holding it against the sun. For a moment, its edges became almost translucent. Then I felt a faint vibration in my palms.",
    ],
    hashtags: ["SculpturalMirror", "BiomorphicArt", "IrishArt"],
    projectTitle: "Ulster Moss&Artefacts",
    journalHeading: "Last from the Journal:",
    journalExcerptTitle: "Entry, September 11...",
    journalExcerpt: [
        "“I looked around. It felt as though someone were watching me.",
        "This particular artefact bore traces of moss beginning to grow, or perhaps seaweed. How long has it been here? I took out my phone to photograph its glow, but for some reason the camera could not focus on the object...”",
    ],
    quote: "“I am finding these objects more and more often. Or are they finding me?”",
    description: [
        "The textures themselves - objects - belong to a rare breed of unknown, probably unearthly origin. Its fragments were left in Ireland long before the emergence of our civilisation or its coming in now; we can’t answer yet. Artefacts are still found among forests, bogs and rocky landscapes. Their surface resembles at once an old bone, a fragment of ancient sculpture and the biological remains of creatures that never existed in our world.",
        "The moss growing on the artefacts may not just be part of the local nature, but evidence of their slow awakening. I collect the found fragments, reconstruct them and combine them with mirrors. The mirror surface here functions as a portal: it releases the energy accumulated in the artefacts and directs it to alternative worlds - perhaps where they once came to Ireland.",
    ],
};

/** Lines of one block, separated by <br /> as in the original markup. */
function withLineBreaks(lines: string[]) {
    return lines.map((line, i) => (
        <Fragment key={i}>
            {i > 0 && <br />}
            {line}
        </Fragment>
    ));
}

// Web adaptation of the three-page "Ulster Moss & Artefacts" PDF: one section per page.
export default async function Home() {
    const home = await sanityFetch<HomePage | null>({ query: HOME_PAGE_QUERY, tags: ["homePage"] });

    const storyContinued = home?.storyContinued ?? [];
    // Editors type the word only; tolerate a typed "#" anyway.
    const hashtags = (home?.hashtags ?? []).map((tag) => tag.replace(/^#+/, "").trim()).filter(Boolean);
    const journalExcerpt = home?.journalExcerpt ?? [];
    const description = home?.description ?? [];
    // The third section is named by its quote, without the quotation marks.
    const quoteLabel = home?.quote?.replace(/[“”"]/g, "").trim() || undefined;

    return (
        <main className={styles.homeWrapper}>
            <section className={`${styles.section} ${styles.portrait}`} aria-label={home?.heroTitle || undefined}>
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
                    <div className={styles.tracesScale}>
                        <HomeImage src={journalImage("мала21.png")} alt="" sizes="23vw" />
                    </div>
                </div>

                {home?.heroTitle && <h1 className={styles.tracesTitle}>{home.heroTitle}</h1>}
                {home?.storyIntro && (
                    <p className={`${styles.tracesText} ${styles.tracesFirst}`}>{home.storyIntro}</p>
                )}
                {storyContinued.length > 0 && (
                    <p className={`${styles.tracesText} ${styles.tracesSecond}`}>{withLineBreaks(storyContinued)}</p>
                )}
            </section>

            <section className={`${styles.section} ${styles.landscape}`} aria-label={home?.projectTitle || undefined}>
                <div className={styles.stage}>
                    <div className={styles.ulsterBase}>
                        <div className={styles.ulsterBasePlate}>
                            <HomeImage
                                src={fullPhoto("IMG_9253-2.jpg")}
                                alt="Large round mirror held by white sculptural fragments and moss against dark wet rock"
                                sizes="94vw"
                            />
                        </div>
                    </div>
                    <div className={styles.ulsterInset}>
                        <div className={styles.ulsterInsetPlate}>
                            <HomeImage
                                src="/HomePhotos/2.png"
                                alt="Small sculptural mirror leaning against a weathered boulder among coastal rocks"
                                sizes="114vw"
                            />
                        </div>
                    </div>
                    <div className={styles.ulsterScale}>
                        <HomeImage src={journalImage("мала21.png")} alt="" sizes="12vw" />
                    </div>
                </div>

                {hashtags.length > 0 && (
                    <ul className={styles.ulsterTags}>
                        {hashtags.map((tag, i) => (
                            <li key={i}>#{tag}</li>
                        ))}
                    </ul>
                )}
                {home?.projectTitle && <h2 className={styles.ulsterTitle}>{home.projectTitle}</h2>}
                <div className={styles.ulsterJournal}>
                    {home?.journalHeading && <h3 className={styles.ulsterJournalHeading}>{home.journalHeading}</h3>}
                    {(home?.journalExcerptTitle || journalExcerpt.length > 0) && (
                        <p className={styles.ulsterJournalEntry}>
                            {home?.journalExcerptTitle && <strong>{home.journalExcerptTitle}</strong>}
                            {home?.journalExcerptTitle && journalExcerpt.length > 0 && <br />}
                            {withLineBreaks(journalExcerpt)}
                        </p>
                    )}
                </div>
            </section>

            <section className={`${styles.section} ${styles.landscape}`} aria-label={quoteLabel}>
                <div className={styles.stage}>
                    <div className={styles.studioPhoto}>
                        <div className={styles.studioPhotoPlate}>
                            <HomeImage
                                src="/HomePhotos/3.png"
                                alt="Hands shaping a plaster mirror frame on a wooden worktable, beside specimen sketches A, B and F01"
                                sizes="105vw"
                            />
                        </div>
                    </div>
                    <div className={styles.studioEtching}>
                        <div className={styles.studioEtchingPlate}>
                            <HomeImage
                                src="/HomePhotos/3.png"
                                alt="Pencil etching of coastal cliffs and sea caves, viewed north-east from the dune ridge at Maghera Strand, Co. Donegal"
                                sizes="72vw"
                            />
                        </div>
                    </div>
                </div>

                {home?.quote && <blockquote className={styles.studioQuote}>{home.quote}</blockquote>}
                {description.length > 0 && (
                    <div className={styles.studioText}>
                        {description.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
