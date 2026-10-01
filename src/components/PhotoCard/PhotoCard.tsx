"use client";

import styles from "./PhotoCard.module.css";

export interface PhotoCardProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function PhotoCard({ src, alt = "", caption }: PhotoCardProps) {
  return (
    <figure className={styles.photocard}>
      <div className={styles.frame}>
        <img src={src} alt={alt} />
      </div>
      {caption && <figcaption className={`${styles.photoCaption} caption`}>{caption}</figcaption>}
    </figure>
  );
}
