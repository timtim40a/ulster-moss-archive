import { readdirSync } from "node:fs";
import path from "node:path";
import { archiveImage } from "@/lib/images";
import styles from "./page.module.css";

// Every JPEG in public/Archive, read at build time, in filename order. Only
// JPEGs: the PNG originals may sit beside them on disk, untracked.
const FILES = readdirSync(path.join(process.cwd(), "public", "Archive"))
  .filter((file) => /\.jpe?g$/i.test(file))
  .sort((a, b) => a.localeCompare(b));

export default function UlsterArchive() {
  return (
    <main className={styles.main}>
      {FILES.map((file, i) => (
        <img
          key={file}
          className={styles.image}
          src={archiveImage(file)}
          alt={`Archive image ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
    </main>
  );
}
