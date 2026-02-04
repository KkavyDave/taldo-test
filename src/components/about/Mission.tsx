export default function Mission() {
    return (
        <>
            <section className="px-4 sm:px-6 lg:px-20 py-8 md:py-10 w-full max-w-[1400px] mx-auto bg-white">
                <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
                    {/* Heading */}
                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight text-gray-900">
                        Our <span className="text-accent">Mission</span>
                    </h2>

                    {/* Description */}
                    <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-900">
                        To empower Indian nurses with world-class training and complete end-to-end support so they can build meaningful careers in Germany while helping German healthcare institutions address critical staffing shortages.
                    </p>
                </div>
            </section>
            <section className="px-4 sm:px-6 lg:px-20 py-8 md:py-10 w-full max-w-[1400px] mx-auto bg-white">
                <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
                    {/* Heading */}
                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight text-gray-900">
                        Our <span className="text-accent">Vision</span>
                    </h2>

                    {/* Description */}
                    <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-900">
                        To become India’s most trusted pathway for nurses aspiring to work in Germany, and the preferred partner for healthcare employers seeking skilled, pre-trained, and culturally prepared talent.
                    </p>
                </div>
            </section>
        </>
    );
}
