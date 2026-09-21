// Verifies that randomLayout() always produces a partition that fully
// tiles the grid: every cell covered exactly once, no gaps, no overlaps,
// and no blocks silently dropped, across a wide range of block counts
// and seeds.
//
// Run with: node scripts/verify-archive-sheet-layout.mts

import { randomLayout } from "../src/components/archive-sheet/layout.ts";
import type { Rect } from "../src/components/archive-sheet/types.ts";

const GRID = { cols: 12, rows: 8 };
const SEEDS_PER_N = 300;

function checkTiling(rects: Rect[], grid: { cols: number; rows: number }): string[] {
    const errors: string[] = [];
    const coverage = new Int32Array(grid.cols * grid.rows);

    for (const rect of rects) {
        if (rect.col < 1 || rect.row < 1 || rect.colSpan < 1 || rect.rowSpan < 1) {
            errors.push(`invalid rect: ${JSON.stringify(rect)}`);
            continue;
        }
        if (rect.col + rect.colSpan - 1 > grid.cols || rect.row + rect.rowSpan - 1 > grid.rows) {
            errors.push(`rect out of bounds: ${JSON.stringify(rect)}`);
            continue;
        }
        for (let r = rect.row; r < rect.row + rect.rowSpan; r++) {
            for (let c = rect.col; c < rect.col + rect.colSpan; c++) {
                const idx = (r - 1) * grid.cols + (c - 1);
                coverage[idx]++;
            }
        }
    }

    for (let i = 0; i < coverage.length; i++) {
        if (coverage[i] === 0) {
            errors.push(`cell (col ${(i % grid.cols) + 1}, row ${Math.floor(i / grid.cols) + 1}) never covered`);
        } else if (coverage[i] > 1) {
            errors.push(
                `cell (col ${(i % grid.cols) + 1}, row ${Math.floor(i / grid.cols) + 1}) covered ${coverage[i]} times`
            );
        }
        if (errors.length > 5) break; // don't flood the output
    }

    return errors;
}

let failures = 0;
let total = 0;

for (let n = 2; n <= 9; n++) {
    for (let s = 0; s < SEEDS_PER_N; s++) {
        total++;
        const seed = `verify-${n}-${s}`;
        const rects = randomLayout(n, GRID, seed);

        if (rects.length !== n) {
            failures++;
            console.error(`[n=${n} seed=${seed}] dropped blocks: got ${rects.length} rects, expected ${n}`);
            continue;
        }

        const errors = checkTiling(rects, GRID);
        if (errors.length > 0) {
            failures++;
            console.error(`[n=${n} seed=${seed}] tiling errors:`);
            for (const e of errors) console.error(`  - ${e}`);
        }
    }
}

console.log(`\n${total - failures}/${total} cases passed.`);
if (failures > 0) {
    console.error(`${failures} case(s) FAILED.`);
    process.exit(1);
}
console.log("All good: every grid is fully covered, no overlaps, no gaps, nothing dropped.");
