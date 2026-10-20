import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { GeoMap, type GeoMapPoint } from "@/components/GeoMap/GeoMap";
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

// The client's find sites, numbered on the map in this order; a label adds a
// name beside the number. Not linked to entries yet: give a point an entryId
// to make it a link.
const MAP_POINTS: GeoMapPoint[] = [
    { id: "site-1", label: "Maghera Strand", lat: 54.7609, lng: -8.4443 },
    { id: "site-2", lat: 54.6277, lng: -8.6851 },
    { id: "site-3", label: "Sheephaven Bay", lat: 55.158, lng: -7.8925 },
    { id: "site-4", lat: 55.0567, lng: -7.9464 },
    { id: "site-5", label: "Malin Head", lat: 55.3818, lng: -7.3734 },
    { id: "site-6", lat: 55.0189, lng: -8.124 },
    { id: "site-7", lat: 55.0176, lng: -6.107 },
    { id: "site-8", lat: 54.4883, lng: -6.5986 },
    { id: "site-9", lat: 54.2585, lng: -7.8131 },
    { id: "site-10", lat: 54.0998, lng: -6.2088 },
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
