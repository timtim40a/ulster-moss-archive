import type { ReactNode } from "react";

// A bare root layout for the Studio: none of the site's header, footer,
// paper texture or fonts.
export default function StudioLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
