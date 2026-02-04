import { prisma } from './prisma';
import blogsJson from '@/data/blogs.json';

export type BlogContentBlock = {
    type: 'paragraph' | 'list';
    content?: string;
    items?: string[];
};

export type BlogRecord = {
    id: string;
    slug: string;
    title: string;
    date: string;
    image: string;
    intro: string;
    content: BlogContentBlock[];
    paragraphs?: string[]; // legacy support
    bulletPoints?: string[]; // legacy support
};

function normalizeContent(input: any): BlogContentBlock[] {
    if (Array.isArray(input?.content)) {
        return input.content;
    }

    const paragraphs = Array.isArray(input?.content?.paragraphs)
        ? input.content.paragraphs
        : [];
    const bulletPoints = Array.isArray(input?.content?.bulletPoints)
        ? input.content.bulletPoints
        : [];

    const blocks: BlogContentBlock[] = [];

    paragraphs.forEach((p: string) => {
        blocks.push({ type: 'paragraph', content: p });
    });

    if (bulletPoints.length > 0) {
        blocks.push({ type: 'list', items: bulletPoints });
    }

    return blocks;
}

function normalizeBlog(raw: any): BlogRecord {
    const slug = raw?.slug || raw?.id || '';

    return {
        id: raw?.id || slug,
        slug,
        title: raw?.title || '',
        date: raw?.date || '',
        image: raw?.image || '',
        intro: raw?.intro || raw?.content?.intro || '',
        content: normalizeContent(raw),
        paragraphs: Array.isArray(raw?.paragraphs)
            ? raw.paragraphs
            : Array.isArray(raw?.content?.paragraphs)
            ? raw.content.paragraphs
            : undefined,
        bulletPoints: Array.isArray(raw?.bulletPoints)
            ? raw.bulletPoints
            : Array.isArray(raw?.content?.bulletPoints)
            ? raw.content.bulletPoints
            : undefined,
    };
}

function getStaticBlogs(): BlogRecord[] {
    return blogsJson.map(normalizeBlog);
}

export async function getPublishedBlogs(): Promise<BlogRecord[]> {
    try {
        const blogs = await prisma.blog.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });

        if (blogs.length > 0) {
            return blogs.map(normalizeBlog);
        }
    } catch (error) {
        console.error('Error fetching blogs from database, using static data', error);
    }

    return getStaticBlogs();
}

export async function getPublishedBlog(slug: string): Promise<BlogRecord | null> {
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                published: true,
                OR: [{ id: slug }, { slug }],
            },
        });

        if (blog) {
            return normalizeBlog(blog);
        }
    } catch (error) {
        console.error(`Error fetching blog ${slug} from database, using static data`, error);
    }

    const fallback = getStaticBlogs().find(
        (b) => b.slug === slug || b.id === slug
    );

    return fallback || null;
}
