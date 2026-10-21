"use client";

import {
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent,
    type PointerEvent,
    type TransitionEvent,
} from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

export interface CarouselItem {
    id: string;
    src: string;
    alt: string;
    /** Optional: an empty title renders no heading. */
    title: string;
    /** Paragraphs shown under the image. */
    text: string[];
    /** Width / height of the image; its frame takes this shape. Defaults to 3:4. */
    aspectRatio?: number;
}

export interface CarouselProps {
    items: CarouselItem[];
    /** Accessible name for the carousel region. */
    label: string;
}

/*
 * Seamless wrapping: the track holds CLONES copies of the items from the
 * other end on each side. Going past an end slides onto a clone (which looks
 * identical to the real item), and when that slide's transition ends the
 * track snaps, with transitions off, to the real item -- so last -> first is
 * one short slide, never a rewind across the whole track. Two clones per side
 * keep a neighbour peeking in during that slide.
 */
const CLONES = 2;
const SWIPE_THRESHOLD = 40;

const mod = (a: number, n: number) => ((a % n) + n) % n;
const pad = (i: number) => String(i).padStart(2, "0");

/*
 * Each frame has the shared height (--slide-h) and its own image's width, so
 * nothing is cropped and nothing is left empty -- capped at --slide-max-w for
 * very wide images. Widths differ, so the track's offset is the sum of the
 * slides before the current one, as a CSS expression (see Carousel.module.css).
 */
const DEFAULT_RATIO = 3 / 4;
const slideWidth = (it: CarouselItem) =>
    `min(var(--slide-h) * ${it.aspectRatio ?? DEFAULT_RATIO}, var(--slide-max-w))`;

export function Carousel({ items, label }: CarouselProps) {
    const n = items.length;
    // Track position: index into `slides`, which is items with clones on both ends.
    const [pos, setPos] = useState(CLONES);
    const [animating, setAnimating] = useState(false);
    const swipeStart = useRef<number | null>(null);
    const swiped = useRef(false);

    if (n === 0) return null;

    const current = mod(pos - CLONES, n);
    const item = items[current];
    const slides = Array.from({ length: n + 2 * CLONES }, (_, k) => items[mod(k - CLONES, n)]);
    // Centre the current slide: everything before it, plus half of it, back from the middle.
    const before = slides.slice(0, pos).map(slideWidth);
    const trackStyle = {
        transform: `translateX(calc(50cqw - (${before.length ? before.join(" + ") : "0px"}) - ${pos} * var(--gap) - ${slideWidth(item)} / 2))`,
    } as CSSProperties;
    const stageStyle = { "--current-w": slideWidth(item) } as CSSProperties;

    const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Moves to a track position. Input during a slide is ignored, so rapid
    // clicks can never leave the track between items.
    const moveTo = (target: number) => {
        if (animating || target === pos) return;
        if (reducedMotion()) {
            // No transition, so no transitionend: land on the real item directly.
            setPos(CLONES + mod(target - CLONES, n));
            return;
        }
        setAnimating(true);
        setPos(target);
    };

    const step = (delta: number) => moveTo(pos + delta);

    const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
        setAnimating(false);
        // Landed on a clone: jump to the real item it copies (transitions are off now).
        if (pos < CLONES || pos >= CLONES + n) setPos(CLONES + mod(pos - CLONES, n));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
        }
    };

    // Swipe: snap to the neighbour on release past a small threshold.
    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        swipeStart.current = e.clientX;
        swiped.current = false;
    };
    const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        swiped.current = true;
        step(dx < 0 ? 1 : -1);
    };

    const canNavigate = n > 1;

    return (
        <div
            className={styles.carousel}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            tabIndex={0}
            onKeyDown={canNavigate ? onKeyDown : undefined}
        >
            <div className={styles.stage} style={stageStyle}>
                <div
                    className={styles.viewport}
                    onPointerDown={canNavigate ? onPointerDown : undefined}
                    onPointerUp={canNavigate ? onPointerUp : undefined}
                    onPointerCancel={() => (swipeStart.current = null)}
                >
                    <div
                        className={`${styles.track} ${animating ? styles.animating : ""}`}
                        style={trackStyle}
                        onTransitionEnd={onTransitionEnd}
                    >
                        {slides.map((slide, k) => {
                            const offset = k - pos;
                            const isClone = k < CLONES || k >= CLONES + n;
                            return (
                                <div
                                    key={`${k}-${slide.id}`}
                                    className={`${styles.slide} ${offset === 0 ? styles.current : ""}`}
                                    style={
                                        {
                                            width: slideWidth(slide),
                                            aspectRatio: slide.aspectRatio ?? DEFAULT_RATIO,
                                        } as CSSProperties
                                    }
                                    role={isClone ? undefined : "group"}
                                    aria-roledescription={isClone ? undefined : "slide"}
                                    aria-label={isClone ? undefined : `${mod(k - CLONES, n) + 1} of ${n}`}
                                    aria-hidden={isClone || offset !== 0 ? true : undefined}
                                    onClick={() => {
                                        // A visible neighbour navigates to itself; ignore the click a swipe ends with.
                                        if (swiped.current) return;
                                        if (Math.abs(offset) === 1) step(offset);
                                    }}
                                >
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt}
                                        fill
                                        sizes="(max-width: 600px) 76vw, 52vw"
                                        className={styles.image}
                                        draggable={false}
                                        // The first item is preloaded; the current image and its
                                        // neighbours load eagerly, the rest lazily. (Next rejects
                                        // preload together with loading, so the first gets only preload.)
                                        preload={k === CLONES}
                                        loading={k === CLONES ? undefined : Math.abs(offset) <= 1 ? "eager" : "lazy"}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {canNavigate && (
                    <>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.prev}`}
                            aria-label="Previous image"
                            onClick={() => step(-1)}
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.next}`}
                            aria-label="Next image"
                            onClick={() => step(1)}
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {canNavigate && (
                <div className={`${styles.indicators} nav`}>
                    {items.map((it, i) => (
                        <button
                            key={it.id}
                            type="button"
                            className={styles.indicator}
                            aria-label={`Image ${i + 1} of ${n}`}
                            aria-current={i === current ? "true" : undefined}
                            onClick={() => moveTo(CLONES + i)}
                        >
                            {pad(i + 1)}
                        </button>
                    ))}
                    <span className={styles.count} aria-hidden="true">
                        / {pad(n)}
                    </span>
                </div>
            )}

            {/* Every item's text is laid out invisibly in the same cell, so the
                block is always as tall as the longest one and the page never
                jumps. Only the current text is visible and announced. */}
            <div className={styles.textStack}>
                {items.map((it) => (
                    <div key={it.id} className={`${styles.text} ${styles.sizer}`} aria-hidden="true">
                        {it.title && <h2 className="display-md">{it.title}</h2>}
                        {it.text.map((p, j) => (
                            <p key={j} className="body">
                                {p}
                            </p>
                        ))}
                    </div>
                ))}
                <div className={styles.live} aria-live="polite">
                    {/* Re-keyed per item so the short fade replays; the live region itself stays mounted. */}
                    <div key={item.id} className={styles.text}>
                        {item.title && <h2 className="display-md">{item.title}</h2>}
                        {item.text.map((p, j) => (
                            <p key={j} className="body">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
