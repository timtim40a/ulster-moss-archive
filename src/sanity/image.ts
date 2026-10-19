import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * URL of an uploaded image, scaled to `width` (never up), never cropped.
 * Takes the asset id alone, so no crop or hotspot data can ever apply.
 */
export function imageUrl(assetId: string, width: number): string {
    return builder.image(assetId).width(width).fit("max").url();
}
