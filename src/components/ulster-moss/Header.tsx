"use client";

import Link from "next/link";
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
            <Link key={i} className="um-header__link nav" href={item.href || "#"}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
