import WebinarForm from '@/components/admin/WebinarForm';

export default function NewWebinarPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Webinar</h1>
                <p className="text-gray-600">Add a YouTube short video to your webinar collection</p>
            </div>

            <WebinarForm mode="create" />
        </div>
    );
}
