import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/live-webinars/[id]
 * Fetch a single live webinar
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const liveWebinar = await prisma.liveWebinar.findUnique({
            where: { id },
        });

        if (!liveWebinar) {
            return NextResponse.json(
                { error: 'Live webinar not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(liveWebinar);
    } catch (error) {
        console.error('Error fetching live webinar:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live webinar' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/live-webinars/[id]
 * Update a live webinar (admin only)
 */
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await context.params;
        const body = await request.json();
        const { title, date, image, link, published } = body;

        const liveWebinar = await prisma.liveWebinar.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(date && { date: new Date(date) }),
                ...(image && { image }),
                ...(link !== undefined && { link }),
                ...(published !== undefined && { published }),
            },
        });

        return NextResponse.json(liveWebinar);
    } catch (error) {
        console.error('Error updating live webinar:', error);
        return NextResponse.json(
            { error: 'Failed to update live webinar' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/live-webinars/[id]
 * Delete a live webinar (admin only)
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await context.params;
        await prisma.liveWebinar.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting live webinar:', error);
        return NextResponse.json(
            { error: 'Failed to delete live webinar' },
            { status: 500 }
        );
    }
}
