"use client";

import { useEnquiryModal } from "@/context/EnquiryModalContext";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  const { openModal } = useEnquiryModal();

  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Container matches Navbar width (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2B3656] px-6 py-16 sm:px-16 sm:py-20 text-center shadow-2xl shadow-blue-900/20">
          
          {/* Background Decor */}
          <div className="absolute top-0 left-0 -ml-10 -mt-10 h-64 w-64 rounded-full bg-[#5E72E4] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-10 -mb-10 h-64 w-64 rounded-full bg-[#25D366] opacity-10 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-blue-100 border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>2026 Admissions Closing Soon</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Still thinking about Germany?
            </h2>
            
            <p className="mb-10 text-lg text-blue-100 sm:text-xl leading-relaxed max-w-2xl">
              Don't let paperwork stop your career growth. We handle the process, you focus on the nursing. Get your free roadmap today.
            </p>

            <button
              onClick={openModal}
              className="group flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-bold text-[#2B3656] transition-all hover:bg-blue-50 hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-black/25"
            >
              <span>Book your FREE Consultation</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-6 text-sm font-medium text-white/40">
              No hidden fees • 100% Transparent Process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}