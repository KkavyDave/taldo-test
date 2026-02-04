import Image from "next/image";
import Link from "next/link";

const bulletPoints = [
  "Browse from numerous career opportunities and select one that suits you best",
  "Get support from training & paperwork to relocation & settling down in a new country",
  "Expert advice & tips, mock interviews and all round training for cracking the interview process",
];

export default function StartCareer() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 px-4 sm:px-6 lg:px-20">
        {/* Left Content */}
        <div className="flex max-w-full lg:max-w-xl flex-col text-center lg:text-left items-center lg:items-start">
          {/* Title */}
          {/* <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900">
            Start Your <span className="text-accent">International</span> Career Today
          </h2> */}

          {/* Bullet Points */}
          <ul className="mb-6 md:mb-8 flex flex-col gap-3 md:gap-4 text-left">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                <span className="text-base md:text-lg leading-relaxed text-gray-900">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="flex w-fit mx-auto lg:mx-0 items-center gap-3 rounded-full bg-accent px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
            Apply now
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[462px] w-full lg:w-[616px] shrink-0 overflow-hidden rounded-2xl lg:rounded-3xl">
          <Image
            src="/home/career-img.webp"
            alt="Professional handshake"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
