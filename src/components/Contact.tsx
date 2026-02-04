"use client";

import { useState } from "react";
// Import the new server action
import { saveJobSeekerAction } from "@/app/actions/save-job-seeker";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const educationOptions = [
  "BSC Nursing",
  "MSC Nursing",
  "GNM",
  "Post BSC Nursing",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    education: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // --- NEW LOGIC: Call Server Action instead of Web3Forms ---
      const result = await saveJobSeekerAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        qualification: formData.education, // Map 'education' to 'qualification'
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Thank you! Your enquiry has been submitted successfully.",
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          state: "",
          education: "",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit form. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">
        <div className="relative lg:flex-row items-center justify-between overflow-hidden rounded-2xl lg:rounded-3xl bg-[#2B3656] px-6 sm:px-8 lg:px-12 py-12 mb-7">
          {/* Title */}
          <h2 className="mb-8 md:mb-10 text-2xl sm:text-3xl md:text-[32px] font-bold text-white text-center md:text-left">
            Job Seeker Enquiry
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
            {/* Row 1: Name, Phone, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Job Seeker Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  Job Seeker Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 md:px-5 text-base text-gray-900 placeholder:text-gray-500 focus:border-accent focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => {
                    if (!formData.phone) {
                      setFormData({ ...formData, phone: "+91 " });
                    }
                  }}
                  required
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 md:px-5 text-base text-gray-900 placeholder:text-gray-500 focus:border-accent focus:outline-none"
                />
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 md:px-5 text-base text-gray-900 placeholder:text-gray-500 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: State, Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* State */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 md:px-5 text-base text-gray-900 focus:border-accent focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "3rem",
                  }}
                >
                  <option value="">Select your state</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Education */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">
                  Education <span className="text-red-500">*</span>
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 md:px-5 text-base text-gray-900 focus:border-accent focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "3rem",
                  }}
                >
                  <option value="">Select your qualification</option>
                  {educationOptions.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`rounded-md px-4 py-3 text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-2 md:mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-fit rounded-full bg-white px-8 md:px-10 py-3 md:py-3.5 text-base font-medium text-primary transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}