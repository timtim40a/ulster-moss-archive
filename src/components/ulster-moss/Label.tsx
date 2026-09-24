"use client";

import type { ReactNode } from "react";
import "./ulster-moss.css";

export interface LabelProps {
  children: ReactNode;
  tone?: "plain" | "accent";
}

export function Label({ children, tone = "plain" }: LabelProps) {
  return <span className={"um-label um-label--" + tone + " eyebrow"}>{children}</span>;
}
