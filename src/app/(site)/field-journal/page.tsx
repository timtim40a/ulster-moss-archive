import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { GeoMap, type GeoMapPoint } from "@/components/GeoMap/GeoMap";
import { fullPhoto, journalImage } from "@/lib/images";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { JOURNAL_ENTRIES_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

const ENTRIES_PER_PAGE = 2;

// Photos show at 150-160px wide; this covers high-density screens.
const IMAGE_WIDTH = 640;

interface SanityJournalEntry {
    _id: string;
    /** YYYY-MM-DD */
    date: string;
    conditions: string | null;
    body: string[] | null;
    images: { _key: string; assetId: string; width: number; height: number; alt: string | null; caption: string | null }[] | null;
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

/** "2026-03-14" + "low tide, overcast" -> "14 March -- low tide, overcast" */
function entryHeading(date: string, conditions: string | null): string {
    const [, month, day] = date.split("-").map(Number);
    const dayMonth = `${day} ${MONTHS[month - 1]}`;
    return conditions ? `${dayMonth} -- ${conditions}` : dayMonth;
}

/*
 * The original hardcoded entries, no longer used: the journal is managed in
 * Sanity now. Kept only until the hardcoded content is removed, so this
 * change can be reverted on its own.
 */
interface JournalEntry {
    id: string;
    date: string;
    paragraphs: string[];
    photo: { src: string; alt: string; caption: string };
    /** Which margin the photo is pinned to. */
    photoSide: "left" | "right";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENTRIES: JournalEntry[] = [
    {
        id: "entry-1",
        date: "14 March -- low tide, overcast",
        paragraphs: [
            "Placeholder copy. Went out before the tide turned, following the line where the moss gives way to bare rock. Found the first fragment wedged under a shelf of stone, half-covered by a mat of bladderwrack. It took the better part of an hour to work it free without breaking the surrounding growth.",
            "Placeholder copy. The surface is smoother than I expected -- worn in a way that suggests long tidal action rather than a single impact. No tool marks visible under the hand lens. Logged its position and photographed it in place before lifting it.",
        ],
        photo: { src: journalImage("2.png"), alt: "Placeholder -- journal sketch", caption: "field sketch, entry 1" },
        photoSide: "right",
    },
    {
        id: "entry-2",
        date: "22 March -- clear, strong wind",
        paragraphs: [
            "Placeholder copy. Returned to the same stretch with the full kit this time. Wind made the fine brushwork difficult, so most of the cleaning was done back at the workbench. Photographed the surrounding context before anything was disturbed -- the moss cover here is unusually dense for this part of the shore.",
            "Placeholder copy. A second, smaller fragment turned up roughly four metres from the first, at a similar depth. Possible they are related, though the materials differ enough that I am not yet confident in that reading.",
        ],
        photo: { src: fullPhoto("IMG_9258.jpg"), alt: "Placeholder -- field photo", caption: "in situ, second find" },
        photoSide: "left",
    },
    {
        id: "entry-3",
        date: "2 April -- rain, cut short",
        paragraphs: [
            "Placeholder copy. Weather cut the survey short, but not before mapping out the rest of the immediate area with the tape and compass. The notes from today are rougher than I would like -- transcribed properly once home, with the sketches redrawn from memory where the rain had made the field notebook illegible.",
            "Placeholder copy. Still unclear whether this is a single dispersal event or an accumulation over a much longer period. The next visit should focus on depth measurements rather than further collection.",
        ],
        photo: { src: journalImage("мала16.png"), alt: "Placeholder -- journal sketch", caption: "rough map, redrawn" },
        photoSide: "right",
    },
    {
        id: "entry-4",
        date: "9 April -- calm",
        paragraphs: [
            "Placeholder copy. A quieter visit. Spent most of the time on measurement rather than collection, which felt like the right call after the last entry. Depth readings are logged separately and will be cross-referenced with the site map once the Archive entry is drafted.",
            "Placeholder copy. Closing thought for the week: the pattern here resists a tidy explanation, and that is probably fine for now.",
        ],
        photo: { src: journalImage("приклад.png"), alt: "Placeholder -- journal sketch", caption: "depth notes, week 4" },
        photoSide: "left",
    },
];

// Placeholder coordinates around the Ulster coast -- the client will send real ones.
const MAP_POINTS: GeoMapPoint[] = [
    { id: "sheephaven", label: "Sheephaven Bay", lat: 55.17, lng: -7.88, entryId: "entry-1" },
    { id: "maghera", label: "Maghera Strand", lat: 54.85, lng: -8.43, entryId: "entry-2" },
    { id: "lough-neagh", label: "Lough Neagh shore", lat: 54.6, lng: -6.42, entryId: "entry-3" },
    { id: "ards", label: "Ards Peninsula", lat: 54.45, lng: -5.55, entryId: "entry-4" },
];

const pageHref = (page: number) => (page === 1 ? "/field-journal" : `/field-journal?page=${page}`);

export default async function FieldJournal({ searchParams }: PageProps<"/field-journal">) {
    const allEntries =
        (await sanityFetch<SanityJournalEntry[] | null>({ query: JOURNAL_ENTRIES_QUERY, tags: ["journalEntry"] })) ?? [];
    const pageCount = Math.max(1, Math.ceil(allEntries.length / ENTRIES_PER_PAGE));

    /** Links to an entry on whichever page holds it; to the first page if the entry no longer exists. */
    const entryHref = (entryId: string): string => {
        const index = allEntries.findIndex((entry) => entry._id === entryId);
        if (index === -1) return pageHref(1);
        return `${pageHref(Math.floor(index / ENTRIES_PER_PAGE) + 1)}#${entryId}`;
    };

    const requested = Number((await searchParams).page);
    const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1;
    const start = (page - 1) * ENTRIES_PER_PAGE;
    const entries = allEntries.slice(start, start + ENTRIES_PER_PAGE);

    return (
        <main className={styles.journal}>
            {/* Desktop: a sticky left column. Mobile: moved below the entries. */}
            <aside className={styles.mapColumn} aria-label="Map of find sites">
                <GeoMap
                    points={MAP_POINTS}
                    entryHref={entryHref}
                    activeEntryIds={entries.map((entry) => entry._id)}
                    className={styles.map}
                />
            </aside>

            <div className={styles.entries}>
                {entries.map((entry, i) => {
                    const paragraphs = entry.body ?? [];
                    const images = entry.images ?? [];

                    // Image k floats beside paragraph k, so several images run down the
                    // entry; sides alternate, starting on the right for every other entry.
                    const figure = (k: number) => {
                        const image = images[k];
                        const left = (start + i + k) % 2 === 1;
                        return (
                            <figure
                                key={image._key}
                                className={`${styles.entryPhoto} ${left ? styles.entryPhotoLeft : ""}`}
                            >
                                <Image
                                    src={imageUrl(image.assetId, IMAGE_WIDTH)}
                                    alt={image.alt ?? ""}
                                    width={image.width}
                                    height={image.height}
                                    sizes="160px"
                                />
                                {image.caption && (
                                    <figcaption className={`${styles.entryCaption} caption`}>{image.caption}</figcaption>
                                )}
                            </figure>
                        );
                    };

                    return (
                        <section key={entry._id} id={entry._id} className={styles.entry}>
                            <span className={`${styles.entryDate} eyebrow`}>
                                {entryHeading(entry.date, entry.conditions)}
                            </span>
                            {paragraphs.map((paragraph, k) => (
                                <Fragment key={k}>
                                    {k < images.length && figure(k)}
                                    <p className="body">{paragraph}</p>
                                </Fragment>
                            ))}
                            {/* Images beyond the number of paragraphs follow the text. */}
                            {images.slice(paragraphs.length).map((_, k) => figure(paragraphs.length + k))}
                        </section>
                    );
                })}

                <nav className={`${styles.pager} nav`} aria-label="Journal pages">
                    {page > 1 && (
                        <Link className={styles.pagerLink} href={pageHref(page - 1)}>
                            Previous
                        </Link>
                    )}
                    {page < pageCount && (
                        <Link className={`${styles.pagerLink} ${styles.pagerNext}`} href={pageHref(page + 1)}>
                            Next
                        </Link>
                    )}
                </nav>
            </div>
        </main>
    );
}
