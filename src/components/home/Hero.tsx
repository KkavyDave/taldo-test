"use client";

import Image from "next/image";
import { useEnquiryModal } from "@/context/EnquiryModalContext"; 

export default function Hero() {
  const { openModal } = useEnquiryModal(); 

  return (
    <section className="w-full bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">
        <div className="relative flex flex-col lg:flex-row items-center justify-between overflow-hidden rounded-2xl lg:rounded-3xl bg-primary-light px-6 sm:px-8 lg:px-10">
          
          <div className="flex max-w-full lg:max-w-xl flex-col gap-4 sm:gap-6 py-8 sm:py-12 lg:py-16 text-center lg:text-left items-center lg:items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Build Your Nursing Career in Germany with Confidence
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-white/90">
                India&apos;s most transparent and ethical pathway for nurses to work in Germany. Your journey starts with <b>Gateway to Germany by Taldo.</b>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">

              {/* UPDATED BUTTON: Bold text, "FREE" emphasized */}
              <button
                onClick={openModal}
                className="flex w-fit items-center gap-3 rounded-full bg-white px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-gray-900 transition-all hover:bg-white/90 hover:shadow-lg cursor-pointer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                <span>Book your <span className="font-extrabold text-primary uppercase">FREE</span> consultation</span>
              </button>

            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[496px] w-full lg:w-[485px] shrink-0 lg:-mb-10">
            <Image src="/home/hero-img.webp" alt="Nurse with clipboard" fill className="object-cover object-top" priority />
          </div>
        </div>
      </div>
    </section>
  );
}