import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Format date as "Month Day, Year"
 */
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * GET /api/blogs
 * Fetch all published blogs
 */
export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/blogs
 * Create a new blog (admin only)
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
        const { title, image, intro, content, published } = body;

        // Validate required fields
        if (!title || !image || !intro) {
            return NextResponse.json(
                { error: 'Title, image, and introduction are required' },
                { status: 400 }
            );
        }

        // Auto-generate slug and date
        let slug = generateSlug(title);
        const date = formatDate(new Date());

        // Check if slug already exists and append timestamp if needed
        const existingBlog = await prisma.blog.findUnique({
            where: { slug },
        });

        if (existingBlog) {
            slug = `${slug}-${Date.now()}`;
        }

        // Create blog
        const blog = await prisma.blog.create({
            data: {
                slug,
                title,
                date,
                image,
                intro,
                content: content || [],
                published: published ?? true,
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        );
    }
}
