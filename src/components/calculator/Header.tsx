import { TaldoLogo, GermanyFlag } from "./Icons";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[50] bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative">
        <div className="flex-shrink-0 z-20"> 
          <TaldoLogo className="h-8 md:h-10 w-auto" />
        </div>
        
        {/* DESKTOP TITLE */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <GermanyFlag className="w-8 h-5 mr-3 shadow-sm rounded-sm" />
          <h2 className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap text-[#2B3656]">
            Germany Salary Calculator <span className="text-[#5E72E4]">for Nurses</span>
          </h2>
          <GermanyFlag className="w-8 h-5 ml-3 shadow-sm rounded-sm" />
        </div>
          
        {/* MOBILE TITLE */}
        <div className="flex lg:hidden flex-col items-end justify-center z-20 ml-auto pl-4"> 
            <h2 className="text-xs sm:text-sm font-black text-[#2B3656] leading-tight text-right">
              Germany Salary Calculator
            </h2>
            <span className="text-[10px] sm:text-xs font-black text-[#5E72E4] uppercase tracking-wide">
              for Nurses
            </span>
        </div>
      </div>
    </header>
  );
};