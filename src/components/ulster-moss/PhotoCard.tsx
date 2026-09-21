"use client";

import type { CSSProperties } from "react";
import "./ulster-moss.css";

export interface PhotoCardProps {
  src: string;
  alt?: string;
  caption?: string;
  /** Frame width; a bare number is px. Defaults to 100% of the container. */
  width?: number | string;
  /** Frame height; a bare number is px. Overrides the default 4:3 aspect ratio. */
  height?: number | string;
}

export function PhotoCard({ src, alt = "", caption, width, height }: PhotoCardProps) {
  const frameStyle: CSSProperties = { width, height };
  return (
    <figure className="um-photocard">
      <div className="um-photocard__frame" style={frameStyle}>
        <img src={src} alt={alt} />
      </div>
      {caption && <figcaption className="um-photocard__caption caption">{caption}</figcaption>}
    </figure>
  );
}
