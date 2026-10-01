"use client";

import styles from "./Header.module.css";

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
    <header className={styles.header}>
      <div className={`${styles.title} display-sm`}>{title}</div>
      <hr className={styles.rule} />
      {nav.length > 0 && (
        <nav className={styles.navList}>
          {nav.map((item, i) => (
            <a key={i} className={`${styles.navLink} nav`} href={item.href || "#"}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
