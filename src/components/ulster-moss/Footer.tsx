"use client";

import type { FormEvent } from "react";
import "./ulster-moss.css";
import { Button } from "./Button";

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
