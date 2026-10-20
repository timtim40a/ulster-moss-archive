import { sanityFetch } from "@/sanity/fetch";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

interface AboutPage {
    title: string | null;
    body: string[] | null;
}

export default async function AboutTheArtist() {
    const about = await sanityFetch<AboutPage | null>({ query: ABOUT_PAGE_QUERY, tags: ["aboutPage"] });

    return (
        <main className={styles.main}>
            {about?.title && <h1 className={`${styles.heading} display-lg`}>{about.title}</h1>}
            {about?.body?.map((paragraph, i) => (
                <p key={i} className="body">
                    {paragraph}
                </p>
            ))}
        </main>
    );
}
