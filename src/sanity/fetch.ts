import type { QueryParams } from "next-sanity";
import { client } from "./client";

/**
 * Cache tags, one per Sanity document type. A publish of that type
 * revalidates the tag (src/app/api/revalidate/route.ts), so every page
 * that fetched it refreshes.
 */
export type SanityTag = "homePage" | "aboutPage" | "contactPage" | "processPage" | "journalEntry";

/** Every site fetch goes through here: cached until its tags are revalidated. */
export function sanityFetch<T>({
    query,
    params = {},
    tags,
}: {
    query: string;
    params?: QueryParams;
    tags: SanityTag[];
}): Promise<T> {
    return client.fetch<T>(query, params, { cache: "force-cache", next: { tags } });
}
