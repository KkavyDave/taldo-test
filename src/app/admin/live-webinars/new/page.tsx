import LiveWebinarForm from '@/components/admin/LiveWebinarForm';

export default function NewLiveWebinarPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
                <p className="text-gray-600">Add a new upcoming webinar or event.</p>
            </div>

            <LiveWebinarForm mode="create" />
        </div>
    );
}
