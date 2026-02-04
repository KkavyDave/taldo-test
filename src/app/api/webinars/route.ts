import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/webinars
 * Fetch all published webinars
 */
export async function GET() {
    try {
        const webinars = await prisma.webinar.findMany({
            where: { published: true },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(webinars);
    } catch (error) {
        console.error('Error fetching webinars:', error);
        // Return empty array during build when database is unreachable
        return NextResponse.json([]);
    }
}

/**
 * POST /api/webinars
 * Create a new webinar (admin only)
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
        const { videoId, order, published } = body;

        // Validate required fields
        if (!videoId) {
            return NextResponse.json(
                { error: 'Video ID is required' },
                { status: 400 }
            );
        }

        // Create webinar
        const webinar = await prisma.webinar.create({
            data: {
                videoId,
                order: order ?? 0,
                published: published ?? true,
            },
        });

        return NextResponse.json(webinar, { status: 201 });
    } catch (error) {
        console.error('Error creating webinar:', error);
        return NextResponse.json(
            { error: 'Failed to create webinar' },
            { status: 500 }
        );
    }
}
