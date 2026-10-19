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

import { readFile } from "node:fs/promises";
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

/**
 * Uploads a file from public/ and returns an image field pointing at it.
 * Sanity stores identical files once, so uploading again adds nothing.
 */
async function uploadImage(publicPath: string) {
    const file = await readFile(new URL(`../public/${publicPath}`, import.meta.url));
    const asset = await client.assets.upload("image", file, { filename: publicPath.split("/").pop() });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

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

// No phone: the original page has no phone row.
const contactPage: SeedDocument = {
    _id: "contactPage",
    _type: "contactPage",
    title: "Contact the Archive",
    intro: "Placeholder copy. Enquiries about specific objects, provenance, loan requests, or the field journal are all welcome -- use the form, or reach out directly.",
    email: "archive@ulstermoss.example",
    address: "Donegal coast, Ireland",
    hours: "By appointment only",
    formIntro: "Enquiries about specific objects, provenance, or loan requests.",
};

// Item _keys match the original carousel ids.
async function processPage(): Promise<SeedDocument> {
    const items = [
        {
            _key: "recovery",
            photo: "Full photos/IMG_9270-2.jpg",
            title: "Recovery",
            text: [
                "Placeholder copy. Each piece begins as it was found -- unwashed, unsorted, photographed in place before anything is touched. This first stage is about documentation, not restoration.",
                "Placeholder copy. Sample text describing the recovery stage of the process in more detail, to be replaced later.",
            ],
        },
        {
            _key: "cleaning",
            photo: "Full photos/IMG_9298.jpg",
            title: "Cleaning",
            text: [
                "Placeholder copy. Cleaning is done by hand, under magnification, with the smallest tools that will do the job. The aim is to reveal what is already there, not to add anything back.",
                "Placeholder copy. Sample text describing the cleaning stage of the process in more detail, to be replaced later.",
            ],
        },
        {
            _key: "reconstruction",
            photo: "Full photos/IMG_9323.jpg",
            title: "Reconstruction",
            text: [
                "Placeholder copy. Where fragments belong together, they are set only as far as the evidence allows -- visible joins are left visible, and gaps are left as gaps.",
                "Placeholder copy. Sample text describing the reconstruction stage of the process in more detail, to be replaced later.",
            ],
        },
    ];

    return {
        _id: "processPage",
        _type: "processPage",
        items: await Promise.all(
            items.map(async ({ _key, photo, title, text }) => ({
                _key,
                _type: "processItem",
                image: await uploadImage(photo),
                alt: "Placeholder -- process photo",
                title,
                text,
            })),
        ),
    };
}

// Ids match the original entry ids, which the journal map's points link to.
// The original dates had no year; they are seeded in 2026.
const JOURNAL_ENTRIES = [
    {
        _id: "entry-1",
        date: "2026-03-14",
        conditions: "low tide, overcast",
        body: [
            "Placeholder copy. Went out before the tide turned, following the line where the moss gives way to bare rock. Found the first fragment wedged under a shelf of stone, half-covered by a mat of bladderwrack. It took the better part of an hour to work it free without breaking the surrounding growth.",
            "Placeholder copy. The surface is smoother than I expected -- worn in a way that suggests long tidal action rather than a single impact. No tool marks visible under the hand lens. Logged its position and photographed it in place before lifting it.",
        ],
        image: { file: "Journal/2.png", alt: "Placeholder -- journal sketch", caption: "field sketch, entry 1" },
    },
    {
        _id: "entry-2",
        date: "2026-03-22",
        conditions: "clear, strong wind",
        body: [
            "Placeholder copy. Returned to the same stretch with the full kit this time. Wind made the fine brushwork difficult, so most of the cleaning was done back at the workbench. Photographed the surrounding context before anything was disturbed -- the moss cover here is unusually dense for this part of the shore.",
            "Placeholder copy. A second, smaller fragment turned up roughly four metres from the first, at a similar depth. Possible they are related, though the materials differ enough that I am not yet confident in that reading.",
        ],
        image: { file: "Full photos/IMG_9258.jpg", alt: "Placeholder -- field photo", caption: "in situ, second find" },
    },
    {
        _id: "entry-3",
        date: "2026-04-02",
        conditions: "rain, cut short",
        body: [
            "Placeholder copy. Weather cut the survey short, but not before mapping out the rest of the immediate area with the tape and compass. The notes from today are rougher than I would like -- transcribed properly once home, with the sketches redrawn from memory where the rain had made the field notebook illegible.",
            "Placeholder copy. Still unclear whether this is a single dispersal event or an accumulation over a much longer period. The next visit should focus on depth measurements rather than further collection.",
        ],
        image: { file: "Journal/мала16.png", alt: "Placeholder -- journal sketch", caption: "rough map, redrawn" },
    },
    {
        _id: "entry-4",
        date: "2026-04-09",
        conditions: "calm",
        body: [
            "Placeholder copy. A quieter visit. Spent most of the time on measurement rather than collection, which felt like the right call after the last entry. Depth readings are logged separately and will be cross-referenced with the site map once the Archive entry is drafted.",
            "Placeholder copy. Closing thought for the week: the pattern here resists a tidy explanation, and that is probably fine for now.",
        ],
        image: { file: "Journal/приклад.png", alt: "Placeholder -- journal sketch", caption: "depth notes, week 4" },
    },
];

async function journalEntry({ image, ...entry }: (typeof JOURNAL_ENTRIES)[number]): Promise<SeedDocument> {
    return {
        ...entry,
        _type: "journalEntry",
        images: [
            {
                _key: "image-1",
                _type: "journalImage",
                image: await uploadImage(image.file),
                alt: image.alt,
                caption: image.caption,
            },
        ],
    };
}

// Every seeded document, by id. Built lazily, so images are only uploaded
// for documents that are actually written.
const DOCUMENTS: Record<string, () => SeedDocument | Promise<SeedDocument>> = {
    aboutPage: () => aboutPage,
    contactPage: () => contactPage,
    processPage,
    ...Object.fromEntries(JOURNAL_ENTRIES.map((entry) => [entry._id, () => journalEntry(entry)])),
};

async function main() {
    const ids = Object.keys(DOCUMENTS);
    const existing = new Set(await client.fetch<string[]>(`*[_id in $ids]._id`, { ids }));
    const toWrite = replace ? ids : ids.filter((id) => !existing.has(id));

    const transaction = client.transaction();
    for (const id of toWrite) transaction.createOrReplace(await DOCUMENTS[id]());
    if (toWrite.length > 0) await transaction.commit();

    const skipped = ids.filter((id) => !toWrite.includes(id));
    console.log(`Written: ${toWrite.join(", ") || "none"}`);
    if (skipped.length > 0) console.log(`Left alone (already exist; --replace to overwrite): ${skipped.join(", ")}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
