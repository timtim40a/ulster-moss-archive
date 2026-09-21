import type { Block, Rect } from "@/components/archive-sheet";
import { ArchiveSheet, ShuffleableSheet } from "@/components/archive-sheet";
import styles from "./page.module.css";

const blocks: Block[] = [
    {
        id: "focus-photo",
        kind: "photo",
        src: "/photos/photo-focus.jpg",
        alt: "Bog oak fragment, front face",
        caption: "found face-down, six cm below the surface",
        weight: 2,
        aspect: 1.3,
    },
    {
        id: "detail-sketch",
        kind: "photo",
        src: "/photos/photo-detail.jpg",
        alt: "Sketch of the worn surface",
        variant: "sketch",
        caption: "detail, worn surface",
        aspect: 1,
    },
    {
        id: "field-notes",
        kind: "table",
        title: "Field notes",
        rows: [
            ["Location", "54.6°N, 6.2°W"],
            ["Date found", "14 March 1987"],
            ["Material", "Bog oak"],
            ["Depth", "6 cm"],
        ],
        aspect: 1,
    },
    {
        id: "margin-note",
        kind: "text",
        heading: "Note",
        body: "Surface worn smooth; no visible tool marks. Origin unconfirmed -- possibly reworked from an earlier find.",
        tone: "note",
        aspect: 2.2,
    },
    {
        id: "specimen-set",
        kind: "specimens",
        title: "Associated specimens",
        items: [
            { src: "/photos/photo-detail.jpg", name: "Fragment A", latin: "n/a" },
            { src: "/photos/photo-plinth.jpg", name: "Fragment B", latin: "n/a" },
            { src: "/photos/photo-detail.jpg", name: "Fragment C", latin: "n/a" },
        ],
        weight: 1.5,
        aspect: 1.3,
    },
    {
        id: "site-map",
        kind: "map",
        src: "/photos/photo-plinth.jpg",
        alt: "Site map of Ulster Moss",
        title: "Site map",
        markers: [
            { x: 30, y: 40, label: "Fragment, Ulster Moss" },
            { x: 62, y: 58, label: "Vessel, partial" },
        ],
        scale: { max: 200, unit: "m", steps: 4 },
        caption: "surveyed grid, 1987",
        weight: 1.5,
        aspect: 1.6,
    },
    {
        id: "site-stamp",
        kind: "stamp",
        label: "UMA / SITE-01",
        note: "catalogued",
        aspect: 1,
    },
];

// Hand-made template: one Rect per block above, in order, tiling the
// default 12x8 grid exactly (no gaps, no overlaps -- but layout="manual"
// or a Rect[] template don't require that, it's just tidier here).
const template: Rect[] = [
    { col: 1, row: 1, colSpan: 6, rowSpan: 5 }, // focus-photo
    { col: 7, row: 1, colSpan: 3, rowSpan: 3 }, // detail-sketch
    { col: 10, row: 1, colSpan: 3, rowSpan: 3 }, // field-notes
    { col: 7, row: 4, colSpan: 6, rowSpan: 2 }, // margin-note
    { col: 1, row: 6, colSpan: 4, rowSpan: 3 }, // specimen-set
    { col: 5, row: 6, colSpan: 5, rowSpan: 3 }, // site-map
    { col: 10, row: 6, colSpan: 3, rowSpan: 3 }, // site-stamp
];

export default function ArchiveSheetDemo() {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Random layout (reroll to explore)</h1>
                <ShuffleableSheet
                    title="Ulster Moss Archive"
                    subtitle="Field record -- object group 01"
                    code="UMA / SITE-01"
                    blocks={blocks}
                    layout="random"
                />
            </section>

            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>Hand-made template</h1>
                <ArchiveSheet
                    title="Ulster Moss Archive"
                    subtitle="Field record -- object group 01"
                    code="UMA / SITE-01"
                    blocks={blocks}
                    layout={template}
                    spread
                />
            </section>
        </main>
    );
}
