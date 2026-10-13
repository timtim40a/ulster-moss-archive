"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./ContactForm.module.css";

export interface ContactFormProps {
  heading?: string;
  blurb?: string;
}

export function ContactForm({ heading = "Send an enquiry", blurb }: ContactFormProps) {
  return (
    <div className={styles.wrap}>
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
            <textarea name="message" rows={5} />
          </label>
          <div className={styles.submitRow}>
            <Button type="submit" onMoss>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
