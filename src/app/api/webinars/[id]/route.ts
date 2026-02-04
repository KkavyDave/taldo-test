import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/webinars/[id]
 * Fetch a single webinar by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const webinar = await prisma.webinar.findUnique({
            where: { id },
        });

        if (!webinar) {
            return NextResponse.json(
                { error: 'Webinar not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(webinar);
    } catch (error) {
        console.error('Error fetching webinar:', error);
        return NextResponse.json(
            { error: 'Failed to fetch webinar' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/webinars/[id]
 * Update a webinar (admin only)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { videoId, order, published } = body;

        // Update webinar
        const webinar = await prisma.webinar.update({
            where: { id },
            data: {
                ...(videoId && { videoId }),
                ...(order !== undefined && { order }),
                ...(published !== undefined && { published }),
            },
        });

        return NextResponse.json(webinar);
    } catch (error) {
        console.error('Error updating webinar:', error);
        return NextResponse.json(
            { error: 'Failed to update webinar' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/webinars/[id]
 * Delete a webinar (admin only)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;

        await prisma.webinar.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting webinar:', error);
        return NextResponse.json(
            { error: 'Failed to delete webinar' },
            { status: 500 }
        );
    }
}
