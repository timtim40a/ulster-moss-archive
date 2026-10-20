import type { Metadata } from "next";
import { Cormorant, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { HEADER_SECTIONS, SITE_NAV } from "@/lib/nav";
import "@/styles/tokens.css";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Helper font 2: the main heading in the Header only.
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["500"],
});

// Helper font: headings and subheadings everywhere else.
const letterGothic = localFont({
  src: "../../fonts/LetterGothicStandard.ttf",
  variable: "--font-letter-gothic",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Ulster Moss Artefacts",
  description: "A field record for objects the coast has half reclaimed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantGaramond.variable} ${letterGothic.variable}`}
    >
      <body>
        <Header title="Ulster Moss Artefacts" nav={SITE_NAV} sections={HEADER_SECTIONS} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
