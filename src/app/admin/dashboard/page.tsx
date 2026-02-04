'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Video, Plus } from 'lucide-react';

interface Stats {
    totalBlogs: number;
    totalWebinars: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ totalBlogs: 0, totalWebinars: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [blogsRes, webinarsRes] = await Promise.all([
                fetch('/api/blogs'),
                fetch('/api/webinars'),
            ]);

            const blogs = await blogsRes.json();
            const webinars = await webinarsRes.json();

            setStats({
                totalBlogs: blogs.length || 0,
                totalWebinars: webinars.length || 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-sm md:text-base text-gray-600">Welcome to the Taldo admin panel</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Blogs Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="text-primary" size={24} />
                        </div>
                        <Link
                            href="/admin/blogs/new"
                            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                            <Plus size={16} />
                            New Blog
                        </Link>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : stats.totalBlogs}
                    </h3>
                    <p className="text-gray-600 mb-4">Total Blogs</p>
                    <Link
                        href="/admin/blogs"
                        className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                        Manage Blogs →
                    </Link>
                </div>

                {/* Webinars Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Video className="text-accent" size={24} />
                        </div>
                        <Link
                            href="/admin/webinars/new"
                            className="text-sm text-accent hover:text-accent/80 font-medium flex items-center gap-1"
                        >
                            <Plus size={16} />
                            New Webinar
                        </Link>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : stats.totalWebinars}
                    </h3>
                    <p className="text-gray-600 mb-4">Total Webinars</p>
                    <Link
                        href="/admin/webinars"
                        className="text-sm text-accent hover:text-accent/80 font-medium"
                    >
                        Manage Webinars →
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/admin/blogs/new"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Plus className="text-primary" size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Create New Blog</h3>
                            <p className="text-sm text-gray-600">Write and publish a new blog post</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/webinars/new"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Plus className="text-accent" size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Add New Webinar</h3>
                            <p className="text-sm text-gray-600">Add a YouTube short video</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
