"use client";

import Link from "next/link";
import "./ulster-moss.css";
import { Button } from "./Button";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeaderProps {
  title?: string;
  nav?: NavItem[];
  /** Call-to-action button rendered on the right of the header, e.g. "Order now". */
  cta?: NavItem;
}

export function Header({ title = "Ulster Moss Archive", nav = [], cta }: HeaderProps) {
  return (
    <header className="um-header">
      <div className="um-header__row">
        <div className="um-header__main">
          <div className="um-header__title display-sm">{title}</div>
          <hr className="um-header__rule" />
          {nav.length > 0 && (
            <nav className="um-header__nav">
              {nav.map((item, i) => (
                <Link key={i} className="um-header__link nav" href={item.href || "#"}>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        {cta && (
          <div className="um-header__cta">
            <Button href={cta.href} onLavender tilt>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
