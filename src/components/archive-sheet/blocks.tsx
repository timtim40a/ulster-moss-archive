import Image from "next/image";
import type { CSSProperties } from "react";
import type { Block, MapScale } from "./types";
import styles from "./ArchiveSheet.module.css";

type ExtractBlock<K extends Block["kind"]> = Extract<Block, { kind: K }>;

function PhotoBlockView({ block }: { block: ExtractBlock<"photo"> }) {
    const isSketch = block.variant === "sketch";
    return (
        <div className={styles.photo}>
            <div className={styles.mediaFrame}>
                <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, 40vw"
                    className={`${styles.mediaCover} ${isSketch ? styles.printed : ""}`}
                />
            </div>
            {block.caption && <p className={styles.caption}>{block.caption}</p>}
        </div>
    );
}

function TableBlockView({ block }: { block: ExtractBlock<"table"> }) {
    return (
        <div className={styles.table}>
            {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
            <dl className={styles.kv}>
                {block.rows.map(([label, value], i) => (
                    <div className={styles.kvRow} key={i}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

function TextBlockView({ block }: { block: ExtractBlock<"text"> }) {
    const isNote = block.tone === "note";
    return (
        <div className={`${styles.text} ${isNote ? styles.note : ""}`}>
            {block.heading && <h3 className={styles.blockTitle}>{block.heading}</h3>}
            <p className={isNote ? styles.handwritten : undefined}>{block.body}</p>
        </div>
    );
}

function SpecimensBlockView({ block }: { block: ExtractBlock<"specimens"> }) {
    return (
        <div className={styles.specimens}>
            {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
            <ul className={styles.specimenList}>
                {block.items.map((item, i) => (
                    <li className={styles.specimenItem} key={i}>
                        <div className={`${styles.mediaFrame} ${styles.specimenThumb}`}>
                            <Image
                                src={item.src}
                                alt={item.name}
                                fill
                                sizes="120px"
                                className={`${styles.mediaContain} ${styles.printed}`}
                            />
                        </div>
                        <span className={styles.specimenLabel}>
                            <span>{item.name}</span>
                            {item.latin && <em>{item.latin}</em>}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ScaleBar({ scale }: { scale: MapScale }) {
    const steps = scale.steps ?? 4;
    const style = { "--steps": steps } as CSSProperties;
    return (
        <div className={styles.scaleBar} style={style}>
            <div className={styles.scaleTrack} />
            <div className={styles.scaleLabels}>
                {Array.from({ length: steps + 1 }, (_, i) => (
                    <span key={i}>
                        {Math.round((scale.max / steps) * i)}
                        {i === steps ? ` ${scale.unit}` : ""}
                    </span>
                ))}
            </div>
        </div>
    );
}

function MapBlockView({ block }: { block: ExtractBlock<"map"> }) {
    return (
        <div className={styles.map}>
            {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
            <div className={`${styles.mediaFrame} ${styles.mapFrame}`}>
                <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, 40vw"
                    className={`${styles.mediaContain} ${styles.printed}`}
                />
                {block.markers?.map((marker, i) => (
                    <span
                        className={styles.marker}
                        key={i}
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    >
                        <span className={styles.markerDot}>{i + 1}</span>
                        <span className={styles.markerLabel}>{marker.label}</span>
                    </span>
                ))}
            </div>
            {block.scale && <ScaleBar scale={block.scale} />}
            {block.caption && <p className={styles.caption}>{block.caption}</p>}
        </div>
    );
}

function StampBlockView({ block }: { block: ExtractBlock<"stamp"> }) {
    return (
        <div className={styles.stamp}>
            <span className={styles.stampLabel}>{block.label}</span>
            {block.note && <span className={styles.stampNote}>{block.note}</span>}
        </div>
    );
}

export function BlockView({ block }: { block: Block }) {
    switch (block.kind) {
        case "photo":
            return <PhotoBlockView block={block} />;
        case "table":
            return <TableBlockView block={block} />;
        case "text":
            return <TextBlockView block={block} />;
        case "specimens":
            return <SpecimensBlockView block={block} />;
        case "map":
            return <MapBlockView block={block} />;
        case "stamp":
            return <StampBlockView block={block} />;
        default: {
            const exhaustive: never = block;
            throw new Error(`ArchiveSheet: unhandled block kind ${JSON.stringify(exhaustive)}`);
        }
    }
}

/** True for block kinds that should sit borderless and bottom-aligned in their cell. */
export function isBottomAligned(block: Block): boolean {
    return block.kind === "stamp";
}
