"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEnquiryModal } from "@/context/EnquiryModalContext";
import { ArrowRight } from "lucide-react";

// Social Links Data
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61580703027757#",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/taldocareers/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="22" height="22" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@TaldoCareers",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="5" width="22" height="14" rx="3" ry="3" />
        <polygon points="10,16 16,12 10,8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/taldocareers/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { openModal } = useEnquiryModal();
  const pathname = usePathname();
  
  // Logic: Show CTA only on non-home pages
  const showFooterCTA = pathname !== "/"; 

  return (
    <footer className="w-full bg-[#E8ECF7]">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-16 pb-8">
        
        {/* GRID LAYOUT */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${showFooterCTA ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-8`}>
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start pt-6">
            <Link href="/" className="mb-6">
              <Image
                src="/Taldo_Horizontal Logo 1.svg"
                alt="Taldo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Taldo is a transparent and ethical career accelerator for professionals pursuing global careers.
            </p>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-[#5E72E4]"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="pt-6">
            <h4 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">About Us</Link></li>
              <li><Link href="/recruiters" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">Recruiters</Link></li>
              <li><Link href="/nurses-to-germany" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">Nurses to Germany</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="pt-6">
            <h4 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Resources
            </h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">Blogs</Link></li>
              <li><Link href="/webinar" className="text-gray-600 hover:text-[#5E72E4] transition-colors text-sm">Webinars</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="pt-6">
            <h4 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <a href="mailto:contact@taldo.co" className="hover:text-[#5E72E4] transition-colors">contact@taldo.co</a>
              </li>
              <li>
                <a href="tel:+919818956623" className="hover:text-[#5E72E4] transition-colors">+91 9818956623</a>
              </li>
              <li className="leading-relaxed">
                1102, Tower A, Goregaon One Aspect,<br />
                Goregaon West, Mumbai - 400104
              </li>
            </ul>
          </div>

          {/* Column 5: CTA (Hidden on Home Page) */}
          {showFooterCTA && (
            <div className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-white/50 h-fit">
                <h4 className="mb-3 text-lg font-bold text-[#2B3656]">
                Start Your Journey
                </h4>
                <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                Ready to work in Germany? Get your free profile assessment today.
                </p>
                <button
                onClick={openModal}
                // Updated text and handled layout for longer button
                className="w-full flex items-center justify-center gap-2 bg-[#5E72E4] hover:bg-[#4758b8] text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 text-sm text-center"
                >
                Book your FREE Consultation <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
            </div>
          )}

        </div>
      </div>

      <div className="w-full h-px bg-gray-200" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
        <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
          © 2026 Taldo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}