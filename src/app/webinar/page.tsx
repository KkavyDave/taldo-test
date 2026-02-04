import UpcomingWebinars from "@/components/webinar/UpcomingWebinars";
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

async function getWebinars() {
    try {
        // Updated to use 'liveWebinar' table
        const webinars = await prisma.liveWebinar.findMany({
            where: { published: true },
            orderBy: { date: 'asc' },
        });
        return webinars;
    } catch (error) {
        console.error('Error fetching webinars during build:', error);
        return [];
    }
}

export default async function WebinarPage() {
    const webinars = await getWebinars();

    return (
        <section className="w-full bg-white">
            {/* Added showEmptyMessage={true} prop here */}
            <UpcomingWebinars webinars={webinars} showEmptyMessage={true} />
        </section>
    )
}