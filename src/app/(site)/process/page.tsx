import { Carousel, type CarouselItem } from "@/components/Carousel/Carousel";
import { fullPhoto } from "@/lib/images";
import styles from "./page.module.css";

/*
 * The carousel's content, in order. To swap in the studio photos, edit only
 * this array: add, remove or reorder items freely. `src` is any public path
 * (fullPhoto() builds one for "public/Full photos/"); leave `title` empty
 * for no heading; each `text` entry is one paragraph.
 */
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

export default function Process() {
    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} display-lg`}>Process / Reconstruction</h1>
            <Carousel items={PROCESS_ITEMS} label="Process stages" />
        </main>
    );
}
