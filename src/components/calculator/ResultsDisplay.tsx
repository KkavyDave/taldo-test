import { Lock, Wallet, MapPin, Building2, RefreshCcw, MessageCircle, Share2, Info } from "lucide-react";
import { RangeResult } from "@/lib/calculator";

// Helper function
const getEurRange = (inrString: string) => {
  try {
    const matches = inrString.match(/(\d+\.?\d*)/g); 
    if (!matches || matches.length < 2) return "";
    const minLakh = parseFloat(matches[0]);
    const maxLakh = parseFloat(matches[1]);
    const minEur = (minLakh * 100000) / 104;
    const maxEur = (maxLakh * 100000) / 104;
    const fmt = (n: number) => `€${(n / 1000).toFixed(1)}k`;
    return `${fmt(minEur)} - ${fmt(maxEur)}`;
  } catch (e) { return ""; }
};

interface ResultsDisplayProps {
  hasUnlocked: boolean;
  result: RangeResult | null;
  recalculating: boolean;
  onReset: () => void;
  onWhatsApp: () => void;
  onShare: () => void;
}

export const ResultsDisplay = ({ hasUnlocked, result, recalculating, onReset, onWhatsApp, onShare }: ResultsDisplayProps) => {
  
  // LOCKED STATE (Marketing)
  if (!hasUnlocked) {
    return (
      <div className="bg-white rounded-[2.5rem] h-full flex flex-col items-center justify-center p-8 md:p-12 text-center border border-slate-100 shadow-[0_20px_60px_rgb(0,0,0,0.03)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5E72E4]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#F4F7FE] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm transform -rotate-6">
            <Lock className="w-8 h-8 text-[#5E72E4]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#2B3656] mb-4">Unlock Your Germany Potential</h3>
          <p className="text-slate-500 text-sm md:text-base max-w-sm mx-auto mb-10 font-bold leading-relaxed">Join thousands of Indian nurses building a high-growth career with world-class benefits.</p>
          <div className="grid gap-4 max-w-sm mx-auto mb-8 text-left w-full">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#5E72E4] flex-shrink-0"><Wallet className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-[#2B3656]">3x Higher Savings than India</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#5E72E4] flex-shrink-0"><MapPin className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-[#2B3656]">Permanent Residency in 3-5 Years</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#5E72E4] flex-shrink-0"><Building2 className="w-5 h-5" /></div>
              <span className="text-sm font-bold text-[#2B3656]">Free Healthcare for your Family</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE (Results)
  return (
    <div className={`transition-opacity duration-300 space-y-6 md:space-y-8 ${recalculating ? 'opacity-50' : 'opacity-100 animate-in fade-in slide-in-from-right-8'}`}>
        
        {/* Responsive Grid: Stacks on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* GROSS CARD (Unchanged) */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gross</p>
                <div className="text-[#5E72E4] text-2xl md:text-3xl font-black mb-1">{result?.grossRange} <span className="text-xs text-slate-400">/ yr</span></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Annual Gross Salary</p>
            </div>

            {/* NET CARD (Updated with Breakdown) */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Cash in Hand</p>
                        <div className="text-emerald-500 text-2xl md:text-3xl font-black mb-1">
                            {result?.netRange} <span className="text-xs text-emerald-600/60">/ yr</span>
                        </div>
                    </div>
                </div>
                {/* CONDITIONAL BREAKDOWN */}
                {result?.childBenefitYearly !== "€0.0k" ? (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1">
                        <div className="flex justify-between text-slate-500">
                            <span>Job Salary (Net):</span>
                            <span className="font-bold">{result?.baseNetSalary}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600">
                            <span>+ Govt Child Support:</span>
                            <span className="font-bold">+{result?.childBenefitYearly}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Annual Net Salary</p>
                )}
            </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 text-center relative overflow-hidden shadow-[0_30px_70px_rgb(0,0,0,0.07)] border border-slate-100">
            <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-xl md:text-3xl font-bold text-[#2B3656] mb-4">Your Potential Annual Savings</h3>
                <p className="text-slate-400 mb-6 md:mb-8 text-xs md:text-sm font-bold">After all living expenses (rent, food, transport) and taxes in Germany.</p>
                <div className="text-lg md:text-xl font-bold text-slate-500 mb-4">{getEurRange(result?.annualSavingsLakhs || "")}</div>
                <div className="flex items-baseline justify-center w-full mb-10 md:mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-5xl md:text-7xl font-extrabold text-[#5E72E4] tracking-tight drop-shadow-sm whitespace-nowrap">{result?.annualSavingsLakhs.replace(' Lakhs', '')}</span>
                        <span className="text-xl md:text-3xl font-bold text-[#5E72E4]/80">Lakhs / yr</span>
                    </div>
                </div>
                <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-[#5E72E4] transition-colors font-bold text-base cursor-pointer"><RefreshCcw className="w-5 h-5" /> Calculate Again</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button onClick={onWhatsApp} className="bg-[#25D366] text-white font-black py-6 md:py-8 px-6 md:px-8 rounded-[2rem] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 text-lg md:text-xl cursor-pointer">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                <span>Chat with Counsellor</span>
            </button>
            <button onClick={onShare} className="bg-white text-[#5E72E4] font-black py-6 md:py-8 px-6 md:px-8 rounded-[2rem] shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-4 border border-slate-100 text-lg md:text-xl cursor-pointer">
                <Share2 className="w-6 h-6 md:w-8 md:h-8" />
                <span>Share with Friends</span>
            </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-[10px] text-slate-400 font-bold pt-4 text-center">
            <div className="flex items-center gap-1.5"><Info className="w-3 h-3" /><span>Estimated conversion rate: 1 EUR = 104 INR</span></div>
            <span className="hidden md:block opacity-30">•</span>
            <span>Calculations are based on 2026 German tax projections</span>
        </div>
    </div>
  );
};