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
