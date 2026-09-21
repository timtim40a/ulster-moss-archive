"use client";

import type { FormEvent, ReactNode } from "react";
import "./ulster-moss.css";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeaderProps {
  title?: string;
  nav?: NavItem[];
}

export function Header({ title = "Ulster Moss Archive", nav = [] }: HeaderProps) {
  return (
    <header className="um-header">
      <div className="um-header__title display-sm">{title}</div>
      <hr className="um-header__rule" />
      {nav.length > 0 && (
        <nav className="um-header__nav">
          {nav.map((item, i) => (
            <a key={i} className="um-header__link nav" href={item.href || "#"}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export interface ButtonProps {
  children?: ReactNode;
  label?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Use on the Footer's accent-moss background -- swaps colours to on-accent-moss. */
  onMoss?: boolean;
}

export function Button({
  children,
  label,
  href,
  onClick,
  type = "button",
  onMoss = false,
}: ButtonProps) {
  const className = "um-button button-label" + (onMoss ? " um-button--on-moss" : "");
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children ?? label}
      </a>
    );
  }
  return (
    <button className={className} type={type} onClick={onClick}>
      {children ?? label}
    </button>
  );
}

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

export interface LabelProps {
  children: ReactNode;
  tone?: "plain" | "accent";
}

export function Label({ children, tone = "plain" }: LabelProps) {
  return <span className={"um-label um-label--" + tone + " eyebrow"}>{children}</span>;
}

export interface FooterProps {
  heading?: string;
  blurb?: string;
}

export function Footer({ heading = "Get in touch", blurb }: FooterProps) {
  return (
    <footer className="um-footer">
      <div className="um-footer__content">
        <h3 className="um-footer__heading display-md">{heading}</h3>
        {blurb && <p className="um-footer__blurb body">{blurb}</p>}
        <form className="um-form" onSubmit={(e: FormEvent) => e.preventDefault()}>
          <label className="um-field">
            <span className="eyebrow">Name</span>
            <input type="text" name="name" />
          </label>
          <label className="um-field">
            <span className="eyebrow">Email</span>
            <input type="email" name="email" />
          </label>
          <label className="um-field um-field--wide">
            <span className="eyebrow">Message</span>
            <textarea name="message" rows={3} />
          </label>
          <Button type="submit" onMoss>
            Send
          </Button>
        </form>
      </div>
    </footer>
  );
}
