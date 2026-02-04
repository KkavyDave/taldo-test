'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Types for flexible content blocks
type BlockType = 'paragraph' | 'list';

interface ContentBlock {
    id: string; // unique ID for React keys
    type: BlockType;
    content?: string; // for paragraphs
    items?: string[]; // for lists
}

interface BlogFormData {
    title: string;
    image: string;
    intro: string;
    content: ContentBlock[];
    published: boolean;
}

interface ApiBlogData {
    title: string;
    image: string;
    intro: string;
    content: any[]; // The raw JSON from DB
    published: boolean;
}

interface BlogFormProps {
    initialData?: Partial<ApiBlogData>;
    blogId?: string;
    mode: 'create' | 'edit';
}

export default function BlogForm({ initialData, blogId, mode }: BlogFormProps) {
    const router = useRouter();

    // Initialize state
    const [formData, setFormData] = useState<BlogFormData>(() => {
        // Transform initial JSON content to our internal Block format
        const transformedContent: ContentBlock[] = initialData?.content?.map((block: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            type: block.type,
            content: block.content || '',
            items: block.items || ['']
        })) || [
                { id: '1', type: 'paragraph', content: '' }
            ];

        return {
            title: initialData?.title || '',
            image: initialData?.image || '',
            intro: initialData?.intro || '',
            content: transformedContent,
            published: initialData?.published ?? true,
        };
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // --- Content Block Management ---

    const addBlock = (type: BlockType) => {
        setFormData(prev => ({
            ...prev,
            content: [
                ...prev.content,
                type === 'paragraph'
                    ? { id: Math.random().toString(36).substr(2, 9), type: 'paragraph', content: '' }
                    : { id: Math.random().toString(36).substr(2, 9), type: 'list', items: [''] }
            ]
        }));
    };

    const removeBlock = (index: number) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index)
        }));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === formData.content.length - 1)
        ) return;

        const newContent = [...formData.content];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];

        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const updateBlockContent = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.map((block, i) =>
                i === index ? { ...block, content: value } : block
            )
        }));
    };

    // --- List Item Management ---

    const addListItem = (blockIndex: number) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.map((block, i) => {
                if (i !== blockIndex) return block;
                return { ...block, items: [...(block.items || []), ''] };
            })
        }));
    };

    const removeListItem = (blockIndex: number, itemIndex: number) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.map((block, i) => {
                if (i !== blockIndex) return block;
                return { ...block, items: (block.items || []).filter((_, j) => j !== itemIndex) };
            })
        }));
    };

    const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.map((block, i) => {
                if (i !== blockIndex) return block;
                const newItems = [...(block.items || [])];
                newItems[itemIndex] = value;
                return { ...block, items: newItems };
            })
        }));
    };

    // --- Image Handling (Base64) ---

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // STRICTER SIZE LIMIT for Database Storage (e.g. 1MB)
        if (file.size > 1 * 1024 * 1024) {
            setError('Image must be less than 1MB for database storage');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setImageFile(null); // No file to upload separately
            setFormData(prev => ({ ...prev, image: base64String }));
            setImagePreview(base64String);
            setError('');
        };
        reader.readAsDataURL(file);
    };

    // Removed uploadImage function as we now store base64 directly


    // --- Submission ---

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            // Image is already in formData.image as Base64 string
            const imageUrl = formData.image;

            // Clean up data before sending
            const cleanContent = formData.content.map(({ id, ...rest }) => {
                if (rest.type === 'list') {
                    return { ...rest, items: rest.items?.filter(item => item.trim() !== '') || [] };
                }
                return rest;
            }).filter(block => {
                if (block.type === 'paragraph') return block.content?.trim() !== '';
                if (block.type === 'list') return block.items && block.items.length > 0;
                return false;
            });

            const blogData = {
                title: formData.title,
                image: imageUrl,
                intro: formData.intro,
                content: cleanContent, // Send the array of blocks
                published: formData.published,
            };

            const url = mode === 'create' ? '/api/blogs' : `/api/blogs/${blogId}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                router.push('/admin/blogs');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error || `Failed to ${mode} blog`);
            }
        } catch (err) {
            setError(`Failed to ${mode} blog`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Header Fields */}
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">Blog Title *</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-lg transition-all"
                        placeholder="Enter title (slug will be auto-generated)"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Featured Image *</label>
                    <div className="space-y-3">
                        {imagePreview && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="intro" className="block text-sm font-semibold text-gray-900 mb-2">Introduction *</label>
                    <textarea
                        id="intro"
                        value={formData.intro}
                        onChange={(e) => setFormData(prev => ({ ...prev, intro: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none transition-all"
                        placeholder="Write a short introduction..."
                        required
                    />
                </div>
            </div>

            {/* Content Builder */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900">Content Blocks</h3>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => addBlock('paragraph')}
                            className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <span className="text-lg leading-none">+</span> Paragraph
                        </button>
                        <button
                            type="button"
                            onClick={() => addBlock('list')}
                            className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <span className="text-lg leading-none">+</span> List
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {formData.content.map((block, index) => (
                        <div key={block.id} className="relative group bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                            {/* Block Controls - Responsive */}
                            <div className="flex md:absolute md:right-4 md:top-4 items-center justify-end gap-1 opacity-100 transition-opacity mb-4 md:mb-0">
                                <button
                                    type="button"
                                    onClick={() => moveBlock(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-30"
                                    title="Move Up"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveBlock(index, 'down')}
                                    disabled={index === formData.content.length - 1}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-30"
                                    title="Move Down"
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeBlock(index)}
                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md ml-2"
                                    title="Remove Block"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Block Content */}
                            <div className="mt-0 md:mt-6 first:mt-2">
                                {block.type === 'paragraph' ? (
                                    <div>
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Paragraph</span>
                                        <textarea
                                            value={block.content}
                                            onChange={(e) => updateBlockContent(index, e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none transition-all"
                                            placeholder="Enter paragraph text..."
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Bullet List</span>
                                            <button
                                                type="button"
                                                onClick={() => addListItem(index)}
                                                className="text-xs font-medium text-accent hover:text-accent/80"
                                            >
                                                + Add Item
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {block.items?.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-3 shrink-0" />
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm"
                                                        placeholder="List item..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeListItem(index, itemIndex)}
                                                        className="text-gray-400 hover:text-red-500 p-2"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                            {(!block.items || block.items.length === 0) && (
                                                <p className="text-sm text-gray-400 italic py-2">No items yet. Click add to start list.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-4 z-10 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                            className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                            Publish
                        </label>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-md shadow-accent/20"
                    >
                        {saving ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </form>
    );
}
