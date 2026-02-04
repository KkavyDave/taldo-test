import Image from "next/image";

const allBenefits = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_1)">
          <path d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M37.5 10H2.5V30H37.5V10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M37.5 16.25C35.9386 15.9854 34.4981 15.2416 33.3783 14.1217C32.2584 13.0019 31.5146 11.5614 31.25 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31.25 30C31.5146 28.4386 32.2584 26.9981 33.3783 25.8783C34.4981 24.7584 35.9386 24.0146 37.5 23.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 23.75C4.06143 24.0146 5.50188 24.7584 6.62173 25.8783C7.74157 26.9981 8.48535 28.4386 8.75 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.75 10C8.48535 11.5614 7.74157 13.0019 6.62173 14.1217C5.50188 15.2416 4.06143 15.9854 2.5 16.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_1">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Attractive salary",
    description: "Starting salary of INR 3 Lakhs / month",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_2)">
          <path d="M32.5 8.75H7.5C6.11929 8.75 5 9.86929 5 11.25V28.75C5 30.1307 6.11929 31.25 7.5 31.25H32.5C33.8807 31.25 35 30.1307 35 28.75V11.25C35 9.86929 33.8807 8.75 32.5 8.75Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 18.75H15C15 20.0761 15.5268 21.3479 16.4645 22.2855C17.4021 23.2232 18.6739 23.75 20 23.75C21.3261 23.75 22.5979 23.2232 23.5355 22.2855C24.4732 21.3479 25 20.0761 25 18.75H35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 13.75H35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_2">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Permanent Residency",
    description: "typically in 3–5 years",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_3)">
          <path d="M6.25 33.75H33.75V18.75C33.7501 18.5858 33.7179 18.4232 33.6552 18.2714C33.5924 18.1197 33.5004 17.9818 33.3844 17.8656L20.8844 5.36563C20.7683 5.24941 20.6304 5.15721 20.4787 5.09431C20.3269 5.0314 20.1643 4.99902 20 4.99902C19.8357 4.99902 19.6731 5.0314 19.5213 5.09431C19.3696 5.15721 19.2317 5.24941 19.1156 5.36563L6.61563 17.8656C6.49958 17.9818 6.40756 18.1197 6.34483 18.2714C6.28209 18.4232 6.24987 18.5858 6.25 18.75V33.75Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_3">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Work-life balance",
    description: "Regulated 38-40 hour workweeks",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_6)">
          <path d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 10V20L26.25 23.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_6">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Paid Overtime",
    description: "Get paid INR 1500+ / hour for overtime",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_5)">
          <path d="M12.5 31.25C15.2614 31.25 17.5 29.0114 17.5 26.25C17.5 23.4886 15.2614 21.25 12.5 21.25C9.73858 21.25 7.5 23.4886 7.5 26.25C7.5 29.0114 9.73858 31.25 12.5 31.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.5 15C15.2614 15 17.5 12.7614 17.5 10C17.5 7.23858 15.2614 5 12.5 5C9.73858 5 7.5 7.23858 7.5 10C7.5 12.7614 9.73858 15 12.5 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M27.5 31.25C30.2614 31.25 32.5 29.0114 32.5 26.25C32.5 23.4886 30.2614 21.25 27.5 21.25C24.7386 21.25 22.5 23.4886 22.5 26.25C22.5 29.0114 24.7386 31.25 27.5 31.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 35C5.87325 33.8357 7.0056 32.8906 8.30737 32.2397C9.60914 31.5889 11.0446 31.25 12.5 31.25C13.9554 31.25 15.3909 31.5889 16.6926 32.2397C17.9944 32.8906 19.1267 33.8357 20 35C20.8733 33.8357 22.0056 32.8906 23.3074 32.2397C24.6091 31.5889 26.0446 31.25 27.5 31.25C28.9554 31.25 30.3909 31.5889 31.6926 32.2397C32.9944 32.8906 34.1267 33.8357 35 35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M27.5 15C30.2614 15 32.5 12.7614 32.5 10C32.5 7.23858 30.2614 5 27.5 5C24.7386 5 22.5 7.23858 22.5 10C22.5 12.7614 24.7386 15 27.5 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 18.75C5.87325 17.5857 7.0056 16.6406 8.30737 15.9897C9.60914 15.3389 11.0446 15 12.5 15C13.9554 15 15.3909 15.3389 16.6926 15.9897C17.9944 16.6406 19.1267 17.5857 20 18.75C20.8733 17.5857 22.0056 16.6406 23.3074 15.9897C24.6091 15.3389 26.0446 15 27.5 15C28.9554 15 30.3909 15.3389 31.6926 15.9897C32.9944 16.6406 34.1267 17.5857 35 18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_5">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Family reunification",
    description: "Invite your spouse and children",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#clip0_ntg_4)">
          <path d="M35 32.5H5V7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31.25 11.25L20 22.5L15 17.5L5 27.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31.25 17.5V11.25H25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ntg_4">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Social benefits",
    description: "Free education, healthcare and subsidized benefits",
  },
];

export default function NursesToGermanyHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nurses-to-germany/hero-bg.webp"
          alt="Nurse background"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,#000_150.06%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Why Nurses Should Build Their Careers in Germany
          </h1>
          <p className="max-w-5xl mx-auto md:mx-0 text-sm sm:text-base leading-relaxed text-white/90">
            Germany continues to face one of the largest healthcare staffing shortages in Europe, with a projected requirement of over 300,000 nurses by 2030. This makes it one of the strongest and most stable destinations for Indian nurses seeking a global career. Key benefits include:
          </p>
        </div>

        {/* Benefits Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {allBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-2 rounded-xl md:rounded-2xl bg-white/10 p-4 backdrop-blur-sm items-center md:items-start text-center md:text-left"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 md:h-14 md:w-14 lg:h-[60px] lg:w-[60px] items-center justify-center rounded-lg md:rounded-xl border border-white/30 bg-transparent">
                {benefit.icon}
              </div>
              {/* Content */}
              <div className="mt-2 flex flex-col gap-1 md:gap-2 items-center md:items-start">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="py-8 flex justify-center md:justify-start">
          <p className="max-w-5xl text-center md:text-left text-sm sm:text-base leading-relaxed text-white/90">
            Germany offers a stable, dignified, well-structured future for nurses ready to build their careers internationally.
          </p>
        </div>

      </div>
    </section>
  );
}
