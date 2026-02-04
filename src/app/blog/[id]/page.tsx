import { notFound } from 'next/navigation';
import Image from 'next/image';
import OtherBlogs from '@/components/OtherBlogs';
import ShareButtons from '@/components/blog/ShareButtons';
import {
    BlogRecord,
    getPublishedBlog,
    getPublishedBlogs,
} from '@/lib/blogs';

export async function generateStaticParams() {
    const blogs = await getPublishedBlogs();
    if (!Array.isArray(blogs)) return [];
    return blogs.map((blog: BlogRecord) => ({
        id: blog.slug,
    }));
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id) {
        notFound();
    }
    const blog = await getPublishedBlog(id);
    const allBlogs = await getPublishedBlogs();

    if (!blog) {
        notFound();
    }

    return (
        <main className="flex flex-col w-full bg-white min-h-screen">
            <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 pt-8 md:pt-12 pb-12 md:pb-16 lg:pb-20">
                {/* Share Section - Desktop Only */}
                <ShareButtons title={blog.title} variant="desktop" />

                {/* Main Content */}
                <article className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-gray-900 mb-3 md:mb-4 lg:mb-6">
                        {blog.title}
                    </h1>

                    {/* Date */}
                    <p className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-900 mb-8 md:mb-10 lg:mb-14">
                        {blog.date}
                    </p>

                    {/* Featured Image */}
                    <div className="relative w-full aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden mb-8 md:mb-10 lg:mb-14 bg-gray-200">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                        {/* Intro */}
                        <p className="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-900 mb-6 md:mb-8 lg:mb-10">
                            {blog.intro}
                        </p>

                        {/* Dynamic Content Blocks */}
                        {blog.content && Array.isArray(blog.content) ? (
                            blog.content.map((block: any, index: number) => {
                                if (block.type === 'paragraph') {
                                    return (
                                        <p
                                            key={index}
                                            className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-900 mb-6 md:mb-8 lg:mb-10"
                                        >
                                            {block.content}
                                        </p>
                                    );
                                } else if (block.type === 'list') {
                                    return (
                                        <div key={index} className="flex flex-col gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 mt-2">
                                            {block.items?.map((point: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3 md:gap-4">
                                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-900 mt-2.5 md:mt-3 shrink-0" />
                                                    <p className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-900">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            // Fallback for old content format (if any exists in cache/db temporarily)
                            <>
                                {blog.paragraphs?.map((p: string, i: number) => (
                                    <p key={`p-${i}`} className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-900 mb-6 md:mb-8 lg:mb-10">{p}</p>
                                ))}
                                {Array.isArray(blog.bulletPoints) && blog.bulletPoints.length > 0 && (
                                    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-2">
                                        {blog.bulletPoints.map((point: string, i: number) => (
                                            <div key={`b-${i}`} className="flex items-start gap-3 md:gap-4">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-900 mt-2.5 md:mt-3 shrink-0" />
                                                <p className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-900">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </article>

                {/* Mobile Share Section */}
                <ShareButtons title={blog.title} variant="mobile" />
            </div>

            {/* Other Blogs Section */}
            <OtherBlogs blogs={Array.isArray(allBlogs) ? allBlogs : []} currentBlogId={blog.id} heading='Other Blogs' limit={6} />
        </main>
    );
}
