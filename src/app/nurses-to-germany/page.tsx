import NursesToGermanyHero from "@/components/nurses-to-germany/Hero";
import ProgramIncludes from "@/components/nurses-to-germany/ProgramIncludes";
import StepByStepJourney from "@/components/nurses-to-germany/StepByStepJourney";

export default function NursesToGermany() {
  return (
    <main className="flex w-full flex-col">
      <NursesToGermanyHero />
      <ProgramIncludes />
      <StepByStepJourney />
    </main>
  );
}