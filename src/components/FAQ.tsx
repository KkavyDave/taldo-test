"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who is eligible?",
    answer: "GNM, BSc, Post BSC Nursing & MSC Nursing graduates with valid registration.",
  },
  {
    question: "What salary can I expect?",
    answer: "Pre-recognition salary of ~ INR 2.5 Lakhs / month and Post-recognition salary of ~ INR 3.5 Lakhs. Additional over-time pay of about ~ INR 1500 / hour.",
  },
  {
    question: "Do I need German skills before joining?",
    answer: "No prior German knowledge is required. We provide comprehensive German language training from A1 to B2 level as part of the program.",
  },
  {
    question: "How long does the process take?",
    answer: "Around 9–14 months depending on your language training progress, examination and Visa process.",
  },
  {
    question: "Is there a job guarantee?",
    answer: "Yes, we guarantee employer interviews and job placement assistance for all candidates who successfully complete the program and qualify B2 exam.",
  },
  {
    question: "Can I take my family later?",
    answer: "Yes, once you are settled in Germany, you can apply for family reunification to bring your spouse and children.",
  },
  {
    question: "Is the training online or offline?",
    answer: "We offer both online and offline training options (at select centres) to suit your convenience and learning preferences.",
  },
  {
    question: "What if I fail an exam?",
    answer: "We provide additional support and re-training if needed. Our goal is to ensure your success throughout the program.",
  },
  {
    question: "Are there hidden charges?",
    answer: "No, we maintain complete transparency. All costs are communicated upfront with no hidden fees.",
  },
];

export default function FAQ() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="w-full bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20 flex flex-col items-center">
        {/* Title */}
        <h2 className="mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900 text-center">
          Frequently Asked Questions
        </h2>

        {/* FAQ Content */}
        <motion.div
          layout
          className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center w-full"
        >
          {/* Questions List */}
          <motion.div layout className="flex w-full lg:w-1/2 flex-col gap-0 items-center">
            <div className="flex flex-col bg-white rounded-xl border-2 border-gray-100 w-full max-w-xl">
              {displayedFaqs.map((faq, index) => (
                <div key={index} className="border-b-2 border-gray-100">
                  <button
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                    className={`flex w-full min-h-16 md:min-h-[72px] items-center justify-between px-3 md:px-4 py-3 cursor-pointer transition-all ${selectedIndex === index
                      ? "bg-accent/10"
                      : "bg-white hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full shrink-0 ${selectedIndex === index
                          ? "bg-accent"
                          : "bg-accent/40"
                          }`}
                      />
                      <span
                        className={`text-left text-base md:text-lg ${selectedIndex === index
                          ? "font-medium text-gray-900"
                          : "text-gray-900"
                          }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={selectedIndex === index ? "#3B5BDB" : "#B8C0E8"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 transition-transform duration-300 ease-out
 ${selectedIndex === index ? "rotate-90" : ""
                        }`}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {/* ✅ Mobile inline answer */}
                  <AnimatePresence>
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="block lg:hidden overflow-hidden px-4"
                      >
                        <div className="pb-4 pt-4 text-sm leading-relaxed text-gray-900">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}

            </div>

            {/* Show More/Less Button */}
            {faqs.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 px-4 py-2 text-sm md:text-base font-medium text-accent hover:text-accent/80 transition-colors text-center self-center">
                {showAll ? "Show Less" : `Show ${faqs.length - 5} More Questions`}
              </button>
            )}
          </motion.div>

          {/* Answer Panel */}
          <AnimatePresence mode="popLayout">
            {selectedIndex !== null && (
              <motion.div
                layout
                key="answer-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: {
                    duration: 0.45,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                }}
                className="hidden lg:block h-fit w-full lg:w-1/2 rounded-xl md:rounded-2xl bg-card-bg p-6 md:p-8 lg:p-10 shadow-sm text-center"
              >
                <h3 className="mb-4 md:mb-5 text-lg md:text-xl font-semibold text-gray-900">
                  {faqs[selectedIndex].question}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-900">
                  {faqs[selectedIndex].answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section >
  );
}
