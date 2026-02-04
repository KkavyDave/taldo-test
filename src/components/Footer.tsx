import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    sections: [
      {
        title: "NAVIGATION",
        links: [
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
          { name: "Recruiters", href: "/recruiters" },
          { name: "Nurses to Germany", href: "/nurses-to-germany" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "RESOURCES",
        links: [
          { name: "Blog", href: "/blog" },
          { name: "Webinar", href: "/webinar" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "GET IN TOUCH",
        links: [
          { name: "contact@taldo.co", href: "mailto:contact@taldo.co" },
          { name: "+91 9818956623", href: "tel:+919818956623" },
          { name: "1102, Tower A, Goregaon One Aspect, Goregaon West, Mumbai - 400104", href: "https://maps.google.com/?q=1102,_Tower_A,_Goregaon_One_Aspect,_Goregaon_West,_Mumbai_400104" },
        ],
      },
    ],
  },
];

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
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
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
  return (
    <footer className="w-full bg-[#E8ECF7] rounded-2xl">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="shrink-0 lg:w-1/5">
              <Link href="/">
                <Image
                  src="/Taldo_Horizontal Logo 1.svg"
                  alt="Taldo"
                  width={104}
                  height={38}
                  className="h-8 w-auto md:h-10"
                />
              </Link>
            </div>
            <p className="mt-5"> Taldo is a transparent and ethical career accelerator for professionals pursuing global careers</p>
            {/* Social Links */}
            <div className="flex items-center gap-6 md:gap-10 mt-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-text transition-colors hover:text-primary"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-8 md:gap-12 lg:w-1/5 w-full items-center lg:items-start">
              {column.sections.map((section) => (
                <div key={section.title} className="flex flex-col items-center lg:items-start w-full">
                  <h4 className="mb-3 md:mb-4 text-base md:text-lg font-semibold tracking-wide text-gray-900 text-center lg:text-left">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col gap-1.5 md:gap-2 items-center lg:items-start w-full">
                    {section.links.map((link) => (
                      <li key={link.name} className="w-full text-center lg:text-left">
                        <Link
                          href={link.href}
                          className="text-xs md:text-sm text-gray-text transition-colors hover:text-primary"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Divider */}
      <div className="w-full h-px bg-gray-200" />

      {/* Bottom Section */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20 py-6 md:py-8">
        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-text text-center">
          ©2026 Taldo. All rights reserved
        </p>
      </div>
    </footer>
  );
}
