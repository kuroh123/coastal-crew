"use client";

import SolutionCard from "@/components/solutions/SolutionCard"; // adjust path accordingly
import React, { useEffect, useState } from "react";

// const featuredEvents = [
//   {
//     id: "1",
//     title: "Beach Cleanup",
//     description:
//       "Join us for a beach cleaning activity this weekend! Help preserve our coastline and make a difference.",
//     imageUrl: "/images/beach-cleanup.jpg",
//   },
//   {
//     id: "2",
//     title: "River Restoration",
//     description:
//       "Volunteer with us to restore our local river ecosystem. Plant trees, remove debris, and improve the habitat for wildlife.",
//     imageUrl: "/images/river-restoration.jpg",
//   },
//   {
//     id: "3",
//     title: "Community Gardening",
//     description:
//       "Get your hands dirty and help grow fresh produce in our community garden! No experience necessary - just come prepared to work hard.",
//     imageUrl: "/images/community-gardening.jpg",
//   },
// ];

const FeaturedEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/events/featured", {
        cache: "no-store", // 👈 disables client-side/browser caching
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <SolutionCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
