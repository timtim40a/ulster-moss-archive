"use client";

import "./ulster-moss.css";

export interface CardPhoto {
  src: string;
  alt?: string;
  caption?: string;
}

function CardPhotoFrame({ photo, className }: { photo: CardPhoto; className: string }) {
  return (
    <figure className={"um-card__photo " + className}>
      <div className="um-card__frame">
        <img src={photo.src} alt={photo.alt || ""} />
      </div>
      {photo.caption && <figcaption className="um-card__caption caption">{photo.caption}</figcaption>}
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
    <article className="um-card">
      <div className="um-card__body">
        <h3 className="um-card__title display-md">{title}</h3>
        {rows.length > 0 && (
          <div className="um-card__rows">
            {rows.map((r, i) =>
              r.label ? (
                <div className="um-card__row" key={i}>
                  <span className="um-card__row-label eyebrow">{r.label}</span>
                  <span className="um-card__row-value body">{r.value}</span>
                </div>
              ) : (
                <div className="um-card__row um-card__row--text" key={i}>
                  <span className="body">{r.value}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
      {photos.length > 0 && (
        <div className="um-card__photos">
          {focus && <CardPhotoFrame photo={focus} className="um-card__photo--focus" />}
          {secondary.length > 0 && (
            <div className="um-card__secondary">
              {secondary.map((p, i) => (
                <CardPhotoFrame photo={p} className="um-card__photo--secondary" key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
