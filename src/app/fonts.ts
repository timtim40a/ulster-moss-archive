import { Cormorant_Garamond, Caveat } from "next/font/google";

// Colocated with the root layout, but kept out of layout.tsx itself: that
// file exports `metadata`, and Next.js refuses to let a module exporting
// `metadata` end up in a Client Component's module graph -- which is
// exactly what happens once ArchiveSheet (imported here) is reached from
// ShuffleableSheet ("use client"). A plain sibling module has no such
// restriction.
//
// tokens.css already defines a site-wide --font-serif (aliasing
// --font-cormorant from layout.tsx), so ArchiveSheet applies these
// .variable classes on its own root element rather than on <html> --
// otherwise this would silently shadow that token for every page.
export const archiveSerif = Cormorant_Garamond({
    variable: "--font-serif",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
});

export const archiveHand = Caveat({
    variable: "--font-hand",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "600"],
});
