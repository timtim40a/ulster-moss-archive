import type { Block, GridConfig, LayoutMode, PlacedBlock, Rect } from "./types";

const DEFAULT_GRID: GridConfig = { cols: 12, rows: 8 };
const DEFAULT_GRID_ASPECT = 1.75;
const DEFAULT_MIN_COLS = 3;
const DEFAULT_MIN_ROWS = 2;
const MAX_ATTEMPTS = 24;

// ---- seeded RNG: FNV-1a hash -> mulberry32 ----------------------------

function fnv1a(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
}

function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return function random() {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function createRng(seed: string): () => number {
    return mulberry32(fnv1a(seed));
}

// ---- recursive binary space partition ----------------------------------

interface PartitionConfig {
    minCols: number;
    minRows: number;
    /** Width / height of a single 1x1 grid cell. */
    cellAspect: number;
}

function partitionRect(rect: Rect, n: number, rng: () => number, cfg: PartitionConfig): Rect[] {
    if (n <= 1) return [rect];

    const canSplitCols = rect.colSpan >= cfg.minCols * 2;
    const canSplitRows = rect.rowSpan >= cfg.minRows * 2;
    if (!canSplitCols && !canSplitRows) return [rect];

    const visualWidth = rect.colSpan * cfg.cellAspect;
    const visualHeight = rect.rowSpan;
    const preferColsCut = visualWidth >= visualHeight;

    let cutCols: boolean;
    if (canSplitCols && canSplitRows) {
        cutCols = rng() < 0.8 ? preferColsCut : !preferColsCut;
    } else {
        cutCols = canSplitCols;
    }

    const shareA = 1 + Math.floor(rng() * (n - 1));
    const shareB = n - shareA;
    const jitter = (rng() - 0.5) * 0.3;
    const frac = Math.min(1, Math.max(0, shareA / n + jitter));

    if (cutCols) {
        let spanA = Math.round(rect.colSpan * frac);
        spanA = Math.max(cfg.minCols, Math.min(rect.colSpan - cfg.minCols, spanA));
        const spanB = rect.colSpan - spanA;
        const rectA: Rect = { col: rect.col, row: rect.row, colSpan: spanA, rowSpan: rect.rowSpan };
        const rectB: Rect = { col: rect.col + spanA, row: rect.row, colSpan: spanB, rowSpan: rect.rowSpan };
        return [...partitionRect(rectA, shareA, rng, cfg), ...partitionRect(rectB, shareB, rng, cfg)];
    }

    let spanA = Math.round(rect.rowSpan * frac);
    spanA = Math.max(cfg.minRows, Math.min(rect.rowSpan - cfg.minRows, spanA));
    const spanB = rect.rowSpan - spanA;
    const rectA: Rect = { col: rect.col, row: rect.row, colSpan: rect.colSpan, rowSpan: spanA };
    const rectB: Rect = { col: rect.col, row: rect.row + spanA, colSpan: rect.colSpan, rowSpan: spanB };
    return [...partitionRect(rectA, shareA, rng, cfg), ...partitionRect(rectB, shareB, rng, cfg)];
}

export interface RandomLayoutOptions {
    minCols?: number;
    minRows?: number;
    maxAttempts?: number;
}

/**
 * Recursively splits the grid into exactly `n` non-overlapping rects that
 * fully tile it. Retries with a derived seed if a split gets stuck (a
 * region too small to divide further while blocks remain to place).
 */
export function randomLayout(
    n: number,
    grid: GridConfig = DEFAULT_GRID,
    seed: string = "",
    gridAspect: number = DEFAULT_GRID_ASPECT,
    options: RandomLayoutOptions = {}
): Rect[] {
    if (n <= 0) return [];

    const minCols = options.minCols ?? DEFAULT_MIN_COLS;
    const minRows = options.minRows ?? DEFAULT_MIN_ROWS;
    const maxAttempts = options.maxAttempts ?? MAX_ATTEMPTS;
    const cellAspect = (gridAspect * grid.rows) / grid.cols;
    const cfg: PartitionConfig = { minCols, minRows, cellAspect };
    const root: Rect = { col: 1, row: 1, colSpan: grid.cols, rowSpan: grid.rows };

    let best: Rect[] = [root];
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const trySeed = attempt === 0 ? seed : `${seed}:${attempt}`;
        const rng = createRng(trySeed);
        const rects = partitionRect(root, n, rng, cfg);
        if (rects.length === n) return rects;
        if (rects.length > best.length) best = rects;
    }

    if (process.env.NODE_ENV !== "production") {
        console.warn(
            `ArchiveSheet: could not place ${n} blocks in a ${grid.cols}x${grid.rows} grid ` +
                `(seed "${seed}") after ${maxAttempts} attempts; dropping ${n - best.length} block(s).`
        );
    }
    return best;
}

// ---- greedy weight/aspect assignment -----------------------------------

function assignBlocksToRects(
    blocks: Block[],
    rects: Rect[],
    grid: GridConfig,
    gridAspect: number
): PlacedBlock[] {
    const cellAspect = (gridAspect * grid.rows) / grid.cols;
    const gridArea = grid.cols * grid.rows;
    const totalWeight = blocks.reduce((sum, block) => sum + (block.weight ?? 1), 0) || 1;

    const order = blocks
        .map((block, index) => ({ block, index }))
        .sort((a, b) => (b.block.weight ?? 1) - (a.block.weight ?? 1) || a.index - b.index);

    const remaining = rects.slice();
    const placements: (PlacedBlock | undefined)[] = new Array(blocks.length);

    for (const { block, index } of order) {
        if (remaining.length === 0) break;

        const weightShare = Math.max(block.weight ?? 1, 1e-6) / totalWeight;
        let bestIndex = 0;
        let bestCost = Infinity;
        for (let i = 0; i < remaining.length; i++) {
            const rect = remaining[i];
            const rectAspect = (cellAspect * rect.colSpan) / rect.rowSpan;
            const areaShare = (rect.colSpan * rect.rowSpan) / gridArea;
            const aspectCost = block.aspect ? Math.abs(Math.log(rectAspect / block.aspect)) : 0;
            const areaCost = Math.abs(Math.log(areaShare / weightShare));
            const cost = aspectCost + areaCost;
            if (cost < bestCost) {
                bestCost = cost;
                bestIndex = i;
            }
        }
        const [rect] = remaining.splice(bestIndex, 1);
        placements[index] = { block, area: rect };
    }

    return placements.filter((p): p is PlacedBlock => p !== undefined);
}

// ---- public entry point --------------------------------------------------

export function resolveLayout(
    blocks: Block[],
    layout: LayoutMode,
    grid: GridConfig = DEFAULT_GRID,
    seed: string = "",
    gridAspect: number = DEFAULT_GRID_ASPECT
): PlacedBlock[] {
    if (blocks.length === 0) return [];

    if (layout === "manual") {
        const placed: PlacedBlock[] = [];
        for (const block of blocks) {
            if (!block.area) {
                if (process.env.NODE_ENV !== "production") {
                    console.warn(
                        `ArchiveSheet: block "${block.id}" has no area in layout="manual"; skipping it.`
                    );
                }
                continue;
            }
            placed.push({ block, area: block.area });
        }
        return placed;
    }

    if (Array.isArray(layout)) {
        if (layout.length !== blocks.length && process.env.NODE_ENV !== "production") {
            console.warn(
                `ArchiveSheet: layout template has ${layout.length} rect(s) for ${blocks.length} block(s); ` +
                    `${blocks.length > layout.length ? "extra blocks will be dropped" : "extra rects are unused"}.`
            );
        }
        const count = Math.min(blocks.length, layout.length);
        return blocks.slice(0, count).map((block, i) => ({ block, area: layout[i] }));
    }

    const rects = randomLayout(blocks.length, grid, seed, gridAspect);
    return assignBlocksToRects(blocks, rects, grid, gridAspect);
}
