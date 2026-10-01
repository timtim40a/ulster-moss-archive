"use client";

import styles from "./Card.module.css";

export interface CardPhoto {
  src: string;
  alt?: string;
  caption?: string;
}

function CardPhotoFrame({ photo, variantClassName }: { photo: CardPhoto; variantClassName: string }) {
  return (
    <figure className={`${styles.photo} ${variantClassName}`}>
      <div className={styles.frame}>
        <img src={photo.src} alt={photo.alt || ""} />
      </div>
      {photo.caption && <figcaption className={`${styles.photoCaption} caption`}>{photo.caption}</figcaption>}
    </figure>
  );
}

/** A bare {value} renders as a full-width lore/description line; {label, value} renders as an eyebrow/body pair. */
export interface CardRow {
  label?: string;
  value: string;
}

export interface CardProps {
  title: string;
  /** Divider-separated left column: lore/description lines and spec fields (Location, Date found, Material...). */
  rows?: CardRow[];
  /** Up to three: the first is the large focus photo, the next two render smaller, side by side. */
  photos?: CardPhoto[];
}

export function Card({ title, rows = [], photos = [] }: CardProps) {
  const [focus, ...rest] = photos;
  const secondary = rest.slice(0, 2);
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={`${styles.title} display-md`}>{title}</h3>
        {rows.length > 0 && (
          <div className={styles.rows}>
            {rows.map((r, i) =>
              r.label ? (
                <div className={styles.row} key={i}>
                  <span className={`${styles.rowLabel} eyebrow`}>{r.label}</span>
                  <span className={`${styles.rowValue} body`}>{r.value}</span>
                </div>
              ) : (
                <div className={`${styles.row} ${styles.rowText}`} key={i}>
                  <span className="body">{r.value}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
      {photos.length > 0 && (
        <div className={styles.photos}>
          {focus && <CardPhotoFrame photo={focus} variantClassName={styles.photoFocus} />}
          {secondary.length > 0 && (
            <div className={styles.secondary}>
              {secondary.map((p, i) => (
                <CardPhotoFrame photo={p} variantClassName={styles.photoSecondary} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
