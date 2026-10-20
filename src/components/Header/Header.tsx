"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeaderProps {
  title?: string;
  nav?: NavItem[];
  /** Route prefix -> section name, shown after the title as "Title: Section". */
  sections?: Record<string, string>;
}

/** One thin hand-drawn-looking wave, 26 units long, centred on y. */
const wave = (y: number) => `M1 ${y} q3.25 -2.5 6.5 0 t6.5 0 t6.5 0 t6.5 0`;

function BurgerIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 28 20" aria-hidden="true">
      <path d={wave(4)} />
      <path d={wave(10)} />
      <path d={wave(16)} />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 28 28" aria-hidden="true">
      <path d={wave(14)} transform="rotate(45 14 14)" />
      <path d={wave(14)} transform="rotate(-45 14 14)" />
    </svg>
  );
}

export function Header({ title = "Ulster Moss Artefacts", nav = [], sections = {} }: HeaderProps) {
  const pathname = usePathname();
  const section = Object.entries(sections).find(
    ([route]) => pathname === route || pathname.startsWith(route + "/")
  )?.[1];
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // While the menu is open: lock page scroll, close on Escape, and close if the
  // viewport grows past the mobile breakpoint (the menu is hidden there).
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => desktop.matches && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Move focus into the pane on open, and back to the burger on close.
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) burgerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={`${styles.title} hero-title`}>{section ? `${title}: ${section}` : title}</div>
        {nav.length > 0 && (
          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <BurgerIcon />
          </button>
        )}
      </div>
      <hr className={styles.rule} />
      {nav.length > 0 && (
        <>
          <nav className={styles.navList}>
            {nav.map((item, i) => (
              <Link key={i} className={`${styles.navLink} nav`} href={item.href || "#"}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile only: a dimming backdrop and a paper pane that slides in from the right. */}
          <div
            className={`${styles.backdrop} ${open ? styles.isOpen : ""}`}
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className={`${styles.pane} ${open ? styles.isOpen : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            inert={!open}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
            <nav className={styles.paneNav}>
              {nav.map((item, i) => (
                <Link
                  key={i}
                  className={`${styles.paneLink} display-sm`}
                  href={item.href || "#"}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
