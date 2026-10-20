import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// The site reads published content only, straight from the API (not the
// CDN), so a publish is visible as soon as its cache tag is revalidated.
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
});
