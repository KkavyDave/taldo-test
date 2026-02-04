'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WebinarForm from '@/components/admin/WebinarForm';

interface Webinar {
    id: string;
    videoId: string;
    title: string | null;
    description: string | null;
    order: number;
    published: boolean;
}

export default function EditWebinarPage() {
    const params = useParams();
    const webinarId = params.id as string;
    const [webinar, setWebinar] = useState<Webinar | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWebinar();
    }, [webinarId]);

    const fetchWebinar = async () => {
        try {
            const response = await fetch(`/api/webinars/${webinarId}`);
            if (response.ok) {
                const data = await response.json();
                setWebinar(data);
            } else {
                setError('Webinar not found');
            }
        } catch (err) {
            setError('Failed to load webinar');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading webinar...</p>
                </div>
            </div>
        );
    }

    if (error || !webinar) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error || 'Webinar not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Webinar</h1>
                <p className="text-gray-600">Update your webinar details</p>
            </div>

            <WebinarForm
                mode="edit"
                webinarId={webinarId}
                initialData={{
                    videoId: webinar.videoId,
                }}
            />
        </div>
    );
}
