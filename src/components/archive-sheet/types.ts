/**
 * A grid rectangle, 1-based, matching CSS grid-line numbering.
 */
export interface Rect {
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
}

export interface GridConfig {
    cols: number;
    rows: number;
}

interface BlockBase {
    id: string;
    /** Only read in `layout="manual"`. */
    area?: Rect;
    /** Relative importance used by the random assigner. Default 1. */
    weight?: number;
    /** Preferred width/height, used by the random assigner's cost function. */
    aspect?: number;
}

export interface PhotoBlock extends BlockBase {
    kind: "photo";
    src: string;
    alt: string;
    caption?: string;
    variant?: "photo" | "sketch";
}

export interface TableBlock extends BlockBase {
    kind: "table";
    title?: string;
    rows: [label: string, value: string][];
}

export interface TextBlock extends BlockBase {
    kind: "text";
    heading?: string;
    body: string;
    tone?: "plain" | "note";
}

export interface SpecimenItem {
    src: string;
    name: string;
    latin?: string;
}

export interface SpecimensBlock extends BlockBase {
    kind: "specimens";
    title?: string;
    items: SpecimenItem[];
}

export interface MapMarker {
    /**
     * Real-world position, latitude first: "54.597, -5.930",
     * "54.6N 5.9W" or "54°35′49″N 5°55′48″W". When every marker has one,
     * the map zooms and pans to fit them (see geoMap.ts) and x/y are ignored.
     */
    coords?: string;
    /** Percentage across the map image, 0-100. */
    x?: number;
    /** Percentage down the map image, 0-100. */
    y?: number;
    label: string;
}

export interface MapScale {
    max: number;
    unit: string;
    /** Number of alternating segments. Default 4. */
    steps?: number;
}

export interface MapBlock extends BlockBase {
    kind: "map";
    src: string;
    alt: string;
    title?: string;
    markers?: MapMarker[];
    /** Ignored when the markers use `coords` -- the scale is computed. */
    scale?: MapScale;
    caption?: string;
}

export interface StampBlock extends BlockBase {
    kind: "stamp";
    label: string;
}

export type Block =
    | PhotoBlock
    | TableBlock
    | TextBlock
    | SpecimensBlock
    | MapBlock
    | StampBlock;

/**
 * "random" (default): recursive space partition, seeded by `seed`.
 * "manual": each block's own `area` is used as-is.
 * Rect[]: a hand-made template, filled in block order.
 */
export type LayoutMode = "random" | "manual" | Rect[];

export interface PlacedBlock {
    block: Block;
    area: Rect;
}

export interface ArchiveSheetProps {
    title: string;
    subtitle?: string;
    /** Boxed reference code on the right of the header, e.g. "UMA / SITE-01". */
    code?: string;
    blocks: Block[];
    layout?: LayoutMode;
    /** Seeds the random layout. Defaults to `title`. */
    seed?: string;
    /** Default 12x8. */
    grid?: GridConfig;
    /** Width / height of the whole grid area. Default 1.75. */
    gridAspect?: number;
    /** Shade a centre fold, like an open book. */
    spread?: boolean;
    className?: string;
}
