import { Carousel, type CarouselItem } from "@/components/Carousel/Carousel";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { PROCESS_PAGE_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

interface ProcessItem {
    _key: string;
    assetId: string;
    aspectRatio: number | null;
    alt: string | null;
    title: string | null;
    text: string[] | null;
}

// Wide enough for the slide (52vw) on high-density screens; next/image sizes it down from here.
const IMAGE_WIDTH = 2000;

export default async function Process() {
    const items = await sanityFetch<ProcessItem[] | null>({ query: PROCESS_PAGE_QUERY, tags: ["processPage"] });

    // Sanity's shape -> the carousel's existing item shape.
    const carouselItems: CarouselItem[] = (items ?? []).map((item) => ({
        id: item._key,
        src: imageUrl(item.assetId, IMAGE_WIDTH),
        alt: item.alt ?? "",
        title: item.title ?? "",
        text: item.text ?? [],
        aspectRatio: item.aspectRatio ?? undefined,
    }));

    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} display-lg`}>Process / Reconstruction</h1>
            <Carousel items={carouselItems} label="Process stages" />
        </main>
    );
}
