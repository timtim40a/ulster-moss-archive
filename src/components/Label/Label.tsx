"use client";

import type { ReactNode } from "react";
import styles from "./Label.module.css";

export interface LabelProps {
  children: ReactNode;
  tone?: "plain" | "accent";
}

export function Label({ children, tone = "plain" }: LabelProps) {
  const toneClass = tone === "accent" ? styles.accent : styles.plain;
  return <span className={`${styles.label} ${toneClass} eyebrow`}>{children}</span>;
}
