import type React from "react";

// Arrow Component for simple chevrons
const Arrow = ({ direction = "right" }: { direction?: "right" | "down" | "left" }) => {
  const rotationClass = direction === "down" ? "rotate-90" : direction === "left" ? "rotate-180" : "";

  return (
    <div className={`flex items-center justify-center text-accent ${rotationClass}`} aria-hidden>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
        <path d="M10 8l4 4-4 4" />
      </svg>
    </div>
  );
};

// Process Card Component
const ProcessCard = ({
  icon,
  title,
  description,
  className = ""
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={`flex-1 rounded-2xl border border-[#e9e9e9] bg-[#f3f4ff] p-8 ${className}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#aeaff1] bg-[#5e72e4] md:h-16 md:w-16">
          {icon}
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-xl font-medium leading-[1.29] tracking-tight text-black md:text-[1.375rem]">
            {title}
          </h3>
          <p className="text-base font-normal leading-[1.29] tracking-tight text-black md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function RecruitmentPipeline() {
  const steps = [
    {
      title: "Requirement Mapping",
      description: "Understanding department-wise needs and timelines.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_807)">
            <path d="M26 21.5C26.8284 21.5 27.5 20.8285 27.5 20C27.5 19.1716 26.8284 18.5 26 18.5C25.1716 18.5 24.5 19.1716 24.5 20C24.5 20.8285 25.1716 21.5 26 21.5Z" fill="white" />
            <path d="M26 24C28.2091 24 30 22.2091 30 20C30 17.7909 28.2091 16 26 16C23.7909 16 22 17.7909 22 20C22 22.2091 23.7909 24 26 24Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 17.9999V23.9999C13 25.326 13.5268 26.5978 14.4645 27.5355C15.4021 28.4732 16.6739 28.9999 18 28.9999H21C22.3261 28.9999 23.5979 28.4732 24.5355 27.5355C25.4732 26.5978 26 25.326 26 23.9999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 4.99994H20V10.8962C20 14.7424 16.94 17.9499 13.0925 17.9999C12.1655 18.0122 11.2453 17.8402 10.3853 17.4939C9.52532 17.1476 8.74269 16.6339 8.08285 15.9827C7.42301 15.3314 6.8991 14.5556 6.54155 13.7003C6.184 12.8449 5.99992 11.927 6 10.9999V4.99994H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_807">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Sourcing & Screening",
      description: "Identifying qualified GNMs and BSc nurses and conducting multi-stage assessments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_819)">
            <path d="M1 12L16 4L31 12L16 20L1 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 12L23 15.7338V30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27 14.1338V20.7863C27.0006 21.0306 26.9116 21.2667 26.75 21.45C25.3375 23.0238 21.8875 26 16 26C10.1125 26 6.665 23.0238 5.25 21.45C5.08837 21.2667 4.99944 21.0306 5 20.7863V14.1338" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_819">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "German Language Training (A1–B2)",
      description: "Small batches, conversation-heavy modules, exam preparation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_830)">
            <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 27C6.42125 22.8162 10.8187 20 16 20C21.1813 20 25.5787 22.8162 28 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_830">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Shortlisting",
      description: "We present profiles only after clinical, communication, and cultural readiness checks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_861)">
            <path d="M16 16H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 24H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 16L7 18L11 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 24L7 26L11 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_861">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Documentation & Visa Coordination",
      description: "Full handling of paperwork, translations, and embassy formalities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_850)">
            <path d="M26 7H6C4.89543 7 4 7.89543 4 9V23C4 24.1046 4.89543 25 6 25H26C27.1046 25 28 24.1046 28 23V9C28 7.89543 27.1046 7 26 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 15H12C12 16.0609 12.4214 17.0783 13.1716 17.8284C13.9217 18.5786 14.9391 19 16 19C17.0609 19 18.0783 18.5786 18.8284 17.8284C19.5786 17.0783 20 16.0609 20 15H28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 11H28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_850">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Deployment & Integration",
      description: "Relocation support, onboarding assistance, and guidance until Anerkennung.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <g clipPath="url(#clip0_1_840)">
            <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 27C6.42125 22.8162 10.8187 20 16 20C21.1813 20 25.5787 22.8162 28 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1_840">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">
        {/* Heading Section */}
        <div className="mb-8 md:mb-12 flex flex-col gap-2 md:gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-tight tracking-tight text-gray-900">
            Hire Skilled, <span className="text-accent">German-Ready Nurses</span> from India
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-normal leading-relaxed tracking-tight text-gray-900">
            Taldo partners with hospitals, Pflegeheims, and healthcare networks in Germany to deliver a qualified, language-certified pipeline of nursing talent ready for integration.
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-medium leading-tight tracking-tight text-gray-900 mt-10">
            Our Recruitment <span className="text-accent">Workflow</span>
          </h2>
        </div>

        {/* Desktop: fixed grid with simple arrows (serpentine flow) */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4">
            <ProcessCard icon={steps[0].icon} title={steps[0].title} description={steps[0].description} />
            <Arrow direction="right" />
            <ProcessCard icon={steps[1].icon} title={steps[1].title} description={steps[1].description} />
            <Arrow direction="right" />
            <ProcessCard icon={steps[2].icon} title={steps[2].title} description={steps[2].description} />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
            <div />
            <div />
            <div />
            <div />
            <div className="flex justify-center"><Arrow direction="down" /></div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4">
            <ProcessCard icon={steps[5].icon} title={steps[5].title} description={steps[5].description} />
            <Arrow direction="left" />
            <ProcessCard icon={steps[4].icon} title={steps[4].title} description={steps[4].description} />
            <Arrow direction="left" />
            <ProcessCard icon={steps[3].icon} title={steps[3].title} description={steps[3].description} />
          </div>
        </div>

        {/* Mobile & Tablet: Vertical flow */}
        <div className="flex flex-col gap-4 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-stretch gap-3">
              <ProcessCard icon={step.icon} title={step.title} description={step.description} />
              {index < steps.length - 1 && <Arrow direction="down" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
