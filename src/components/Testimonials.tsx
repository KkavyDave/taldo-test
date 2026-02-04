"use client";

import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

const testimonials = [
    {
        playbackId: "Q2KUoAc5atc2WYtbICKJjMAsp5f4jeU6INEPEX01Q01Wo",
        name: "Lamminchong Vaiphei (Teresa)",
        description: "GNM Nursing, Manipur",
    },
    {
        playbackId: "cHnp002L7AKgq0200j2tsWjgBKlrp194X6c02L02QvLwXYjY",
        name: "Lalnundiki",
        description: "GNM Nursing, Manipur",
    },
    {
        playbackId: "dim7WsUsD97AblnXEz2MimB6Eg02HqG9o9Ru3hKyaqUk",
        name: "Shrushti Pandey",
        description: "BSC Nursing, Ahmedabad",
    },
];

export default function Testimonials() {
    const playersRef = useRef<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePlay = (currentIndex: number) => {
        playersRef.current.forEach((player, index) => {
            if (player && index !== currentIndex) {
                player.pause();
            }
        });
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const cardWidth = 300; // approximate width of each card
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(Math.min(newIndex, testimonials.length - 1));
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollRef.current) {
            const cardWidth = 300;
            scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
            });
            setActiveIndex(index);
        }
    };

    return (
        <section id="testimonials" className="w-full bg-white pt-12 md:pt-20 pb-8 md:pb-10">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">

                <h2 className="mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900 text-center md:text-left">
                    Testimonials
                </h2>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
                    >
                        {testimonials.map((video, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 shrink-0 w-[280px] sm:w-[300px] md:w-auto m-2 md:m-4"
                            >
                                <div className="relative aspect-[9/16] w-full max-w-[330px] overflow-hidden rounded-xl border border-gray-200">
                                    <MuxPlayer
                                        ref={(el) => {
                                            playersRef.current[index] = el;
                                        }}
                                        playbackId={video.playbackId}
                                        streamType="on-demand"
                                        preload="none"
                                        className="h-full w-full"
                                        onPlay={() => handlePlay(index)}
                                    />
                                </div>

                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold text-xl mb-1 text-gray-900">
                                        {video.name}
                                    </h3>
                                    <p className="font-normal text-gray-700">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dot indicators - visible only on mobile */}
                    <div className="flex justify-center gap-2 mt-6 md:hidden">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                                        ? "bg-accent w-6"
                                        : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}