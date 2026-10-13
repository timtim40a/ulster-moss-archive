import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { computeMapView, SITE_MAP_INSET } from "./geoProjection";
import styles from "./GeoMap.module.css";

/*
 * The geo-referenced map from the geo-site-map branch (GeoMapFrame and
 * ScaleBar in archive-sheet/blocks.tsx), lifted out of the archive sheet:
 * it takes lat/lng points and renders each marker as a plain link.
 */

export interface GeoMapPoint {
    id: string;
    label: string;
    lat: number;
    lng: number;
    entryId: string;
}

export interface GeoMapProps {
    points: GeoMapPoint[];
    /** Where a marker links to, given its point's entryId. */
    entryHref: (entryId: string) => string;
    /** Points whose entryId is listed here are drawn as the current location(s). */
    activeEntryIds?: string[];
    /** Extra class on the frame, e.g. to change its size. */
    className?: string;
    src?: string;
    alt?: string;
}

/** Splits a round 1/2/5 x 10^n distance into steps that label cleanly. */
function scaleSteps(km: number): number {
    const lead = Math.round(km / 10 ** Math.floor(Math.log10(km)));
    return lead === 5 ? 5 : 2;
}

/** The map zoomed and panned so every point's real coordinates fit. */
export function GeoMap({
    points,
    entryHref,
    activeEntryIds = [],
    className,
    src = "/photos/site-map.jpg",
    alt = "Hand-drawn map of Ireland showing the journal's find sites",
}: GeoMapProps) {
    const view = computeMapView(points.map((point) => `${point.lat}, ${point.lng}`));
    const frameStyle = {
        "--bcx": view.box.x + view.box.w / 2,
        "--bcy": view.box.y + view.box.h / 2,
        "--bw": view.box.w,
        "--bh": view.box.h,
        "--inset": SITE_MAP_INSET,
    } as CSSProperties;
    const steps = scaleSteps(view.scale.km);
    const scaleStyle = { "--frac": view.scale.frac, "--steps": steps } as CSSProperties;

    return (
        <div className={`${styles.geoFrame} ${className ?? ""}`} style={frameStyle}>
            <div className={styles.geoCanvas}>
                <Image src={src} alt={alt} fill sizes="(max-width: 920px) 100vw, 460px" className={styles.printed} />
                {points.map((point, i) => {
                    const placed = view.markers[i];
                    const isActive = activeEntryIds.includes(point.entryId);
                    return (
                        <Link
                            key={point.id}
                            href={entryHref(point.entryId)}
                            className={`${styles.geoMarker} ${placed.labelSide === "left" ? styles.geoMarkerLeft : ""} ${isActive ? styles.geoMarkerActive : ""}`}
                            aria-current={isActive ? "location" : undefined}
                            style={{ left: `${placed.fx * 100}%`, top: `${placed.fy * 100}%` }}
                        >
                            <span className={styles.markerDot}>{i + 1}</span>
                            <span className={styles.markerLabel}>{point.label}</span>
                        </Link>
                    );
                })}
            </div>
            <div className={styles.geoScale} style={scaleStyle}>
                <div className={styles.scaleTrack} />
                <div className={styles.scaleLabels}>
                    <span>0</span>
                    <span>{view.scale.km} km</span>
                </div>
            </div>
        </div>
    );
}
