'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LiveWebinar {
    id?: string;
    title: string;
    date: string;
    image: string;
    link?: string;
    published: boolean;
}

interface LiveWebinarFormProps {
    initialData?: LiveWebinar;
    mode: 'create' | 'edit';
}

export default function LiveWebinarForm({ initialData, mode }: LiveWebinarFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<LiveWebinar>({
        title: initialData?.title || '',
        date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '', // format for datetime-local
        image: initialData?.image || '',
        link: initialData?.link || '',
        published: initialData?.published ?? true,
    });

    // Sync with initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
                image: initialData.image || '',
                link: initialData.link || '',
                published: initialData.published ?? true,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // STRICTER SIZE LIMIT for Database Storage (e.g. 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB for database storage');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({ ...prev, image: base64String }));
            setError('');
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        // Set default link if empty
        const submissionData = {
            ...formData,
            link: formData.link || 'https://taldo.co',
            date: new Date(formData.date).toISOString(),
        };

        try {
            const url = mode === 'create' ? '/api/live-webinars' : `/api/live-webinars/${initialData?.id}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                router.push('/admin/live-webinars');
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
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Date & Time</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Featured Image *</label>
                    <div className="space-y-3">
                        {formData.image && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                        />
                        <p className="text-xs text-gray-500">Max size: 5MB</p>
                    </div>
                </div>

                {/* Link - Optional */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Join Link (Optional)</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="#"
                    />
                </div>

                {/* Published */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="published"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="font-medium text-gray-900">Published</label>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
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
