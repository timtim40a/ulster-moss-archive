"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./Footer.module.css";

export interface FooterProps {
  heading?: string;
  blurb?: string;
}

export function Footer({ heading = "Get in touch", blurb }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h3 className={`${styles.heading} display-md`}>{heading}</h3>
        {blurb && <p className={`${styles.blurb} body`}>{blurb}</p>}
        <form className={styles.form} onSubmit={(e: FormEvent) => e.preventDefault()}>
          <label className={styles.field}>
            <span className="eyebrow">Name</span>
            <input type="text" name="name" />
          </label>
          <label className={styles.field}>
            <span className="eyebrow">Email</span>
            <input type="email" name="email" />
          </label>
          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span className="eyebrow">Message</span>
            <textarea name="message" rows={3} />
          </label>
          <div className={styles.submitRow}>
            <Button type="submit" onMoss>
              Send
            </Button>
          </div>
        </form>
      </div>
    </footer>
  );
}
