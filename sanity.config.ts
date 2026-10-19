"use client";

// The Studio embedded at /studio (src/app/(studio)/studio/[[...tool]]/page.tsx).

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { SINGLETON_TYPES, structure } from "@/sanity/structure";

// The only actions a single page offers: no duplicate, delete or unpublish.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
    name: "default",
    title: "Ulster Moss & Artefacts",
    basePath: "/studio",
    projectId,
    dataset,
    plugins: [structureTool({ structure })],
    schema: {
        types: schemaTypes,
        // Single pages can't be created from the "new document" menu.
        templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
    },
    document: {
        actions: (actions, { schemaType }) =>
            SINGLETON_TYPES.has(schemaType)
                ? actions.filter(({ action }) => action !== undefined && SINGLETON_ACTIONS.has(action))
                : actions,
    },
});
