/**
 * Geo-referencing for the hand-drawn Ireland map (public/photos/site-map.jpg).
 *
 * Markers give real-world coordinates as text; this module projects them
 * onto the image and works out which piece of the map to show so every
 * marker fits inside the map block, plus a matching km scale bar.
 *
 * The projection is a least-squares affine fit through a table of
 * landmarks, with an inverse-distance-weighted residual correction on top
 * -- the map is hand-drawn, so no clean cartographic projection matches
 * it, but a handful of well-spread control points does. To re-tune for a
 * different image, edit SITE_MAP_CONTROL_POINTS.
 */

export interface LatLon {
    lat: number;
    lon: number;
}

interface ControlPoint extends LatLon {
    name: string;
    /** Pixel position in the source image. */
    px: number;
    py: number;
}

/** Pixel size of site-map.jpg. */
export const SITE_MAP_SIZE = 1024;
/** Width of the image's decorative double-rule border, as a fraction; the
 * view never pans into it. */
export const SITE_MAP_INSET = 0.05;

/** Landmarks read off site-map.jpg at 2x zoom with a 20px grid overlay. */
export const SITE_MAP_CONTROL_POINTS: ControlPoint[] = [
    { name: "Malin Head", lat: 55.381, lon: -7.373, px: 547, py: 59 },
    { name: "Rathlin Island", lat: 55.29, lon: -6.2, px: 697, py: 79 },
    { name: "Tory Island", lat: 55.265, lon: -8.23, px: 430, py: 88 },
    { name: "Malin Beg", lat: 54.66, lon: -8.79, px: 352, py: 215 },
    { name: "Lough Neagh (centre)", lat: 54.62, lon: -6.42, px: 672, py: 232 },
    { name: "Belfast", lat: 54.6, lon: -5.93, px: 740, py: 240 },
    { name: "Strangford Lough", lat: 54.48, lon: -5.62, px: 785, py: 270 },
    { name: "Erris Head", lat: 54.3, lon: -10.0, px: 187, py: 311 },
    { name: "Achill Head", lat: 53.97, lon: -10.26, px: 155, py: 380 },
    { name: "Howth Head", lat: 53.375, lon: -6.06, px: 725, py: 519 },
    { name: "Inishmore", lat: 53.12, lon: -9.72, px: 227, py: 577 },
    { name: "Wicklow Head", lat: 52.97, lon: -6.0, px: 735, py: 615 },
    { name: "Loop Head", lat: 52.56, lon: -9.93, px: 200, py: 702 },
    { name: "Carnsore Point", lat: 52.17, lon: -6.36, px: 692, py: 772 },
    { name: "Dunmore Head", lat: 52.11, lon: -10.48, px: 122, py: 786 },
    { name: "Bray Head, Valentia", lat: 51.88, lon: -10.42, px: 125, py: 852 },
    { name: "Mizen Head", lat: 51.45, lon: -9.82, px: 215, py: 950 },
];

// ---------------------------------------------------------------- parsing

const DMS_PART = String.raw`(\d+(?:\.\d+)?)\s*°?\s*(?:(\d+(?:\.\d+)?)\s*['′’]\s*)?(?:(\d+(?:\.\d+)?)\s*(?:["″”]|'')\s*)?`;
const DMS_RE = new RegExp(String.raw`^\s*${DMS_PART}([NS])[\s,;]*${DMS_PART}([EW])\s*$`, "i");
const DECIMAL_RE = /^\s*(-?\d+(?:\.\d+)?)\s*[,;\s]\s*(-?\d+(?:\.\d+)?)\s*$/;

function dmsToDecimal(deg: string, min: string | undefined, sec: string | undefined, hemi: string): number {
    const value = Number(deg) + Number(min ?? 0) / 60 + Number(sec ?? 0) / 3600;
    return /[SW]/i.test(hemi) ? -value : value;
}

/**
 * Parses "54.597, -5.930", "54.6N 5.9W" or "54°35′49″N 5°55′48″W"
 * (latitude first). Throws on anything else.
 */
export function parseCoords(text: string): LatLon {
    const decimal = DECIMAL_RE.exec(text);
    const dms = decimal ? null : DMS_RE.exec(text);
    let lat: number;
    let lon: number;
    if (decimal) {
        lat = Number(decimal[1]);
        lon = Number(decimal[2]);
    } else if (dms) {
        lat = dmsToDecimal(dms[1], dms[2], dms[3], dms[4]);
        lon = dmsToDecimal(dms[5], dms[6], dms[7], dms[8]);
    } else {
        throw new Error(`geoMap: can't parse coordinates ${JSON.stringify(text)}`);
    }
    if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
        throw new Error(`geoMap: coordinates out of range ${JSON.stringify(text)}`);
    }
    return { lat, lon };
}

// ------------------------------------------------------------- projection

type Affine = [a: number, b: number, c: number];

/** Least-squares fit of v ~ a*lon + b*lat + c (3x3 normal equations). */
function fitAffine(points: ControlPoint[], pick: (p: ControlPoint) => number): Affine {
    const m = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const r = [0, 0, 0];
    for (const p of points) {
        const row = [p.lon, p.lat, 1];
        for (let i = 0; i < 3; i++) {
            r[i] += row[i] * pick(p);
            for (let j = 0; j < 3; j++) m[i][j] += row[i] * row[j];
        }
    }
    // Gaussian elimination with partial pivoting.
    for (let col = 0; col < 3; col++) {
        let pivot = col;
        for (let i = col + 1; i < 3; i++) if (Math.abs(m[i][col]) > Math.abs(m[pivot][col])) pivot = i;
        [m[col], m[pivot]] = [m[pivot], m[col]];
        [r[col], r[pivot]] = [r[pivot], r[col]];
        for (let i = col + 1; i < 3; i++) {
            const f = m[i][col] / m[col][col];
            for (let j = col; j < 3; j++) m[i][j] -= f * m[col][j];
            r[i] -= f * r[col];
        }
    }
    const x = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
        let s = r[i];
        for (let j = i + 1; j < 3; j++) s -= m[i][j] * x[j];
        x[i] = s / m[i][i];
    }
    return [x[0], x[1], x[2]];
}

const AFFINE_X = fitAffine(SITE_MAP_CONTROL_POINTS, (p) => p.px);
const AFFINE_Y = fitAffine(SITE_MAP_CONTROL_POINTS, (p) => p.py);

function applyAffine([a, b, c]: Affine, { lat, lon }: LatLon): number {
    return a * lon + b * lat + c;
}

const RESIDUALS = SITE_MAP_CONTROL_POINTS.map((p) => ({
    lat: p.lat,
    lon: p.lon,
    dx: p.px - applyAffine(AFFINE_X, p),
    dy: p.py - applyAffine(AFFINE_Y, p),
}));

/** Projects a coordinate to pixels in site-map.jpg. */
export function projectToPixels(point: LatLon): { px: number; py: number } {
    // Inverse-distance-weighted blend of the control-point residuals, so the
    // hand-drawn coastline's local wobble is followed near each landmark and
    // fades back to the pure affine fit between them.
    let wSum = 0;
    let dx = 0;
    let dy = 0;
    for (const res of RESIDUALS) {
        const d2 = (res.lat - point.lat) ** 2 + ((res.lon - point.lon) * 0.6) ** 2;
        if (d2 < 1e-12) {
            wSum = 1;
            dx = res.dx;
            dy = res.dy;
            break;
        }
        const w = 1 / d2;
        wSum += w;
        dx += w * res.dx;
        dy += w * res.dy;
    }
    return {
        px: applyAffine(AFFINE_X, point) + dx / wSum,
        py: applyAffine(AFFINE_Y, point) + dy / wSum,
    };
}

/** Projects a coordinate to 0-1 fractions of the image. */
export function project(point: LatLon): { fx: number; fy: number } {
    const { px, py } = projectToPixels(point);
    return { fx: px / SITE_MAP_SIZE, fy: py / SITE_MAP_SIZE };
}

// ------------------------------------------------------------------- view

/** Smallest visible span, as a fraction of the image (~ 90 km across). */
const MIN_SPAN = 0.2;
/** Padding around the markers, as a fraction of their spread... */
const PAD_RATIO = 0.15;
/** ...but never less than this, as a fraction of the image. */
const MIN_PAD = 0.04;
const KM_PER_DEG_LAT = 111.32;

export interface GeoMarkerPlacement {
    /** Position as a fraction of the image, 0-1. */
    fx: number;
    fy: number;
    /** Which side of the dot the label sits on, so it grows into the view. */
    labelSide: "left" | "right";
}

export interface GeoMapView {
    markers: GeoMarkerPlacement[];
    /** Region of the image that must stay visible, as 0-1 fractions. */
    box: { x: number; y: number; w: number; h: number };
    /** A round distance and its length as a fraction of the image width. */
    scale: { km: number; frac: number };
}

/** Grows [lo, hi] to at least `min` wide around its centre, kept inside the border. */
function fitSpan(lo: number, hi: number, min: number): [number, number] {
    const inner = 1 - 2 * SITE_MAP_INSET;
    const span = Math.min(inner, Math.max(hi - lo, min));
    const centre = (lo + hi) / 2;
    const start = Math.min(Math.max(centre - span / 2, SITE_MAP_INSET), 1 - SITE_MAP_INSET - span);
    return [start, start + span];
}

function niceDistance(target: number): number {
    const exp = 10 ** Math.floor(Math.log10(target));
    const nice = [5, 2, 1].map((m) => m * exp).find((d) => d <= target);
    return nice ?? exp;
}

export function computeMapView(coords: string[]): GeoMapView {
    const points = coords.map(parseCoords);
    const projected = points.map(project);

    const xs = projected.map((p) => p.fx);
    const ys = projected.map((p) => p.fy);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const pad = Math.max(PAD_RATIO * Math.max(maxX - minX, maxY - minY), MIN_PAD);
    const [x0, x1] = fitSpan(minX - pad, maxX + pad, MIN_SPAN);
    const [y0, y1] = fitSpan(minY - pad, maxY + pad, MIN_SPAN);
    const box = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    const centreX = x0 + box.w / 2;

    // km per image-width fraction, measured east-west at the markers' mean
    // latitude.
    const mean: LatLon = {
        lat: points.reduce((s, p) => s + p.lat, 0) / points.length,
        lon: points.reduce((s, p) => s + p.lon, 0) / points.length,
    };
    const step = 0.1;
    const a = project(mean);
    const b = project({ lat: mean.lat, lon: mean.lon + step });
    const kmPerFrac =
        (step * KM_PER_DEG_LAT * Math.cos((mean.lat * Math.PI) / 180)) / Math.hypot(b.fx - a.fx, b.fy - a.fy);
    const km = niceDistance((box.w * kmPerFrac) / 3);

    return {
        markers: projected.map((p) => ({
            fx: p.fx,
            fy: p.fy,
            labelSide: p.fx > centreX ? "left" : "right",
        })),
        box,
        scale: { km, frac: km / kmPerFrac },
    };
}
