import Image from "next/image";
import styles from "./HomeImage.module.css";

export interface HomeImageProps {
    src: string;
    alt: string;
    // Rendered width relative to the viewport, e.g. "100vw" for a base picture.
    sizes: string;
    // Which part of the picture stays in view when `cover` crops it.
    objectPosition?: string;
    // Only the first section's picture is preloaded.
    preload?: boolean;
}

// Fills its nearest positioned ancestor, which decides where and how big the picture is.
export function HomeImage({ src, alt, sizes, objectPosition, preload = false }: HomeImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={styles.image}
            style={objectPosition ? { objectPosition } : undefined}
        />
    );
}
