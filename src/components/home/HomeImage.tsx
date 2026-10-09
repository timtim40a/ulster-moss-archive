import Image from "next/image";
import styles from "./HomeImage.module.css";

export interface HomeImageProps {
    src: string;
    alt: string;
    /** Rendered width relative to the viewport, e.g. "158vw" for a plate wider than the screen. */
    sizes?: string;
    /** Only the first picture on the page. */
    preload?: boolean;
    className?: string;
}

/** A Home page picture: fills its positioned parent and crops with object-fit: cover. */
export function HomeImage({ src, alt, sizes = "100vw", preload = false, className }: HomeImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={className ? `${styles.image} ${className}` : styles.image}
        />
    );
}
