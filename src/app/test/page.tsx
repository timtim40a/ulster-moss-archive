import type { Block, Rect } from "@/components/archive-sheet";
import { ArchiveSheet, ShuffleableSheet } from "@/components/archive-sheet";
import styles from "./page.module.css";

const baseBlocks: Block[] = [
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
        id: "plinth-photo",
        kind: "photo",
        src: "/photos/photo-plinth.jpg",
        alt: "Fragment on display plinth",
        caption: "as displayed",
        aspect: 1.4,
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

// Same photos, a smaller set of blocks -- shows the algorithm adapting to
// a different block count, not just a different seed.
const spreadBlocks: Block[] = [
    {
        id: "spread-focus",
        kind: "photo",
        src: "/photos/photo-plinth.jpg",
        alt: "Fragment on display plinth",
        caption: "left page, as displayed",
        weight: 2,
        aspect: 1.1,
    },
    {
        id: "spread-sketch",
        kind: "photo",
        src: "/photos/photo-focus.jpg",
        alt: "Sketch of the front face",
        variant: "sketch",
        caption: "front face, redrawn",
        aspect: 0.9,
    },
    {
        id: "spread-notes",
        kind: "table",
        title: "Vessel, partial",
        rows: [
            ["Location", "54.6°N, 6.2°W"],
            ["Date found", "2 September 1991"],
            ["Material", "Coarse earthenware"],
        ],
        aspect: 1.2,
    },
    {
        id: "spread-text",
        kind: "text",
        heading: "Description",
        body: "Rim and shoulder only. Base missing. Interior carries a faint ash residue.",
        aspect: 1.6,
    },
    {
        id: "spread-stamp",
        kind: "stamp",
        label: "UMA / SITE-02",
        note: "on loan",
        aspect: 1,
    },
];

// Hand-made template: one Rect per block below, in order, tiling the
// default 12x8 grid exactly.
const templateBlocks: Block[] = [
    {
        id: "tpl-focus",
        kind: "photo",
        src: "/photos/photo-focus.jpg",
        alt: "Bog oak fragment, front face",
        caption: "front face",
    },
    {
        id: "tpl-sketch",
        kind: "photo",
        src: "/photos/photo-detail.jpg",
        alt: "Sketch of the worn surface",
        variant: "sketch",
        caption: "detail",
    },
    {
        id: "tpl-table",
        kind: "table",
        title: "Field notes",
        rows: [
            ["Location", "54.6°N, 6.2°W"],
            ["Material", "Bog oak"],
        ],
    },
    {
        id: "tpl-note",
        kind: "text",
        heading: "Note",
        body: "Surface worn smooth; no visible tool marks.",
        tone: "note",
    },
    {
        id: "tpl-specimens",
        kind: "specimens",
        title: "Specimens",
        items: [
            { src: "/photos/photo-detail.jpg", name: "Fragment A" },
            { src: "/photos/photo-plinth.jpg", name: "Fragment B" },
        ],
    },
    {
        id: "tpl-map",
        kind: "map",
        src: "/photos/photo-plinth.jpg",
        alt: "Site map of Ulster Moss",
        title: "Site map",
        markers: [{ x: 45, y: 50, label: "Fragment, Ulster Moss" }],
        scale: { max: 200, unit: "m" },
    },
    {
        id: "tpl-stamp",
        kind: "stamp",
        label: "UMA / SITE-01",
        note: "catalogued",
    },
];

const template: Rect[] = [
    { col: 1, row: 1, colSpan: 6, rowSpan: 5 }, // tpl-focus
    { col: 7, row: 1, colSpan: 3, rowSpan: 3 }, // tpl-sketch
    { col: 10, row: 1, colSpan: 3, rowSpan: 3 }, // tpl-table
    { col: 7, row: 4, colSpan: 6, rowSpan: 2 }, // tpl-note
    { col: 1, row: 6, colSpan: 4, rowSpan: 3 }, // tpl-specimens
    { col: 5, row: 6, colSpan: 5, rowSpan: 3 }, // tpl-map
    { col: 10, row: 6, colSpan: 3, rowSpan: 3 }, // tpl-stamp
];

export default function TestPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.pageTitle}>ArchiveSheet previews</h1>
            <p className={styles.pageIntro}>
                Three previews of the same component: a shuffleable random layout, a
                two-page centre-fold spread, and a hand-made template.
            </p>

            <section className={styles.preview}>
                <div className={styles.previewHeader}>
                    <h2 className={styles.previewTitle}>1. Random layout</h2>
                    <span className={styles.previewNote}>layout=&quot;random&quot; -- reroll to explore</span>
                </div>
                <ShuffleableSheet
                    title="Ulster Moss Archive"
                    subtitle="Field record -- object group 01"
                    code="UMA / SITE-01"
                    blocks={baseBlocks}
                    layout="random"
                />
            </section>

            <section className={styles.preview}>
                <div className={styles.previewHeader}>
                    <h2 className={styles.previewTitle}>2. Centre-fold spread</h2>
                    <span className={styles.previewNote}>layout=&quot;random&quot;, spread, fewer blocks</span>
                </div>
                <ArchiveSheet
                    title="Ulster Moss Archive"
                    subtitle="Field record -- object group 02"
                    code="UMA / SITE-02"
                    blocks={spreadBlocks}
                    layout="random"
                    seed="test-spread"
                    spread
                />
            </section>

            <section className={styles.preview}>
                <div className={styles.previewHeader}>
                    <h2 className={styles.previewTitle}>3. Hand-made template</h2>
                    <span className={styles.previewNote}>layout={"{Rect[]}"} -- fixed positions</span>
                </div>
                <ArchiveSheet
                    title="Ulster Moss Archive"
                    subtitle="Field record -- object group 01"
                    code="UMA / SITE-01"
                    blocks={templateBlocks}
                    layout={template}
                />
            </section>
        </main>
    );
}
