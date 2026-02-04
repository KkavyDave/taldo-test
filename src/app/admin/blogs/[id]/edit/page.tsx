'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';

interface Blog {
    id: string;
    slug: string;
    title: string;
    date: string;
    image: string;
    intro: string;
    paragraphs: string[];
    bulletPoints: string[];
    published: boolean;
}

export default function EditBlogPage() {
    const params = useParams();
    const blogId = params.id as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBlog();
    }, [blogId]);

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blogs/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                setError('Blog not found');
            }
        } catch (err) {
            setError('Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error || 'Blog not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog</h1>
                <p className="text-gray-600">Update your blog post</p>
            </div>

            <BlogForm mode="edit" blogId={blogId} initialData={blog} />
        </div>
    );
}
