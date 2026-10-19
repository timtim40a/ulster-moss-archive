import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export const dynamic = "force-static";

// Includes robots: "noindex".
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
    return <NextStudio config={config} />;
}
