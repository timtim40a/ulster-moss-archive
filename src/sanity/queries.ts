import { defineQuery } from "next-sanity";

// Every GROQ query the site runs. Single pages are fetched by their fixed
// document id, which is their type name (see structure.ts).

export const HOME_PAGE_QUERY = defineQuery(
    `*[_id == "homePage"][0]{
        heroTitle,
        storyIntro,
        storyContinued,
        hashtags,
        projectTitle,
        journalHeading,
        journalExcerptTitle,
        journalExcerpt,
        quote,
        description
    }`,
);

export const ABOUT_PAGE_QUERY =defineQuery(`*[_id == "aboutPage"][0]{ title, body }`);

export const CONTACT_PAGE_QUERY = defineQuery(
    `*[_id == "contactPage"][0]{ title, intro, email, phone, address, hours, formIntro }`,
);

// Items without an uploaded image are skipped.
export const PROCESS_PAGE_QUERY = defineQuery(
    `*[_id == "processPage"][0].items[defined(image.asset)]{
        _key,
        "assetId": image.asset._ref,
        "aspectRatio": image.asset->metadata.dimensions.aspectRatio,
        alt,
        title,
        text
    }`,
);

// Every entry, oldest first; the page paginates the result. One query for all
// pages, so adding or deleting an entry refreshes every page through one tag.
export const JOURNAL_ENTRIES_QUERY = defineQuery(
    `*[_type == "journalEntry" && defined(date)] | order(date asc, _createdAt asc){
        _id,
        date,
        conditions,
        body,
        "images": images[defined(image.asset)]{
            _key,
            "assetId": image.asset._ref,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height,
            alt,
            caption
        }
    }`,
);
