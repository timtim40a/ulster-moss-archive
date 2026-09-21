"use client";

import type { ReactNode } from "react";
import "./ulster-moss.css";

export interface ButtonProps {
  children?: ReactNode;
  label?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Use on the Footer's accent-moss background -- swaps colours to on-accent-moss. */
  onMoss?: boolean;
  /** Lavender fill, e.g. for a standalone call-to-action outside the Footer. */
  onLavender?: boolean;
  /** Give the button a slight hand-set tilt, matching the Label accent style. */
  tilt?: boolean;
}

export function Button({
  children,
  label,
  href,
  onClick,
  type = "button",
  onMoss = false,
  onLavender = false,
  tilt = false,
}: ButtonProps) {
  const className =
    "um-button button-label" +
    (onMoss ? " um-button--on-moss" : "") +
    (onLavender ? " um-button--lavender" : "") +
    (tilt ? " um-button--tilt" : "");
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
