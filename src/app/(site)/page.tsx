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
                                sizes="141vw"
                            />
                        </div>
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

            <section className={`${styles.section} ${styles.landscape} ${styles.studio}`} aria-label={quoteLabel}>
                <div className={styles.stage}>
                    <div className={styles.studioPhoto}>
                        <div className={styles.studioPhotoPlate}>
                            <HomeImage
                                src="/HomePhotos/3.png"
                                alt="Hands shaping a plaster mirror frame on a wooden worktable, beside specimen sketches A and B"
                                sizes="59vw"
                            />
                        </div>
                    </div>
                    <div className={styles.studioMap}>
                        <HomeImage
                            src={journalImage("малі10.png")}
                            alt="Hand-drawn map of the route from Lough Sladdamore to Sheephaven Bay"
                            sizes="12vw"
                        />
                    </div>
                    <div className={styles.studioNotes}>
                        <HomeImage
                            src={journalImage("малі8.png")}
                            alt="Field notes: intertidal sand texture, marram dune vegetation, and a map of Co. Donegal marking site MGH-01"
                            sizes="15vw"
                        />
                    </div>
                    <div className={styles.studioEtching}>
                        <div className={styles.studioEtchingPlate}>
                            <HomeImage
                                src={journalImage("малі6.png")}
                                alt="Pencil etching of coastal cliffs and sea caves, viewed north-east from the dune ridge at Maghera Strand, Co. Donegal"
                                sizes="33vw"
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
