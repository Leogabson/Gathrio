"use client";

import React, { useState, useEffect } from "react";
import EventCard from "@/components/ui/EventCard";
import Link from "next/link";
import Image from "next/image";

interface TicketType {
  id: string;
  name: string;
  price: number;
  attendance_mode: string;
}

interface Organizer {
  id: string;
  first_name: string;
  last_name: string;
  profile_photo_url?: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: string;
  category?: string;
  venue_name?: string;
  venue_address?: string;
  banner_image_url?: string;
  ticket_types: TicketType[];
  organizer: Organizer;
  is_featured?: boolean;
  _count?: {
    bookings: number;
  };
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { icon: "🎤", name: "Conferences", value: "Technology" },
    { icon: "🎵", name: "Concerts", value: "Music" },
    { icon: "🎨", name: "Workshops", value: "Arts" },
    { icon: "👥", name: "Networking", value: "Business" },
    { icon: "⚽", name: "Sports", value: "Sports" },
  ];

  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    fetchEvents();
    fetchFeaturedEvents();
    fetchLiveEvents();
    fetchMetrics();
  }, [searchQuery, selectedEventType]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("status", "published");

      if (searchQuery) params.append("search", searchQuery);
      if (selectedEventType) params.append("event_type", selectedEventType);

      const response = await fetch(
        `http://localhost:5000/api/events?${params.toString()}`,
      );
      const data = await response.json();

      if (data.success) {
        setEvents(data.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeaturedEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/featured?limit=1",
      );
      const data = await response.json();

      if (data.success) {
        setFeaturedEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching featured events:", error);
    }
  };

  const fetchLiveEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/live?limit=3",
      );
      const data = await response.json();

      if (data.success) {
        setLiveEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching live events:", error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events/metrics");
      const data = await response.json();

      if (data.success) {
        setMetrics(data.data);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    ``;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getLowestPrice = (ticketTypes: TicketType[]) => {
    if (ticketTypes.length === 0) return "Free";
    const prices = ticketTypes.map((t) => Number(t.price));
    const minPrice = Math.min(...prices);
    return minPrice === 0 ? "Free" : `₦${minPrice.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 md:hidden">
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <Image
            src="/gathrio-icon-color.png"
            alt="gathrio"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-gray-900">Gathrio</span>
        </div>

        <button className="p-2 relative">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4 items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/gathrio-icon-color.png"
              alt="gathrio"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-gray-900">Gathrio</span>
          </div>

          <nav className="flex items-center gap-46">
            <Link href="/events" className="text-[#6366F1] font-medium">
              Events
            </Link>
            <Link
              href="/create-event"
              className="text-gray-600 hover:text-blue-900"
            >
              Create Event
            </Link>
            <Link
              href="/my-tickets"
              className="text-gray-600 hover:text-blue-900"
            >
              My Tickets
            </Link>
            <Link
              href="/calendar"
              className="text-gray-600 hover:text-blue-900"
            >
              Calendar
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Side Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl md:hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">Gathrio</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <Link
                href="/events"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-50 text-[#6366F1] font-medium mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Events
              </Link>

              <Link
                href="/create-event"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-900 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Event
              </Link>

              <Link
                href="/my-tickets"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-900 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                My Tickets
              </Link>

              <Link
                href="/calendar"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-900 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-900 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <Link
                  href="/signin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#6366F1] text-white hover:bg-[#5558E3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Hero Section */}
      <div className="px-4 pt-4 pb-6">
        <div className="relative rounded-3xl overflow-hidden h-105">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
              alt="Event crowd"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6">
            {/* Badge */}
            <div className="flex">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                New Platform Features
              </span>
            </div>

            {/* Text and Button */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                Connect Events
                <br />
                Across Every
                <br />
                Distance
              </h2>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Experience the best of in-person energy and digital flexibility
                combined with Gathrio.
              </p>

              {/* Join Now Button */}
              <button className="w-full bg-white text-[#6366F1] py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                Join Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events, artists, or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-gray-100 rounded-lg"
          >
            <svg
              className="w-5 h-5 text-[#6366F1]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
          Date
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            setSelectedEventType(selectedEventType === "hybrid" ? "" : "hybrid")
          }
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
            selectedEventType === "hybrid"
              ? "bg-[#6366F1] text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          Hybrid
          {selectedEventType === "hybrid" && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
          Location
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
          Price
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Live Now Section */}
      {liveEvents.length > 0 && (
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <h3 className="text-lg font-bold text-gray-900">Live Now</h3>
            </div>
            <Link
              href="/events/live"
              className="text-[#6366F1] text-sm font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {liveEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="h-48 bg-linear-to-br from-gray-800 to-gray-900">
                    {event.banner_image_url ? (
                      <img
                        src={event.banner_image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#6366F1] to-[#3B82F6]"></div>
                    )}
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      LIVE
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {event._count?.bookings || 1240} Online
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                    <h4 className="text-white font-bold mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <span>{event.venue_name || event.venue_address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      +2k Watching together
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-semibold">
                    Join Stream
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Explore Categories */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Explore Categories
        </h3>

        <div className="flex gap-32 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className="flex flex-col items-center gap-2 min-w-17.5"
            >
              <div className="w-14 h-14 bg-linear-to-br from-blue-300 to-purple-300 rounded-3xl flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
          <button className="p-1">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const inPersonTicket = event.ticket_types.find(
                (t) => t.attendance_mode === "in-person",
              );
              const virtualTicket = event.ticket_types.find(
                (t) => t.attendance_mode === "virtual",
              );

              return (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="flex gap-3">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      {event.banner_image_url ? (
                        <img
                          src={event.banner_image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#6366F1] to-[#3B82F6]"></div>
                      )}
                      {event.event_type === "hybrid" && (
                        <div className="absolute top-1 left-1">
                          <span className="px-2 py-0.5 bg-[#6366F1] text-white text-[10px] font-bold rounded uppercase">
                            Hybrid
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                        <span>{event.venue_name || event.venue_address}</span>
                        <span>•</span>
                        <span>{formatDate(event.start_time)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        {inPersonTicket && (
                          <span className="font-semibold text-gray-900">
                            ₦{Number(inPersonTicket.price).toLocaleString()}{" "}
                            In-person
                          </span>
                        )}
                        {virtualTicket && (
                          <span className="font-semibold text-green-600">
                            {Number(virtualTicket.price) === 0
                              ? "Free"
                              : `₦${Number(virtualTicket.price).toLocaleString()}`}{" "}
                            Virtual
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <div className="text-[#6366F1] font-bold text-sm">
                          {formatDate(event.start_time).split(" ")[0]}
                        </div>
                        <div className="text-[#6366F1] font-bold text-lg">
                          {formatDate(event.start_time).split(" ")[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Trust Metrics */}
      <div className="px-4 pb-6">
        <div className="text-center mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Trusted Platform
          </h4>
        </div>

        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalEvents > 0 ? `${metrics.totalEvents}+` : "0"}
            </div>
            <div className="text-xs text-gray-600">Events Hosted</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalAttendees > 0 ? `${metrics.totalAttendees}+` : "0"}
            </div>
            <div className="text-xs text-gray-600">Attendees</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 flex items-center gap-1 justify-center">
              {metrics.satisfaction > 0
                ? metrics.satisfaction.toFixed(1)
                : "0.0"}
              <span className="text-yellow-500">⭐</span>
            </div>

            <div className="text-xs text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50">
        <div className="flex items-center justify-between">
          <button className="flex flex-col items-center gap-1 text-[#6366F1]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <span className="text-xs">My Tickets</span>
          </button>

          <button className="w-14 h-14 -mt-8 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Calendar</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default EventsPage;
