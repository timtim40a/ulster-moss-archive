import { HomeSectionTraces } from "@/components/home/HomeSectionTraces";
import { HomeSectionUlster } from "@/components/home/HomeSectionUlster";
import styles from "./page.module.css";

// Web adaptation of the three-page "Ulster Moss & Artefacts" PDF, one section per page.
export default function Home() {
    return (
        <main className={styles.main}>
            <HomeSectionTraces />
            <HomeSectionUlster />
        </main>
    );
}
