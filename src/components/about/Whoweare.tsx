export default function WhoWeAre() {
    return (
        <section className="flex flex-col gap-8 md:gap-12 px-4 sm:px-6 lg:px-20 py-8 md:py-10 w-full max-w-[1400px] mx-auto bg-white">
            {/* Text Content */}
            <div className="flex flex-col gap-4 md:gap-5 text-center md:text-left">
                {/* Heading */}
                <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight text-gray-900">
                    <span className="text-accent">Who</span> We Are
                </h2>

                {/* Description */}
                <div className="font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-900 space-y-4">
                    <p>
                        <span className="font-bold text-accent">Taldo</span> is a healthcare talent accelerator helping Indian nurses build long-term, successful careers global. Through our flagship program, <span className="font-bold text-accent">Gateway to Germany</span>, we prepare nurses with the language skills, professional readiness, and cultural understanding needed to integrate confidently into the German healthcare system.
                    </p>
                    <p>
                        We believe global mobility should be transparent, ethical, and supportive. With this foundation, Taldo bridges India’s skilled nursing workforce with Germany’s urgent need for qualified healthcare professionals.
                    </p>
                </div>
            </div>

            {/* Image */}
            {/* <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[437px] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                    src="/about/who-we-are.webp"
                    alt="German flag with historic building"
                    fill
                    className="object-cover"
                    priority
                />
            </div> */}
        </section>
    );
}
