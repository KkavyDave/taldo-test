import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/live-webinars
 * Fetch all published live webinars
 */
export async function GET() {
    try {
        const liveWebinars = await prisma.liveWebinar.findMany({
            where: { published: true },
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(liveWebinars);
    } catch (error) {
        console.error('Error fetching live webinars:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live webinars' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/live-webinars
 * Create a new live webinar (admin only)
 */
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, date, image, link, published } = body;

        // Validate required fields
        if (!title || !date || !image) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create live webinar
        const liveWebinar = await prisma.liveWebinar.create({
            data: {
                title,
                date: new Date(date),
                image,
                link: link || null, // Optional
                published: published ?? true,
            },
        });

        return NextResponse.json(liveWebinar, { status: 201 });
    } catch (error) {
        console.error('Error creating live webinar:', error);
        return NextResponse.json(
            { error: 'Failed to create live webinar' },
            { status: 500 }
        );
    }
}
