import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/blogs/[id]
 * Fetch a single blog by ID or slug
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const blog = await prisma.blog.findFirst({
            where: {
                OR: [
                    { id },
                    { slug: id },
                ],
                published: true,
            },
        });

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/blogs/[id]
 * Update a blog (admin only)
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
        const { title, image, intro, content, published } = body;

        // Update blog
        const blog = await prisma.blog.update({
            where: { id },
            data: {
                ...(title && { title }),
                // We don't update slug or date on edit to preserve URLs and timestamps
                ...(image && { image }),
                ...(intro && { intro }),
                ...(content && { content }),
                ...(published !== undefined && { published }),
            },
        });

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/blogs/[id]
 * Delete a blog (admin only)
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

        await prisma.blog.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
