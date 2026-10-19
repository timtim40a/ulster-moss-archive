import { defineQuery } from "next-sanity";

// Every GROQ query the site runs. Single pages are fetched by their fixed
// document id, which is their type name (see structure.ts).

export const ABOUT_PAGE_QUERY = defineQuery(`*[_id == "aboutPage"][0]{ title, body }`);
