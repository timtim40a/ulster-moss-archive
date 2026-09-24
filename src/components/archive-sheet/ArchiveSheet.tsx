import type { CSSProperties } from "react";
import { archiveSerif, archiveHand } from "@/app/fonts";
import type { ArchiveSheetProps } from "./types";
import { resolveLayout } from "./layout";
import { BlockView } from "./blocks";
import sheetStyles from "./Sheet.module.css";
import headerStyles from "./Header.module.css";
import gridStyles from "./Grid.module.css";

const DEFAULT_GRID = { cols: 12, rows: 8 };
const DEFAULT_GRID_ASPECT = 1.75;

/**
 * A "field archive" sheet: an aged-paper page with a lettered header and a
 * grid of bordered content blocks. Pure function of its props (the random
 * layout is seeded, never Math.random), so this renders identically on the
 * server and client -- no hooks, no "use client".
 */
export function ArchiveSheet({
    title,
    subtitle,
    code,
    blocks,
    layout = "random",
    seed,
    grid = DEFAULT_GRID,
    gridAspect = DEFAULT_GRID_ASPECT,
    spread = false,
    className,
}: ArchiveSheetProps) {
    // Stamps are a floating overlay, not part of the grid -- they never
    // consume a partition slot, a manual area, or a template rect.
    const stampBlocks = blocks.filter((block) => block.kind === "stamp");
    const layoutBlocks = blocks.filter((block) => block.kind !== "stamp");
    const placed = resolveLayout(layoutBlocks, layout, grid, seed ?? title, gridAspect);

    const rootStyle = {
        "--cols": grid.cols,
        "--rows": grid.rows,
        "--grid-aspect": gridAspect,
    } as CSSProperties;

    return (
        <article
            className={[sheetStyles.sheet, archiveSerif.variable, archiveHand.variable, className]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={sheetStyles.page} style={rootStyle}>
                <header className={headerStyles.header}>
                    <div className={headerStyles.heading}>
                        <h2 className={headerStyles.title}>{title}</h2>
                        {subtitle && (
                            <>
                                <hr className={headerStyles.rule} />
                                <p className={headerStyles.subtitle}>{subtitle}</p>
                            </>
                        )}
                    </div>
                    {code && <div className={headerStyles.code}>{code}</div>}
                </header>

                <div className={`${gridStyles.grid} ${spread ? gridStyles.spread : ""}`}>
                    {placed.map(({ block, area }) => {
                        const cellStyle = {
                            "--c": area.col,
                            "--r": area.row,
                            "--cs": area.colSpan,
                            "--rs": area.rowSpan,
                        } as CSSProperties;
                        return (
                            <div key={block.id} className={gridStyles.cell} style={cellStyle}>
                                <BlockView block={block} />
                            </div>
                        );
                    })}

                    {stampBlocks.map((block) => (
                        <div key={block.id} className={gridStyles.stampOverlay}>
                            <BlockView block={block} />
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
