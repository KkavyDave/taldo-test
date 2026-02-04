'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Calendar, Clock, ExternalLink } from 'lucide-react';

interface LiveWebinar {
    id: string;
    title: string;
    date: string;
    image: string;
    link?: string;
    published: boolean;
}

export default function LiveWebinarsManagementPage() {
    const [webinars, setWebinars] = useState<LiveWebinar[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchWebinars();
    }, []);

    const fetchWebinars = async () => {
        try {
            const response = await fetch('/api/live-webinars');
            const data = await response.json();
            setWebinars(data);
        } catch (error) {
            console.error('Failed to fetch webinars:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        setDeleteId(id);
        try {
            const response = await fetch(`/api/live-webinars/${id}`, {
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Live Examples/Events</h1>
                    <p className="text-sm md:text-base text-gray-600">Manage upcoming webinars and events</p>
                </div>
                <Link
                    href="/admin/live-webinars/new"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                >
                    <Plus size={20} />
                    New Event
                </Link>
            </div>

            {/* Webinars List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            ) : webinars.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-600 mb-4">No events created yet</p>
                    <Link
                        href="/admin/live-webinars/new"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <Plus size={20} />
                        Add your first event
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {webinars.map((webinar) => (
                        <div
                            key={webinar.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Image Preview */}
                            <div className="relative aspect-video bg-gray-100">
                                <Image
                                    src={webinar.image}
                                    alt={webinar.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${webinar.published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                        {webinar.published ? 'LIVE' : 'DRAFT'}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                                    {webinar.title}
                                </h3>

                                <div className="space-y-2 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span>{new Date(webinar.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>{new Date(webinar.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    {webinar.link && (
                                        <div className="flex items-center gap-2">
                                            <ExternalLink size={14} />
                                            <a href={webinar.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate max-w-[200px]">
                                                {webinar.link}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/admin/live-webinars/${webinar.id}/edit`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                    ))}
                </div>
            )}
        </div>
    );
}
