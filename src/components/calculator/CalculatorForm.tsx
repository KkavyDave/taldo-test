import { Briefcase, Users, Calculator, Loader2 } from "lucide-react";
import { UserProfile, CITY_OPTS } from "@/lib/calculator";

interface CalculatorFormProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onCalculate: () => void;
  recalculating: boolean;
  hasUnlocked: boolean;
}

export const CalculatorForm = ({ profile, setProfile, onCalculate, recalculating, hasUnlocked }: CalculatorFormProps) => {
  return (
    <div className="lg:sticky lg:top-32 space-y-6"> 
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.06)] p-5 md:p-8 border border-slate-100">
        
        {/* SUBTITLE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-[#5E72E4]" />
            <h3 className="text-lg font-bold text-[#2B3656]">Professional Information</h3>
          </div>
          <div className="bg-gradient-to-br from-[#5E72E4]/5 to-[#5E72E4]/10 p-5 rounded-2xl border border-[#5E72E4]/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#5E72E4]/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
             <p className="text-xs sm:text-[13px] md:text-sm font-medium text-slate-600 leading-relaxed relative z-10">
               Calculate your <span className="font-bold text-[#5E72E4]">gross salary</span>, <span className="font-bold text-[#5E72E4]">take-home pay</span>, and <span className="font-bold text-[#5E72E4]">potential savings</span> based on 2026 German tax projections.
             </p>
          </div>
        </div>

        {/* INPUTS */}
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Qualification</label>
             <select 
                 className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none font-bold text-[#2B3656] text-sm cursor-pointer hover:bg-slate-100 transition-colors focus:border-[#5E72E4]"
                 value={profile.qualification} 
                 onChange={(e) => setProfile({...profile, qualification: e.target.value as any})}
             >
                <option value="BSC Nursing">B.Sc Nursing</option>
                <option value="MSC Nursing">M.Sc Nursing</option>
                <option value="GNM Nursing">GNM Diploma</option>
                <option value="Post BSC Nursing">Post B.Sc Nursing</option>
             </select>
           </div>

           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Choose Your Lifestyle</label>
             <select 
                 className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none font-bold text-[#2B3656] text-sm cursor-pointer hover:bg-slate-100 transition-colors focus:border-[#5E72E4]"
                 value={profile.selectedCity} 
                 onChange={(e) => setProfile({...profile, selectedCity: e.target.value})}
             >
                <option value={CITY_OPTS[0]}>Premium Metros (Frankfurt, Munich)</option>
                <option value={CITY_OPTS[1]}>Big City Life (Berlin, Hamburg)</option>
                <option value={CITY_OPTS[2]}>Savings Hotspots (Leipzig, Dresden)</option>
             </select>
           </div>

           <div className="space-y-4 pt-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Years of Experience</label>
                  <p className="text-[10px] text-slate-400 font-medium italic">Experience as a Nurse in India (excluding internship)</p>
                </div>
                <div className="bg-[#Eef2ff] text-[#5E72E4] px-4 py-1.5 rounded-full font-bold text-sm border border-[#5E72E4]/10">{profile.yearsExperience} Years</div>
              </div>
              <input 
                type="range" min="0" max="15" step="1" 
                className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#5E72E4]" 
                value={profile.yearsExperience} 
                onChange={(e) => setProfile({...profile, yearsExperience: parseInt(e.target.value)})} 
              />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.06)] p-6 md:p-8 border border-slate-100">
        <div className="mb-8 md:mb-10">
         <div className="flex items-center gap-2 mb-6">
           <Users className="w-5 h-5 text-[#5E72E4]" />
           <h3 className="text-lg font-bold text-[#2B3656]">Personal Information</h3>
         </div>
         <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
             <button type="button" onClick={() => setProfile({...profile, married: false})} className={`py-4 rounded-xl text-base md:text-lg font-bold transition-all cursor-pointer hover:shadow-md ${!profile.married ? 'bg-[#5E72E4] text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>Single</button>
             <button type="button" onClick={() => setProfile({...profile, married: true})} className={`py-4 rounded-xl text-base md:text-lg font-bold transition-all cursor-pointer hover:shadow-md ${profile.married ? 'bg-[#5E72E4] text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>Married</button>
           </div>
           <div className="space-y-3">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Number of Children</label>
             <div className="bg-slate-50 p-1.5 rounded-xl flex items-center justify-between px-2">
               <button type="button" onClick={() => setProfile({...profile, numChildren: Math.max(0, profile.numChildren - 1)})} className="w-12 h-12 bg-white rounded-lg shadow-sm font-black text-xl cursor-pointer hover:text-[#5E72E4] hover:shadow-md transition-all">-</button>
               <span className="font-black text-[#2B3656] text-xl md:text-2xl">{profile.numChildren}</span>
               <button type="button" onClick={() => setProfile({...profile, numChildren: profile.numChildren + 1})} className="w-12 h-12 bg-[#5E72E4] rounded-lg shadow-md text-white font-black text-xl cursor-pointer hover:bg-[#4e62cf] hover:shadow-lg transition-all">+</button>
             </div>
           </div>
         </div>
        </div>

        <button 
          onClick={onCalculate} 
          disabled={recalculating} 
          className="w-full bg-[#5E72E4] text-white font-bold py-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg md:text-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          {recalculating ? <Loader2 className="animate-spin w-5 h-5" /> : (hasUnlocked ? 'Recalculate Savings' : 'Calculate My Savings')}
          {!recalculating && <Calculator className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};