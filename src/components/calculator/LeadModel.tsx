import { Lock, X, AlertCircle, MapPin, Loader2 } from "lucide-react";
import { LeadContactData } from "@/app/actions/save-calculation";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"
];

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  // REMOVED captchaToken from signature
  onSubmit: (e: React.FormEvent) => void; 
  leadData: LeadContactData;
  setLeadData: (d: LeadContactData) => void;
  loading: boolean;
  validationError: string | null;
  setValidationError: (s: string | null) => void;
}

export const LeadModal = ({ isOpen, onClose, onSubmit, leadData, setLeadData, loading, validationError, setValidationError }: LeadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2B3656]/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 md:p-10 relative animate-in zoom-in-95 duration-200 my-auto">
         <button onClick={() => { onClose(); setValidationError(null); }} className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer" aria-label="Close modal"><X className="w-6 h-6" /></button>
         
         <div className="text-center mb-6 md:mb-8">
           <div className="w-16 h-16 bg-[#F4F7FE] rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm"><Lock className="w-7 h-7 text-[#5E72E4]" /></div>
           <h3 className="text-2xl md:text-3xl font-bold text-[#2B3656] mb-2">Unlock Result</h3>
           <p className="text-sm text-slate-500 font-medium">Enter your details to see your future in Germany!</p>
         </div>

         {validationError && (
           <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
             <p className="text-xs font-bold text-red-600">{validationError}</p>
           </div>
         )}

         <form onSubmit={onSubmit} className="space-y-4">
            <input required placeholder="Full Name" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full p-4 bg-[#F4F7FE] border border-transparent focus:bg-white focus:border-[#5E72E4] rounded-xl outline-none text-base font-bold text-[#2B3656]" />
            <div className="grid grid-cols-2 gap-4">
               <input required type="number" placeholder="Age" value={leadData.age} onChange={e => setLeadData({...leadData, age: e.target.value})} className="w-full p-4 bg-[#F4F7FE] border border-transparent focus:bg-white focus:border-[#5E72E4] rounded-xl outline-none text-base font-bold text-[#2B3656]" />
               <input required type="tel" placeholder="Phone" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} className="w-full p-4 bg-[#F4F7FE] border border-transparent focus:bg-white focus:border-[#5E72E4] rounded-xl outline-none text-base font-bold text-[#2B3656]" />
            </div>
            <input required type="email" placeholder="Email Address" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full p-4 bg-[#F4F7FE] border border-transparent focus:bg-white focus:border-[#5E72E4] rounded-xl outline-none text-base font-bold text-[#2B3656]" />
            
            <div className="relative">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
               <select required value={leadData.state} onChange={e => setLeadData({...leadData, state: e.target.value})} className="w-full p-4 pl-11 bg-[#F4F7FE] border border-transparent focus:bg-white focus:border-[#5E72E4] rounded-xl outline-none text-base font-bold text-[#2B3656] appearance-none cursor-pointer">
                  <option value="" disabled>Select State (India)</option>
                  {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
               </select>
            </div>

            {/* RECAPTCHA REMOVED COMPLETELY */}

            <button type="submit" disabled={loading} className="w-full bg-[#5E72E4] text-white font-bold py-5 rounded-2xl mt-4 shadow-xl hover:bg-[#4e62cf] transition-all flex items-center justify-center text-lg md:text-xl cursor-pointer">
              {loading ? <Loader2 className="animate-spin w-6 h-6" /> : 'Reveal Results'}
            </button>
         </form>
      </div>
    </div>
  );
};