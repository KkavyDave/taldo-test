import Link from "next/link";

export default function WhyTaldo() {
  const benefits = [
    {
      title: "High-Quality, Verified Candidates",
      // description: "Access to thoroughly vetted nursing professionals ready for German healthcare standards."
    },
    {
      title: "Predictable, Quarterly Talent Pipelines",
      // description: "Consistent supply of qualified candidates delivered on schedule to meet your staffing needs."
    },
    {
      title: "Fully-compliant with German regulations",
      // description: "Complete adherence to all legal requirements and regulations for international recruitment."
    },
    {
      title: "Reduction in drop-outs through Counselling",
      // description: "Through comprehensive counselling and mentorship programs ensuring candidate commitment."
    },
    {
      title: "End-to-End Administrative Support",
      // description: "From documentation to visa processing, we handle all paperwork and bureaucracy."
    },
    {
      title: "Consistent Communication & Structured Reporting",
      // description: "Regular updates and transparent progress tracking throughout the recruitment process."
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-tight tracking-tight text-gray-900">
            Why Partner with <span className="text-accent">Taldo</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-normal leading-relaxed tracking-tight text-gray-text max-w-3xl">
            Your trusted partner for reliable, compliant, and efficient international nurse recruitment
          </p>

        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex min-h-full flex-1 flex-col items-start gap-3 overflow-clip rounded-xl md:rounded-2xl border border-solid border-accent/40 bg-card-bg px-4 py-4"
            >
              <div className="flex items-center gap-3 w-full justify-center md:justify-start">
                <div className="relative h-5 w-5 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0829E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-['Albert_Sans',sans-serif] text-[20px] font-medium leading-[1.39] tracking-[-0.4px] text-[#0829e6]">
                  {benefit.title}
                </p>
              </div>
              {/* <ul className="text-sm md:text-base lg:text-lg font-normal leading-relaxed tracking-tight text-gray-900 lg:pl-6 text-center lg:text-left">
                <li>
                  {benefit.description}
                </li>
              </ul> */}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            href="https://calendar.app.google/MA13LWvgFHEQdiQt8"
            className="flex items-center gap-3 rounded-full bg-accent px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all hover:bg-primary-dark hover:shadow-lg"
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
            Talk to our Founders
          </Link>
        </div>

      </div>
    </section>
  );
}
