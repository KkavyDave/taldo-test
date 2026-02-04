'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Blog {
    id: string;
    slug: string;
    title: string;
    date: string;
    image: string;
    published: boolean;
    createdAt: string;
}

export default function BlogsManagementPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchQuery, blogs]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setBlogs(data);
            setFilteredBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        setDeleteId(id);
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete blog');
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Blogs</h1>
                    <p className="text-sm md:text-base text-gray-600">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                >
                    <Plus size={20} />
                    New Blog
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Blogs Table */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blogs...</p>
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-600 mb-4">
                        {searchQuery ? 'No blogs found matching your search' : 'No blogs yet'}
                    </p>
                    {!searchQuery && (
                        <Link
                            href="/admin/blogs/new"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
                        >
                            <Plus size={20} />
                            Create your first blog
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Slug</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {blog.slug}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{blog.date}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/blogs/${blog.id}/edit`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    disabled={deleteId === blog.id}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
