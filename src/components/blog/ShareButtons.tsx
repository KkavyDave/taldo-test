'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ShareButtonsProps {
    title: string;
    variant?: 'desktop' | 'mobile';
}

export default function ShareButtons({ title, variant = 'mobile' }: ShareButtonsProps) {
    const [shareLinks, setShareLinks] = useState({
        twitter: '#',
        facebook: '#',
        email: '#',
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href;
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedTitle = encodeURIComponent(title);

        setShareLinks({
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
        });
    }, [title]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (variant === 'desktop') {
        return (
            <div className="hidden xl:flex absolute right-6 top-32 flex-col gap-4 items-center z-10">
                <p className="font-normal text-base leading-relaxed text-gray-900 mb-1">
                    Share
                </p>
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-11 md:h-11 hover:opacity-70 transition-opacity"
                    aria-label="Share on Twitter"
                >
                    <Image
                        src="/blog/Twitter.svg"
                        alt="Twitter"
                        width={46}
                        height={46}
                    />
                </a>
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-11 md:h-11 hover:opacity-70 transition-opacity"
                    aria-label="Share on Facebook"
                >
                    <Image
                        src="/blog/Facebook.svg"
                        alt="Facebook"
                        width={46}
                        height={46}
                    />
                </a>
                <a
                    href={shareLinks.email}
                    className="w-10 h-10 md:w-11 md:h-11 hover:opacity-70 transition-opacity"
                    aria-label="Share via Email"
                >
                    <Image
                        src="/blog/Mail.svg"
                        alt="Mail"
                        width={46}
                        height={46}
                    />
                </a>
                <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 md:w-11 md:h-11 hover:opacity-70 transition-opacity flex items-center justify-center rounded-full bg-[#f5f5f5] border border-[#e5e5e5]"
                    aria-label="Copy link"
                    title={copied ? 'Copied!' : 'Copy link'}
                >
                    {copied ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    )}
                </button>
            </div>
        );
    }

    return (
        <div className="xl:hidden flex flex-row gap-4 items-center justify-center mt-10 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-gray-300">
            <p className="font-normal text-sm md:text-base leading-relaxed text-gray-900">
                Share:
            </p>
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-70 transition-opacity"
                aria-label="Share on Twitter"
            >
                <Image
                    src="/blog/Twitter.svg"
                    alt="Twitter"
                    width={40}
                    height={40}
                />
            </a>
            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-70 transition-opacity"
                aria-label="Share on Facebook"
            >
                <Image
                    src="/blog/Facebook.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                />
            </a>
            <a
                href={shareLinks.email}
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-70 transition-opacity"
                aria-label="Share via Email"
            >
                <Image
                    src="/blog/Mail.svg"
                    alt="Mail"
                    width={40}
                    height={40}
                />
            </a>
            <button
                onClick={handleCopyLink}
                className="w-8 h-8 md:w-10 md:h-10 hover:opacity-70 transition-opacity flex items-center justify-center rounded-full bg-[#f5f5f5] border border-[#e5e5e5]"
                aria-label="Copy link"
                title={copied ? 'Copied!' : 'Copy link'}
            >
                {copied ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e72e4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e72e4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                )}
            </button>
        </div>
    );
}
