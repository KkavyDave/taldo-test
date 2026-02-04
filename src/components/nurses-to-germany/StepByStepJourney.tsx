export default function StepByStepJourney() {
    const steps = [
        { number: 1, text: "Enrollment & orientation" },
        { number: 2, text: "German training (A1–B2)" },
        { number: 3, text: "Conversational German + Exam Prep" },
        { number: 4, text: "Nursing & cultural readiness" },
        { number: 5, text: "Employer interviews" },
        { number: 6, text: "Documentation & visa filing" },
        { number: 7, text: "Travel & relocation" },
        { number: 8, text: "Post-arrival onboarding and recognition support" },
    ];

    return (
        <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
            {/* Background Wave Decorations */}
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="373" viewBox="0 0 1440 373" fill="none" className="w-full" preserveAspectRatio="none">
                    <path d="M1685 298.534L1624.97 261.301C1564.93 224.068 1444.87 149.602 1324.8 87.4699C1204.73 26.2682 1084.67 -24.9271 964.6 13.004C844.533 49.5388 724.467 175.2 604.4 211.735C484.333 249.666 364.267 198.471 244.2 211.735C124.133 224.068 4.06677 298.534 -55.9666 335.767L-116 373H-55.9666C4.06677 373 124.133 373 244.2 373C364.267 373 484.333 373 604.4 373C724.467 373 844.533 373 964.6 373C1084.67 373 1204.73 373 1324.8 373C1444.87 373 1564.93 373 1624.97 373H1685V298.534Z" fill="#DFE4FF" fillOpacity={0.28} />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="373" viewBox="0 0 1440 373" fill="none" className="w-full" preserveAspectRatio="none">
                    <path d="M-116 298.534L-55.9667 261.301C4.06667 224.068 124.133 149.602 244.2 87.4699C364.267 26.2682 484.333 -24.9271 604.4 13.004C724.467 49.5388 844.533 175.2 964.6 211.735C1084.67 249.666 1204.73 198.471 1324.8 211.735C1444.87 224.068 1564.93 298.534 1624.97 335.767L1685 373H1624.97C1564.93 373 1444.87 373 1324.8 373C1204.73 373 1084.67 373 964.6 373C844.533 373 724.467 373 604.4 373C484.333 373 364.267 373 244.2 373C124.133 373 4.06667 373 -55.9667 373H-116V298.534Z" fill="#F6F8FF" />
                </svg>
            </div>

            {/* Title */}
            <div className="relative z-10 mx-auto mb-8 md:mb-12 max-w-4xl px-4 sm:px-6">
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-tight tracking-tight text-gray-900">
                    <span>Our Step-by-Step </span>
                    <span className="text-accent">Journey</span>
                </h2>
            </div>

            {/* Steps Grid */}
            <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6">
                {steps.map((step) => (
                    <div key={step.number} className="flex items-center">
                        {/* Number Circle */}
                        <div className="relative z-10 -mr-6 md:-mr-7 flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full border border-solid border-accent bg-white p-1">
                            <p className="flex h-full w-full items-center justify-center rounded-full bg-accent text-sm md:text-base font-medium text-white">
                                {step.number}
                            </p>
                        </div>
                        {/* Text Box */}
                        <div className="flex h-10 md:h-12 lg:h-14 flex-1 items-center rounded-r-xl md:rounded-r-2xl bg-accent py-2 md:py-2.5 pl-8 md:pl-9 pr-3">
                            <p className="text-sm md:text-base font-medium leading-tight tracking-tight text-white">
                                {step.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-8 md:mt-12 flex justify-center px-4 sm:px-6">
                <p className="text-gray-900 sm:text-base lg:text-xl md:text-xl font-medium">A guided pathway from India to <span className="text-accent">Germany</span>.</p>
            </div>
        </section>
    );
}
