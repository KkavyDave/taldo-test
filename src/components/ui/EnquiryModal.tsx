"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react"; 
import { useEnquiryModal } from "@/context/EnquiryModalContext";
// 1. IMPORT YOUR SERVER ACTION
import { saveJobSeekerAction } from "@/app/actions/save-job-seeker"; 

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Delhi"
];

const educationOptions = [
  "BSC Nursing", "MSC Nursing", "GNM", "Post BSC Nursing"
];

export function EnquiryModal() {
  const { isOpen, closeModal } = useEnquiryModal();
  
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", state: "", education: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // 2. CALL YOUR SERVER ACTION
      const result = await saveJobSeekerAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        qualification: formData.education, // Mapping education -> qualification
      });

      if (result.success) {
        setMessage({ type: "success", text: "Thank you! We will contact you shortly." });
        setFormData({ name: "", phone: "", email: "", state: "", education: "" });
        
        // Auto-close after 2 seconds on success
        setTimeout(() => {
            closeModal();
            setMessage(null);
        }, 2000);
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to submit form." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      
      {/* Modal Container - Using your Dark Blue Theme #2B3656 */}
      <div className="relative w-full max-w-2xl bg-[#2B3656] rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left">
            Job Seeker Enquiry
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">Name <span className="text-red-500">*</span></label>
                <input required name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} className="h-11 rounded-md px-4 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">Phone <span className="text-red-500">*</span></label>
                <input required type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} className="h-11 rounded-md px-4 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Email <span className="text-red-500">*</span></label>
              <input required type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} className="h-11 rounded-md px-4 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* State */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">State <span className="text-red-500">*</span></label>
                <select required name="state" value={formData.state} onChange={handleChange} className="h-11 rounded-md px-4 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer">
                  <option value="">Select your state</option>
                  {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              {/* Education */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white">Education <span className="text-red-500">*</span></label>
                <select required name="education" value={formData.education} onChange={handleChange} className="h-11 rounded-md px-4 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer">
                  <option value="">Select qualification</option>
                  {educationOptions.map(edu => <option key={edu} value={edu}>{edu}</option>)}
                </select>
              </div>
            </div>

            {/* Messages */}
            {message && (
              <div className={`rounded-md px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                {message.text}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center mt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-3 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-[#2B3656]"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}