'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

interface Blog {
    id: string;
    title: string;
    date: string;
    image: string;
}

interface OtherBlogsProps {
    blogs: Blog[];
    currentBlogId?: string;
    heading: string;
    limit?: number;
}

export default function OtherBlogs({ blogs, currentBlogId, heading, limit }: OtherBlogsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Filter out current blog if on individual blog page
    let displayBlogs = currentBlogId
        ? blogs.filter(blog => blog.id !== currentBlogId)
        : blogs;

    // Apply limit if provided
    if (limit) {
        displayBlogs = displayBlogs.slice(0, limit);
    }

    // Check scroll position to show/hide navigation buttons
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [displayBlogs]);

    // Scroll left/right by one card width + gap
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 380 + 28;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full bg-white py-12 md:py-16 lg:py-20">
            {/* Section Title and Navigation Buttons */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 mb-6">
                <div className="flex items-center justify-center md:justify-between flex-col md:flex-row gap-4">
                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-900 text-center md:text-left">
                        {heading}
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-900 transition-all hover:bg-gray-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
                            aria-label="Scroll left"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-900 transition-all hover:bg-gray-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
                            aria-label="Scroll right"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Blog Container */}
            <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto scrollbar-hide"
            >
                <div
                    className="flex gap-4 md:gap-6 lg:gap-7"
                    style={{
                        paddingLeft: 'max(1rem, calc((100vw - 1400px) / 2 + 5rem))'
                    }}
                >
                    {displayBlogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.id}`}
                            className="group flex flex-col flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-[380px]"
                        >
                            {/* Blog Image */}
                            <div className="relative w-full aspect-[400/310] rounded-lg md:rounded-xl overflow-hidden bg-gray-200 mb-4 md:mb-6">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Blog Info */}
                            <div className="flex flex-col gap-2 md:gap-3">
                                {/* Date */}
                                <p className="font-normal text-sm md:text-base lg:text-lg leading-tight text-gray-900">
                                    {blog.date}
                                </p>

                                {/* Title */}
                                <h3 className="font-bold text-base md:text-lg lg:text-xl leading-snug text-gray-900 group-hover:opacity-70 transition-opacity">
                                    {blog.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                    {/* Spacer to create equal padding on the right */}
                    <div className="flex-shrink-0 w-4 sm:w-6 lg:w-20" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
