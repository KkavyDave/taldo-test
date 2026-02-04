"use client";

import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

export default function Team() {
    const teamMembers = [
        {
            name: "Nirav Devpura",
            image: "/about/nirav-devpura.webp",
            description: "Nirav is an MBA from MDI Gurgaon and an engineer from DAU, with 10+ years of experience across Dream11 and KPMG. He leads strategy, partnerships, and operations, and has mentored 50+ students in long-term career development.",
            icon: Linkedin,
            link: "https://www.linkedin.com/in/niravdevpura/"
        },
        {
            name: "Sweta Jain",
            image: "/about/sweta-jain.webp",
            description: "Sweta is a qualified actuary and language expert, proficient in 3 international languages, including Spanish (B2), Korean (Level 3), and German. She has taught 100+ students and leads training quality, cultural orientation, and candidate mentorship.",
            icon: Instagram,
            link: "https://www.instagram.com/multilingual_mahila/"
        }
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-20 py-8 md:py-10 w-full max-w-[1400px] mx-auto bg-white">
            <div className="flex flex-col gap-6 md:gap-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:gap-5 text-center md:text-left">
                    {/* Heading */}
                    <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight text-gray-900">
                        Meet the <span className="text-accent">Team</span>
                    </h2>

                    {/* Description */}
                    <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-900">
                        Taldo is led by Nirav Devpura and Sweta Jain, bringing together structured business leadership and deep linguistic expertise.
                    </p>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
                    {teamMembers.map((member) => {
                        const Icon = member.icon;
                        return (
                            <div key={member.name} className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left">
                                {/* Image */}
                                <div className="relative w-48 sm:w-48 md:w-56 lg:w-60 h-64 sm:h-72 md:h-80 lg:h-[363px] rounded-xl md:rounded-2xl overflow-hidden shrink-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <h3 className="font-semibold text-xl md:text-2xl leading-tight tracking-tight text-gray-900">
                                            {member.name}
                                        </h3>
                                        <Icon
                                            className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black transition"
                                            onClick={() => window.open(member.link, "_blank")}
                                        />
                                    </div>
                                    <p className="font-normal text-base md:text-lg lg:text-lg leading-relaxed tracking-tight text-gray-900">
                                        {member.description}
                                    </p>

                                </div>
                            </div>

                        )
                    })}
                </div>

                <div>
                    {/* Description */}
                    <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-900 py-3">
                        Together, they ensure Taldo remains personal, transparent, and focused on successful global careers for nurses.
                    </p>
                </div>

            </div>
        </section>
    );
}
