'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Webinar {
    id: string;
    videoId: string;
    title: string | null;
    description: string | null;
    order: number;
    published: boolean;
    createdAt: string;
}

export default function WebinarsManagementPage() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchWebinars();
    }, []);

    const fetchWebinars = async () => {
        try {
            const response = await fetch('/api/webinars');
            const data = await response.json();
            setWebinars(data);
        } catch (error) {
            console.error('Failed to fetch webinars:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this webinar?')) {
            return;
        }

        setDeleteId(id);
        try {
            const response = await fetch(`/api/webinars/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWebinars(webinars.filter(webinar => webinar.id !== id));
            } else {
                alert('Failed to delete webinar');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete webinar');
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Webinars</h1>
                    <p className="text-sm md:text-base text-gray-600">Manage your YouTube shorts videos</p>
                </div>
                <Link
                    href="/admin/webinars/new"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                >
                    <Plus size={20} />
                    New Webinar
                </Link>
            </div>

            {/* Webinars List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading webinars...</p>
                </div>
            ) : webinars.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-600 mb-4">No webinars yet</p>
                    <Link
                        href="/admin/webinars/new"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
                    >
                        <Plus size={20} />
                        Add your first webinar
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {webinars.map((webinar) => (
                        <div
                            key={webinar.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Video Preview */}
                            <div className="relative aspect-[9/16] bg-gray-100">
                                <iframe
                                    src={`https://www.youtube.com/embed/${webinar.videoId}`}
                                    title={webinar.title || 'YouTube Short'}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                                        {webinar.title || 'Untitled'}
                                    </h3>
                                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {webinar.videoId}
                                    </code>
                                </div>

                                {webinar.description && (
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {webinar.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${webinar.published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {webinar.published ? 'Published' : 'Draft'}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/webinars/${webinar.id}/edit`}
                                            className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(webinar.id)}
                                            disabled={deleteId === webinar.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
