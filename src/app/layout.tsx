import type { Metadata } from "next";
import { Cormorant, Caveat } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Ulster Moss Archive",
  description: "A field record for objects the coast has half reclaimed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
