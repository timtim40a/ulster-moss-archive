import { Carousel, type CarouselItem } from "@/components/Carousel/Carousel";
import { fullPhoto } from "@/lib/images";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { PROCESS_PAGE_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

interface ProcessItem {
    _key: string;
    assetId: string;
    alt: string | null;
    title: string | null;
    text: string[] | null;
}

// Wide enough for the slide (52vw) on high-density screens; next/image sizes it down from here.
const IMAGE_WIDTH = 2000;

/*
 * The original hardcoded content, no longer used: the carousel is managed
 * in Sanity now. Kept only until the hardcoded content is removed, so this
 * change can be reverted on its own.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROCESS_ITEMS: CarouselItem[] = [
    {
        id: "recovery",
        src: fullPhoto("IMG_9270-2.jpg"),
        alt: "Placeholder -- process photo",
        title: "Recovery",
        text: [
            "Placeholder copy. Each piece begins as it was found -- unwashed, unsorted, photographed in place before anything is touched. This first stage is about documentation, not restoration.",
            "Placeholder copy. Sample text describing the recovery stage of the process in more detail, to be replaced later.",
        ],
    },
    {
        id: "cleaning",
        src: fullPhoto("IMG_9298.jpg"),
        alt: "Placeholder -- process photo",
        title: "Cleaning",
        text: [
            "Placeholder copy. Cleaning is done by hand, under magnification, with the smallest tools that will do the job. The aim is to reveal what is already there, not to add anything back.",
            "Placeholder copy. Sample text describing the cleaning stage of the process in more detail, to be replaced later.",
        ],
    },
    {
        id: "reconstruction",
        src: fullPhoto("IMG_9323.jpg"),
        alt: "Placeholder -- process photo",
        title: "Reconstruction",
        text: [
            "Placeholder copy. Where fragments belong together, they are set only as far as the evidence allows -- visible joins are left visible, and gaps are left as gaps.",
            "Placeholder copy. Sample text describing the reconstruction stage of the process in more detail, to be replaced later.",
        ],
    },
];

export default async function Process() {
    const items = await sanityFetch<ProcessItem[] | null>({ query: PROCESS_PAGE_QUERY, tags: ["processPage"] });

    // Sanity's shape -> the carousel's existing item shape.
    const carouselItems: CarouselItem[] = (items ?? []).map((item) => ({
        id: item._key,
        src: imageUrl(item.assetId, IMAGE_WIDTH),
        alt: item.alt ?? "",
        title: item.title ?? "",
        text: item.text ?? [],
    }));

    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} display-lg`}>Process / Reconstruction</h1>
            <Carousel items={carouselItems} label="Process stages" />
        </main>
    );
}
