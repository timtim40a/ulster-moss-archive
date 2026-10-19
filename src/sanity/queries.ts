import { defineQuery } from "next-sanity";

// Every GROQ query the site runs. Single pages are fetched by their fixed
// document id, which is their type name (see structure.ts).

export const ABOUT_PAGE_QUERY = defineQuery(`*[_id == "aboutPage"][0]{ title, body }`);

export const CONTACT_PAGE_QUERY = defineQuery(
    `*[_id == "contactPage"][0]{ title, intro, email, phone, address, hours, formIntro }`,
);

// Items without an uploaded image are skipped.
export const PROCESS_PAGE_QUERY = defineQuery(
    `*[_id == "processPage"][0].items[defined(image.asset)]{ _key, "assetId": image.asset._ref, alt, title, text }`,
);
