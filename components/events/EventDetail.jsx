import React from "react";

const EventDetail = ({ event }) => {
  if (!event) {
    return <p className="text-center text-gray-500">No event found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
      
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="mb-6 rounded-xl shadow-md w-full max-w-3xl mx-auto"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Contact Email:</strong> {event.contactEmail}</p>
        <p><strong>Contact Phone:</strong> {event.contactPhone}</p>
      </div>

      <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Event Description</h2>
        <p className="mb-4">{event.description}</p>

        {event.details?.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-2">Additional Details</h2>
            <ul className="list-disc list-inside space-y-2">
              {event.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
