import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageCarouselProps {
    images: string[];
    alt?: string;
    /** aspect ratio class e.g. "aspect-[4/3]" or "aspect-[16/9]" */
    aspectClass?: string;
    /** If true, shows full-screen expand capability */
    showCounter?: boolean;
}

export default function ImageCarousel({
    images,
    alt = "Property image",
    aspectClass = "aspect-[4/3]",
    showCounter = true,
}: ImageCarouselProps) {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const MIN_SWIPE = 40;

    const total = images.length;

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    // Touch swipe handlers
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const delta = touchStartX.current - touchEndX.current;
        if (Math.abs(delta) >= MIN_SWIPE) {
            delta > 0 ? next() : prev();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!images || images.length === 0) {
        return (
            <div className={`${aspectClass} flex items-center justify-center bg-muted rounded-xl text-muted-foreground`}>
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-10 w-10 opacity-30" />
                    <p className="text-xs">No images</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative select-none overflow-hidden rounded-xl bg-black group">
            {/* Slides */}
            <div
                className={`${aspectClass} overflow-hidden`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex h-full transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((src, i) => (
                        <div key={i} className="min-w-full h-full shrink-0">
                            <img
                                src={src}
                                alt={`${alt} ${i + 1}`}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Nav arrows — only shown when multiple images */}
            {total > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`block rounded-full transition-all duration-200 ${i === current
                                        ? "w-4 h-1.5 bg-white"
                                        : "w-1.5 h-1.5 bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Counter badge */}
                    {showCounter && (
                        <span className="absolute top-2.5 right-2.5 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {current + 1} / {total}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
