"use client";

import { useState, useRef, useEffect } from "react";

interface Webinar {
  id: string;
  videoId: string;
  title?: string | null;
  description?: string | null;
  order: number;
}

interface YouTubeShortsProps {
  webinars: Webinar[];
}

export default function YouTubeShorts({ webinars }: YouTubeShortsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [webinars]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Adjusted for Shorts width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="mx-auto mb-6 md:mb-8 flex max-w-[1400px] items-center justify-center md:justify-between flex-col md:flex-row gap-4 px-4 sm:px-6 lg:px-20">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900 text-center md:text-left mb-2">
            YouTube Shorts
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
            Watch our latest short-form content
          </p>
        </div>

        {/* Navigation Arrows */}
        {webinars.length > 3 && (
          <div className="flex items-center gap-2 md:gap-3">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 transition-all ${canScrollLeft
                  ? "border-accent text-accent hover:bg-accent hover:text-white"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all ${canScrollRight
                  ? "bg-accent text-white hover:bg-primary-dark"
                  : "bg-gray-300 text-white cursor-not-allowed"
                }`}
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Shorts Grid/Carousel */}
      <div
        ref={scrollRef}
        onScroll={checkScrollability}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{
          paddingLeft: 'max(1rem, calc((100vw - 1400px) / 2 + 5rem))'
        }}
      >
        {webinars.map((webinar, index) => (
          <div
            key={webinar.id}
            className="relative shrink-0 overflow-hidden rounded-xl md:rounded-2xl bg-card-bg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            style={{
              width: '280px',
              height: '500px', // Standard Shorts aspect ratio (9:16)
            }}
          >
            {/* YouTube Shorts Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${webinar.videoId}?modestbranding=1&rel=0&playsinline=1&controls=1`}
              title={webinar.title || `YouTube Short ${index + 1}`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />

            {/* Overlay gradient for better visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
        {/* Right spacer */}
        <div className="w-4 sm:w-6 lg:w-20 shrink-0" aria-hidden="true" />
      </div>

      {webinars.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No Shorts videos available at the moment.</p>
        </div>
      )}
    </section>
  );
}

