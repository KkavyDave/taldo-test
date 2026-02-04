'use client';

import { useState, useRef } from 'react';
import { calculateSimpleRange, UserProfile, RangeResult, CITY_OPTS } from '@/lib/calculator';
import { saveLeadAction, LeadContactData } from '@/app/actions/save-calculation';

import { Header } from '@/components/calculator/Header';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ResultsDisplay } from '@/components/calculator/ResultsDisplay';
import { LeadModal } from '@/components/calculator/LeadModel';

export default function LeadGenCalculator() {
  // --- STATE MANAGEMENT ---
  const [profile, setProfile] = useState<UserProfile>({
    qualification: 'BSC Nursing',
    yearsExperience: 3,
    married: false,
    numChildren: 0,
    selectedCity: CITY_OPTS[1] 
  });

  const [leadData, setLeadData] = useState<LeadContactData>({
    name: '', age: '', email: '', phone: '', state: '' 
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<RangeResult | null>(null);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const topRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- HANDLERS ---
  const handleCalculate = () => {
    const freshResult = calculateSimpleRange(profile);
    if (!hasUnlocked) {
      setResult(freshResult);
      setIsModalOpen(true);
    } else {
      setRecalculating(true);
      setTimeout(() => {
        setResult(freshResult);
        setRecalculating(false);
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    // Basic validation
    const ageNum = parseInt(leadData.age);
    if (ageNum < 18 || ageNum > 50) return setValidationError("Age must be between 18 and 50 years.");
    if (!/^[6-9]\d{9}$/.test(leadData.phone)) return setValidationError("Please enter a valid 10-digit mobile number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) return setValidationError("Please enter a valid email address.");

    setLoading(true);
    const currentResult = calculateSimpleRange(profile);
    
    // --- SERVER ACTION CALL (UPDATED) ---
    // Only passing 3 arguments now. No token.
    const result = await saveLeadAction(
      profile, 
      leadData, 
      currentResult.annualSavingsLakhs
    ); 
    
    if (!result.success && result.error) {
       setValidationError(result.error);
       setLoading(false);
       return;
    }

    setTimeout(() => {
      setLoading(false);
      setHasUnlocked(true);
      setIsModalOpen(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  };

  const handleReset = () => {
    setResult(null);
    setHasUnlocked(false);
    setProfile({ ...profile, married: false, numChildren: 0, selectedCity: CITY_OPTS[1] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const text = `Hi Taldo! I checked my salary potential for ${result.calculatedCity}. It shows I can save ${result.annualSavingsLakhs}/year.`;
    window.open(`https://wa.me/917977905295?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    const shareText = `Hey! I just calculated my potential nursing salary in Germany 🇩🇪. Check yours here: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  // --- RENDER ---
  return (
    <div ref={topRef} className="min-h-screen bg-[#F4F7FE] font-sans relative overflow-hidden">
      
      <Header />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#5E72E4]/15 to-transparent pointer-events-none z-0 opacity-40 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 pt-18 md:pt-18 pb-12 px-4 md:px-8">
        <div className="grid lg:grid-cols-[450px_1fr] gap-8 md:gap-10 items-start">
          
          <CalculatorForm 
             profile={profile} 
             setProfile={setProfile} 
             onCalculate={handleCalculate} 
             recalculating={recalculating} 
             hasUnlocked={hasUnlocked}
          />

          <div ref={resultsRef} className="space-y-6 min-h-[500px] md:min-h-[600px] scroll-mt-28">
            <ResultsDisplay 
               hasUnlocked={hasUnlocked} 
               result={result} 
               recalculating={recalculating}
               onReset={handleReset}
               onWhatsApp={handleWhatsApp}
               onShare={handleShare}
            />
          </div>

        </div>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleFormSubmit}
        leadData={leadData} 
        setLeadData={setLeadData} 
        loading={loading}
        validationError={validationError}
        setValidationError={setValidationError}
      />
    </div>
  );
}