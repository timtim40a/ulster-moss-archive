import type { NavItem } from "@/components/Header/Header";

export const SITE_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Field Journal", href: "/field-journal" },
  { label: "Ulster Archive", href: "/ulster-archive" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Routes whose Header title gains a section name: "Ulster Moss & Artefacts: Journal".
export const HEADER_SECTIONS: Record<string, string> = {
  "/field-journal": "Journal",
  "/ulster-archive": "Archive",
};
