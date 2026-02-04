import Link from 'next/link';
import Image from 'next/image';
import Newsletter from '@/components/home/Newsletter';
import { BlogRecord, getPublishedBlogs } from '@/lib/blogs';

export default async function BlogListingPage() {
    const blogs = await getPublishedBlogs();

    return (
        <main className="flex flex-col w-full bg-white">
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20 lg:py-24">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex flex-col items-center text-center gap-4 md:gap-6">
                        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
                            Discover Our Blog
                        </h1>
                        <p className="font-normal text-base md:text-lg lg:text-xl leading-relaxed text-gray-text max-w-3xl">
                            Insights, stories, and resources to help you navigate your nursing career journey to Germany
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        {blogs.map((blog: BlogRecord) => (
                            <Link
                                key={blog.id}
                                href={`/blog/${blog.slug}`}
                                className="group flex flex-col gap-4 hover:opacity-80 transition-opacity"
                            >
                                <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gray-200">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-normal text-sm md:text-base leading-relaxed text-gray-text">
                                        {blog.date}
                                    </p>
                                    <h2 className="font-medium text-lg md:text-xl lg:text-2xl leading-tight text-gray-900">
                                        {blog.title}
                                    </h2>
                                    <p className="font-normal text-sm md:text-base lg:text-lg leading-relaxed text-gray-text line-clamp-2">
                                        {blog.intro}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            {/* <Newsletter /> */}
        </main>
    );
}
