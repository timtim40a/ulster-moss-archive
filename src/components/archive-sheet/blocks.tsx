import Image from "next/image";
import type { CSSProperties } from "react";
import type { Block, MapScale } from "./types";
import mediaStyles from "./MediaFrame.module.css";
import photoStyles from "./Photo.module.css";
import tableStyles from "./Table.module.css";
import textStyles from "./Text.module.css";
import specimensStyles from "./Specimens.module.css";
import mapStyles from "./Map.module.css";
import stampStyles from "./Stamp.module.css";

type ExtractBlock<K extends Block["kind"]> = Extract<Block, { kind: K }>;

function PhotoBlockView({ block }: { block: ExtractBlock<"photo"> }) {
    const isSketch = block.variant === "sketch";
    return (
        <div className={photoStyles.photo}>
            <div className={mediaStyles.mediaFrame}>
                <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, 40vw"
                    className={`${mediaStyles.mediaCover} ${isSketch ? mediaStyles.printed : ""}`}
                />
            </div>
            {block.caption && <p className={mediaStyles.caption}>{block.caption}</p>}
        </div>
    );
}

function TableBlockView({ block }: { block: ExtractBlock<"table"> }) {
    return (
        <div className={tableStyles.table}>
            {block.title && <h3 className={mediaStyles.blockTitle}>{block.title}</h3>}
            <dl className={tableStyles.kv}>
                {block.rows.map(([label, value], i) => (
                    <div className={tableStyles.kvRow} key={i}>
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
        <div className={`${textStyles.text} ${isNote ? textStyles.note : ""}`}>
            {block.heading && <h3 className={mediaStyles.blockTitle}>{block.heading}</h3>}
            <p className={isNote ? textStyles.handwritten : undefined}>{block.body}</p>
        </div>
    );
}

function SpecimensBlockView({ block }: { block: ExtractBlock<"specimens"> }) {
    return (
        <div className={specimensStyles.specimens}>
            {block.title && <h3 className={mediaStyles.blockTitle}>{block.title}</h3>}
            <ul className={specimensStyles.specimenList}>
                {block.items.map((item, i) => (
                    <li className={specimensStyles.specimenItem} key={i}>
                        <div className={`${mediaStyles.mediaFrame} ${specimensStyles.specimenThumb}`}>
                            <Image
                                src={item.src}
                                alt={item.name}
                                fill
                                sizes="120px"
                                className={`${mediaStyles.mediaContain} ${mediaStyles.printed}`}
                            />
                        </div>
                        <span className={specimensStyles.specimenLabel}>
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
        <div className={mapStyles.scaleBar} style={style}>
            <div className={mapStyles.scaleTrack} />
            <div className={mapStyles.scaleLabels}>
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
        <div className={mapStyles.map}>
            {block.title && <h3 className={mediaStyles.blockTitle}>{block.title}</h3>}
            <div className={`${mediaStyles.mediaFrame} ${mapStyles.mapFrame}`}>
                <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, 40vw"
                    className={`${mediaStyles.mediaContain} ${mediaStyles.printed}`}
                />
                {block.markers?.map((marker, i) => (
                    <span
                        className={mapStyles.marker}
                        key={i}
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    >
                        <span className={mapStyles.markerDot}>{i + 1}</span>
                        <span className={mapStyles.markerLabel}>{marker.label}</span>
                    </span>
                ))}
            </div>
            {block.scale && <ScaleBar scale={block.scale} />}
            {block.caption && <p className={mediaStyles.caption}>{block.caption}</p>}
        </div>
    );
}

function StampBlockView({ block }: { block: ExtractBlock<"stamp"> }) {
    return <span className={stampStyles.stampLabel}>{block.label}</span>;
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

