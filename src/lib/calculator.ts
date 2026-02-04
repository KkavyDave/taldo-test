// src/lib/calculator.ts

export const CITY_OPTS = [
  "Tier 1 (Munich, Frankfurt, Stuttgart)",
  "Tier 2 (Berlin, Hamburg, Cologne)",
  "Tier 3 (Leipzig, Dresden, Halle)"
];

export interface UserProfile {
  qualification: string;
  yearsExperience: number;
  married: boolean;
  numChildren: number;
  selectedCity: string;
}

export interface RangeResult {
  grossRange: string;
  netRange: string; // "Total Cash" (Salary + Kindergeld)
  
  // NEW FIELDS FOR BREAKDOWN
  baseNetSalary: string;    // Pure Salary from Employer (After tax)
  childBenefitYearly: string; // The cash from Govt
  
  annualSavingsLakhs: string; 
  calculatedCity: string;
}

// --- 2026 LEGAL CONSTANTS ---
const TAX_2026 = {
  CHILD_BENEFIT: 259,        // €259 Cash per child
  INR_RATE: 104,              // Realistic 2026 Rate
  
  // Social Security
  PENSION_RATE: 0.093,       
  UNEMPLOYMENT_RATE: 0.013,  
  HEALTH_RATE: 0.0875,       
  
  // Care Insurance
  CARE_BASE_1_CHILD: 0.018,  
  CARE_CHILDLESS: 0.024,     
  CARE_DISCOUNT: 0.0025,     
  
  // Tax
  TAX_FREE_LIMIT: 12348,     
};

export function calculateSimpleRange(profile: UserProfile): RangeResult {
  
  // --- 1. ESTIMATE GROSS SALARY ---
  let estimatedGross = 45000;

  if (profile.yearsExperience >= 5 && profile.yearsExperience <= 10) {
    estimatedGross *= 1.05; 
  } else if (profile.yearsExperience > 10) {
    estimatedGross *= 1.10; 
  }

  if (profile.selectedCity.includes("Tier 1")) estimatedGross += 1800;

  const grossMonthly = estimatedGross / 12;

  // --- 2. CALCULATE DEDUCTIONS (2026 Logic) ---
  const socialSecurityRate = TAX_2026.PENSION_RATE + TAX_2026.UNEMPLOYMENT_RATE + TAX_2026.HEALTH_RATE;
  let socialDeductions = grossMonthly * socialSecurityRate;

  // Care Insurance (5th Child Rule)
  let careRate = 0;
  if (profile.numChildren === 0) {
    careRate = TAX_2026.CARE_CHILDLESS;
  } else {
    careRate = TAX_2026.CARE_BASE_1_CHILD; 
    const discountableChildren = Math.min(profile.numChildren, 5) - 1; 
    if (discountableChildren > 0) {
      careRate -= (discountableChildren * TAX_2026.CARE_DISCOUNT);
    }
  }
  socialDeductions += (grossMonthly * careRate);

  // Income Tax
  const taxableIncome = grossMonthly - socialDeductions - (TAX_2026.TAX_FREE_LIMIT / 12);
  let incomeTax = 0;
  if (taxableIncome > 0) {
    const baseTaxRate = 0.18; 
    incomeTax = taxableIncome * baseTaxRate;
    if (profile.married) incomeTax *= 0.55; 
  }

  // --- 3. FINAL NUMBERS ---
  const netMonthlySalary = grossMonthly - socialDeductions - incomeTax;
  const annualBaseNet = netMonthlySalary * 12;

  // Child Benefit (Cash from Govt)
  const annualChildBenefit = profile.numChildren * TAX_2026.CHILD_BENEFIT * 12;
  
  // Total Cash in Hand
  const totalAnnualCash = annualBaseNet + annualChildBenefit;

  // --- 4. SAVINGS ---
  let annualLivingCost = 12000; 
  if (profile.selectedCity.includes("Tier 1")) annualLivingCost = 15600;
  if (profile.selectedCity.includes("Tier 3")) annualLivingCost = 10200;
  if (profile.married) annualLivingCost *= 1.4; 
  annualLivingCost += (profile.numChildren * 1500);

  const potentialSavingsEUR = totalAnnualCash - annualLivingCost;

  // --- 5. FORMATTING ---
  const fmtEur = (val: number) => `€${(val/1000).toFixed(1)}k`;

  // Savings in Lakhs
  const minSavingsLakhs = ((potentialSavingsEUR - 1000) * TAX_2026.INR_RATE) / 100000;
  const maxSavingsLakhs = ((potentialSavingsEUR + 2000) * TAX_2026.INR_RATE) / 100000;

  return {
    grossRange: `${fmtEur(estimatedGross - 1500)} - ${fmtEur(estimatedGross + 2500)}`,
    
    // BREAKDOWN DATA
    baseNetSalary: fmtEur(annualBaseNet),
    childBenefitYearly: fmtEur(annualChildBenefit),
    
    // The Big Number (Total)
    netRange: `${fmtEur(totalAnnualCash - 1000)} - ${fmtEur(totalAnnualCash + 1500)}`,
    
    annualSavingsLakhs: `₹${minSavingsLakhs.toFixed(1)} - ₹${maxSavingsLakhs.toFixed(1)} Lakhs`,
    calculatedCity: profile.selectedCity
  };
}