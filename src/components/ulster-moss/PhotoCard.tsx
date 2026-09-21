"use client";

import "./ulster-moss.css";

export interface PhotoCardProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function PhotoCard({ src, alt = "", caption }: PhotoCardProps) {
  return (
    <figure className="um-photocard">
      <div className="um-photocard__frame">
        <img src={src} alt={alt} />
      </div>
      {caption && <figcaption className="um-photocard__caption caption">{caption}</figcaption>}
    </figure>
  );
}
