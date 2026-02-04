import Hero from "@/components/home/Hero";
import WhyGermany from "@/components/home/WhyGermany";
import StartCareer from "@/components/home/StartCareer";
import SuccessStories from "@/components/home/SuccessStories";
import ProgramOverview from "@/components/home/ProgramOverview";
import FAQ from "@/components/FAQ";
import Webinar from "@/app/webinar/page"; // <-- Remove this import, it causes nesting issues
import Testimonials from "@/components/Testimonials";
import UpcomingWebinars from "@/components/webinar/UpcomingWebinars";
import { prisma } from '@/lib/prisma';
import FinalCTA from "@/components/home/FinalCTA";

// Fetch directly from DB
async function getUpcomingWebinars() {
  try {
    const webinars = await prisma.liveWebinar.findMany({
      where: { 
        published: true,
      },
      orderBy: { date: 'asc' },
      take: 3, // Show only 3 on home page
    });
    return webinars;
  } catch (error) {
    console.error("Error loading webinars:", error);
    return [];
  }
}

export default async function Home() {
  const webinars = await getUpcomingWebinars();

  return (
    <main className="flex w-full flex-col">
      <Hero />
      <WhyGermany />
      <ProgramOverview />
      <Testimonials />
      <UpcomingWebinars webinars={webinars} />
      <FAQ />
      <FinalCTA />
    </main>
  );
}