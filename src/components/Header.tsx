"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEnquiryModal } from "@/context/EnquiryModalContext"; 

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Recruiters", href: "/recruiters" },
  { name: "Nurses to Germany", href: "/nurses-to-germany" },
  { name: "Webinar", href: "/webinar" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useEnquiryModal(); 

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full font-sans bg-white">
      <div className="mx-auto flex h-16 md:h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-20">
        
        <Link href="/" className="flex-shrink-0">
          <Image src="/Taldo_Horizontal Logo 1.svg" alt="Taldo" width={104} height={38} className="h-8 w-auto md:h-10" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm xl:text-base font-medium text-gray-900 transition-colors hover:text-primary ${isActive(item.href) ? "underline underline-offset-4 decoration-2 decoration-gray-900" : ""}`}
            >
              {item.name}
            </Link>
          ))}

          {/* UPDATED BUTTON: Bigger Text, Bold */}
          <button
            onClick={openModal}
            className="flex h-11 items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-white transition-colors hover:bg-primary-dark cursor-pointer tracking-wide"
          >
            Enquire Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-900">
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary" : "text-gray-900 hover:bg-gray-100"}`}
              >
                {item.name}
              </Link>
            ))}

            {/* UPDATED MOBILE BUTTON */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openModal();
              }}
              className="mt-4 flex w-full h-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white transition-colors hover:bg-primary-dark tracking-wide"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}