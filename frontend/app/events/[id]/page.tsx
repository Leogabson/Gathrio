interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Details</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Event ID: {params.id}</h2>
        <p className="text-gray-600 mb-4">
          This is a placeholder for event details. Event data will be loaded here.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Book Event
        </button>
      </div>
    </div>
  );
}