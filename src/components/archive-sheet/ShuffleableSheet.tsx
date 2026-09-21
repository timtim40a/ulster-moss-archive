"use client";

import { useState } from "react";
import { ArchiveSheet } from "./ArchiveSheet";
import type { ArchiveSheetProps } from "./types";
import styles from "./ArchiveSheet.module.css";

export interface ShuffleableSheetProps extends Omit<ArchiveSheetProps, "seed"> {
    /** Starting seed. Defaults to `title`, same as ArchiveSheet itself. */
    initialSeed?: string;
}

function randomSeed(): string {
    return Math.random().toString(36).slice(2, 10);
}

/**
 * Wraps ArchiveSheet with a reroll button that swaps in a fresh random
 * seed, so a good-looking layout can be spotted and copied into `seed`
 * as a hardcoded prop later. The reroll itself is plain Math.random --
 * only ArchiveSheet's own render needs to be reproducible.
 */
export function ShuffleableSheet({ initialSeed, title, ...rest }: ShuffleableSheetProps) {
    const [seed, setSeed] = useState(initialSeed ?? title);

    return (
        <div className={styles.shuffleWrap}>
            <div className={styles.shuffleBar}>
                <button type="button" className={styles.shuffleButton} onClick={() => setSeed(randomSeed())}>
                    Reroll layout
                </button>
                <code className={styles.shuffleSeed}>seed: {seed}</code>
            </div>
            <ArchiveSheet title={title} seed={seed} {...rest} />
        </div>
    );
}
