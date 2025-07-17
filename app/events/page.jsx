"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
            <div className="container mx-auto px-4 py-10"></div>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{event.date} at {event.time}</p>
                <p className="text-gray-700 mb-4">{event.description?.slice(0, 100)}...</p>
                <Link
                  href={`/events/${event._id}`}
                  className="text-green-600 font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
