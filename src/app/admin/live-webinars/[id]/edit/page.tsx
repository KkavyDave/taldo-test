'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LiveWebinarForm from '@/components/admin/LiveWebinarForm';

export default function EditLiveWebinarPage() {
    const params = useParams();
    const webinarId = params.id as string;
    const [webinar, setWebinar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!webinarId) return;

        fetch(`/api/live-webinars/${webinarId}`)
            .then(res => res.json())
            .then(data => {
                setWebinar(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [webinarId]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!webinar) return <div className="p-8">Webinar not found</div>;

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
                <p className="text-gray-600">Update event details.</p>
            </div>

            <LiveWebinarForm mode="edit" initialData={webinar} />
        </div>
    );
}
