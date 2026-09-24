import Image from "next/image";
import type { CSSProperties } from "react";
import type { Block, MapMarker, MapScale } from "./types";
import { computeMapView, SITE_MAP_INSET } from "./geoMap";
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

function ScaleBar({ scale, className, style }: { scale: MapScale; className?: string; style?: CSSProperties }) {
    const steps = scale.steps ?? 4;
    const barStyle = { ...style, "--steps": steps } as CSSProperties;
    return (
        <div className={`${mapStyles.scaleBar} ${className ?? ""}`} style={barStyle}>
            <div className={mapStyles.scaleTrack} />
            <div className={mapStyles.scaleLabels}>
                {Array.from({ length: steps + 1 }, (_, i) => (
                    <span key={i}>
                        {Number(((scale.max / steps) * i).toFixed(2))}
                        {i === steps ? ` ${scale.unit}` : ""}
                    </span>
                ))}
            </div>
        </div>
    );
}

/** Splits a round 1/2/5 x 10^n distance into steps that label cleanly. */
function geoScaleSteps(km: number): number {
    const lead = Math.round(km / 10 ** Math.floor(Math.log10(km)));
    return lead === 5 ? 5 : 2;
}

/** The map zoomed and panned so every marker's real coordinates fit. */
function GeoMapFrame({ block, markers }: { block: ExtractBlock<"map">; markers: MapMarker[] }) {
    const view = computeMapView(markers.map((marker) => marker.coords ?? ""));
    const frameStyle = {
        "--bcx": view.box.x + view.box.w / 2,
        "--bcy": view.box.y + view.box.h / 2,
        "--bw": view.box.w,
        "--bh": view.box.h,
        "--inset": SITE_MAP_INSET,
    } as CSSProperties;
    return (
        <div className={`${mediaStyles.mediaFrame} ${mapStyles.mapFrame} ${mapStyles.geoFrame}`} style={frameStyle}>
            <div className={mapStyles.geoCanvas}>
                <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="100vw"
                    className={`${mediaStyles.mediaContain} ${mediaStyles.printed}`}
                />
                {markers.map((marker, i) => {
                    const placed = view.markers[i];
                    return (
                        <span
                            className={`${mapStyles.geoMarker} ${placed.labelSide === "left" ? mapStyles.geoMarkerLeft : ""}`}
                            key={i}
                            style={{ left: `${placed.fx * 100}%`, top: `${placed.fy * 100}%` }}
                        >
                            <span className={mapStyles.markerDot}>{i + 1}</span>
                            <span className={mapStyles.markerLabel}>{marker.label}</span>
                        </span>
                    );
                })}
            </div>
            <ScaleBar
                scale={{ max: view.scale.km, unit: "km", steps: geoScaleSteps(view.scale.km) }}
                className={mapStyles.geoScale}
                style={{ "--frac": view.scale.frac } as CSSProperties}
            />
        </div>
    );
}

function MapBlockView({ block }: { block: ExtractBlock<"map"> }) {
    const markers = block.markers ?? [];
    const isGeo = markers.length > 0 && markers.every((marker) => marker.coords);
    return (
        <div className={mapStyles.map}>
            {block.title && <h3 className={mediaStyles.blockTitle}>{block.title}</h3>}
            {isGeo ? (
                <GeoMapFrame block={block} markers={markers} />
            ) : (
                <div className={`${mediaStyles.mediaFrame} ${mapStyles.mapFrame}`}>
                    <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 700px) 90vw, 40vw"
                        className={`${mediaStyles.mediaContain} ${mediaStyles.printed}`}
                    />
                    {markers.map((marker, i) => (
                        <span
                            className={mapStyles.marker}
                            key={i}
                            style={{ left: `${marker.x ?? 50}%`, top: `${marker.y ?? 50}%` }}
                        >
                            <span className={mapStyles.markerDot}>{i + 1}</span>
                            <span className={mapStyles.markerLabel}>{marker.label}</span>
                        </span>
                    ))}
                </div>
            )}
            {!isGeo && block.scale && <ScaleBar scale={block.scale} />}
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

