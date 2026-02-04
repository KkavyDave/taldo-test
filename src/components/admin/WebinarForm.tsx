'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface WebinarFormData {
    videoId: string;
}

interface WebinarFormProps {
    initialData?: { videoId: string };
    webinarId?: string;
    mode: 'create' | 'edit';
}

export default function WebinarForm({ initialData, webinarId, mode }: WebinarFormProps) {
    const router = useRouter();
    const [videoId, setVideoId] = useState(initialData?.videoId || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const url = mode === 'create' ? '/api/webinars' : `/api/webinars/${webinarId}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    videoId,
                    order: 0, // Default order
                    published: true // Default published
                }),
            });

            if (response.ok) {
                router.push('/admin/webinars');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error || `Failed to ${mode} webinar`);
            }
        } catch (err) {
            setError(`Failed to ${mode} webinar`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl">
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {/* Video ID */}
                <div>
                    <label htmlFor="videoId" className="block text-sm font-bold text-gray-900 mb-2">
                        YouTube Video ID *
                    </label>
                    <input
                        type="text"
                        id="videoId"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none font-mono text-lg"
                        placeholder="e.g. eQ23qmDEa_Q"
                        required
                        autoFocus
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Copy the ID from the YouTube URL: youtube.com/shorts/<strong>ID</strong>
                    </p>
                </div>

                {/* Video Preview */}
                {videoId && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Preview</h3>
                        <div className="relative w-full max-w-[200px] mx-auto aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="Video Preview"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={saving || !videoId}
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent/20"
                    >
                        {saving ? 'Saving...' : mode === 'create' ? 'Add Video' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full sm:w-auto text-gray-600 hover:text-gray-900 font-semibold px-6 py-3 text-center"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
