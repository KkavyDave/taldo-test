import RecruitmentPipeline from "@/components/recruiters/RecruitmentPipeline";
import WhyTaldo from "@/components/recruiters/why-taldo";

export default function RecruitersPage() {
  return (
    <main className="w-full bg-white">
        <RecruitmentPipeline />
        <WhyTaldo />
    </main>
  );
}
