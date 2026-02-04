export default function CoreValues() {
    const values = [
        {
            title: "Integrity",
            description: "We do what we say, and we honour every commitment.",
            icon: (
                <svg className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Transparency",
            description: "Every step, fee, and requirement is documented and explained upfront.",
            icon: (
                <svg className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Empathy",
            description: "We support each nurse as an individual, understanding the emotional and professional challenges of relocating abroad.",
            icon: (
                <svg className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.42 4.58C19.3 3.46 17.8 2.75 16.19 2.75C14.58 2.75 13.08 3.46 11.96 4.58L12 4.62L12.04 4.58C10.92 3.46 9.42 2.75 7.81 2.75C6.2 2.75 4.7 3.46 3.58 4.58C1.22 6.94 1.22 10.76 3.58 13.12L12 21.35L20.42 13.12C22.78 10.76 22.78 6.94 20.42 4.58Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Accountability",
            description: "We take responsibility for the outcomes of our training, processes, and candidate support.",
            icon: (
                <svg className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: "Impact",
            description: "We focus on life-changing opportunities that strengthen careers and healthcare systems.",
            icon: (
                <svg className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 7H21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 20L15 17M17 12L20 9M8 16L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-20 py-8 md:py-10 w-full max-w-[1400px] mx-auto bg-white">
            <div className="flex flex-col gap-6 md:gap-8">
                {/* Heading */}
                <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight text-gray-900 text-center md:text-left">
                    Our <span className="text-accent">Core Values</span>
                </h2>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
                    {values.map((value, index) => (
                        <div key={index} className="flex-1">
                            <div className="bg-primary-light rounded-xl md:rounded-2xl p-4 md:p-5 h-full flex flex-col gap-2.5 items-center text-center text-white">
                                {/* Icon */}
                                {value.icon}

                                <h3 className="font-medium text-lg md:text-xl lg:text-2xl leading-tight tracking-tight">
                                    {value.title}
                                </h3>
                                <p className="font-normal text-sm md:text-base lg:text-base leading-relaxed tracking-tight">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
