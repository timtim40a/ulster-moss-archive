/*
 * Imports the site's original hardcoded content into Sanity, so the site
 * looks the same after switching to the CMS.
 *
 *     npm run seed              create documents that don't exist yet
 *     npm run seed -- --replace overwrite them with the original content
 *
 * Documents have fixed ids, so running it again never creates duplicates.
 * Without --replace it leaves existing documents alone, so it can't wipe out
 * an editor's changes. Needs SANITY_WRITE_TOKEN (an Editor API token) in
 * .env.local; delete that token once seeding is done.
 */

import { createClient } from "next-sanity";

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN } = process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_WRITE_TOKEN) {
    console.error(
        "Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_WRITE_TOKEN in .env.local.",
    );
    process.exit(1);
}

const client = createClient({
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-10-01",
    token: SANITY_WRITE_TOKEN,
    useCdn: false,
});

const replace = process.argv.includes("--replace");

type SeedDocument = { _id: string; _type: string } & Record<string, unknown>;

const aboutPage: SeedDocument = {
    _id: "aboutPage",
    _type: "aboutPage",
    title: "About the Artist",
    body: [
        "Placeholder copy. A short biography goes here -- where the artist works, how long Ulster Moss & Artefacts has been underway, and what first drew them to the practice of collecting and recording along this stretch of coast.",
        "Placeholder copy. A paragraph on method and materials: how pieces are found, documented, and eventually either reconstructed or left as they are. This is also a reasonable place to mention training, past exhibitions, or residencies, once that information is available.",
        "Placeholder copy. A closing paragraph on what the archive is for -- who it serves, and what the artist hopes a visitor takes from it.",
    ],
};

async function main() {
    const documents = [aboutPage];

    const transaction = client.transaction();
    for (const doc of documents) {
        if (replace) transaction.createOrReplace(doc);
        else transaction.createIfNotExists(doc);
    }
    await transaction.commit();

    console.log(`${replace ? "Replaced" : "Created if missing"}: ${documents.map((doc) => doc._id).join(", ")}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
