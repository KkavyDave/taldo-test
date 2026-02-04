import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog</h1>
                <p className="text-gray-600">Write and publish a new blog post</p>
            </div>

            <BlogForm mode="create" />
        </div>
    );
}
