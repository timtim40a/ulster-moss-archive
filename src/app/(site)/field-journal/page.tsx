import Link from "next/link";
import { GeoMap, type GeoMapPoint } from "@/components/GeoMap/GeoMap";
import { fullPhoto, journalImage } from "@/lib/images";
import styles from "./page.module.css";

const ENTRIES_PER_PAGE = 2;

interface JournalEntry {
    id: string;
    date: string;
    paragraphs: string[];
    photo: { src: string; alt: string; caption: string };
    /** Which margin the photo is pinned to. */
    photoSide: "left" | "right";
}

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

const PAGE_COUNT = Math.ceil(ENTRIES.length / ENTRIES_PER_PAGE);

const pageHref = (page: number) => (page === 1 ? "/field-journal" : `/field-journal?page=${page}`);

/** Links to an entry on whichever page holds it. */
function entryHref(entryId: string): string {
    const index = ENTRIES.findIndex((entry) => entry.id === entryId);
    return `${pageHref(Math.floor(index / ENTRIES_PER_PAGE) + 1)}#${entryId}`;
}

export default async function FieldJournal({ searchParams }: PageProps<"/field-journal">) {
    const requested = Number((await searchParams).page);
    const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), PAGE_COUNT) : 1;
    const entries = ENTRIES.slice((page - 1) * ENTRIES_PER_PAGE, page * ENTRIES_PER_PAGE);

    return (
        <main className={styles.journal}>
            {/* Desktop: a sticky left column. Mobile: moved below the entries. */}
            <aside className={styles.mapColumn} aria-label="Map of find sites">
                <GeoMap
                    points={MAP_POINTS}
                    entryHref={entryHref}
                    activeEntryIds={entries.map((entry) => entry.id)}
                    className={styles.map}
                />
            </aside>

            <div className={styles.entries}>
                {entries.map((entry) => (
                    <section key={entry.id} id={entry.id} className={styles.entry}>
                        <span className={`${styles.entryDate} eyebrow`}>{entry.date}</span>
                        {/* Floats beside the text it belongs to, on its own side. */}
                        <figure
                            className={`${styles.entryPhoto} ${entry.photoSide === "left" ? styles.entryPhotoLeft : ""}`}
                        >
                            <img src={entry.photo.src} alt={entry.photo.alt} />
                            <figcaption className={`${styles.entryCaption} caption`}>{entry.photo.caption}</figcaption>
                        </figure>
                        {entry.paragraphs.map((paragraph, j) => (
                            <p key={j} className="body">
                                {paragraph}
                            </p>
                        ))}
                    </section>
                ))}

                <nav className={`${styles.pager} nav`} aria-label="Journal pages">
                    {page > 1 && (
                        <Link className={styles.pagerLink} href={pageHref(page - 1)}>
                            Previous
                        </Link>
                    )}
                    {page < PAGE_COUNT && (
                        <Link className={`${styles.pagerLink} ${styles.pagerNext}`} href={pageHref(page + 1)}>
                            Next
                        </Link>
                    )}
                </nav>
            </div>
        </main>
    );
}
