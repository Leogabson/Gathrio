"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authApi, eventApi } from "@/lib/api";

interface OrganizerUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  profile_photo_url: string | null;
  bio: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface OrganizerEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  venue_name: string | null;
  status: string;
  banner_image_url: string | null;
  _count?: {
    bookings: number;
  };
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function OrganizerProfilePage() {
  const [user, setUser] = useState<OrganizerUser | null>(null);
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrganizerData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [meResponse, eventsResponse] = await Promise.all([
          authApi.me(),
          eventApi.getMyEvents(),
        ]);

        if (!meResponse.success || !meResponse.data) {
          throw new Error(meResponse.message || "Failed to load profile");
        }

        if (meResponse.data.role !== "organizer") {
          throw new Error("This page is only available to organizer accounts.");
        }

        setUser(meResponse.data);
        setEvents(eventsResponse.success && eventsResponse.data ? eventsResponse.data : []);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not load organizer profile";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrganizerData();
  }, []);

  const metrics = useMemo(() => {
    const totalEvents = events.length;
    const totalAttendees = events.reduce(
      (sum, event) => sum + (event._count?.bookings ?? 0),
      0,
    );
    const upcomingEvents = events.filter(
      (event) => new Date(event.start_time) > new Date(),
    );
    const pastEvents = events.filter(
      (event) => new Date(event.end_time) < new Date(),
    );

    return {
      totalEvents,
      totalAttendees,
      upcomingEvents,
      pastEvents,
    };
  }, [events]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-center">
          <p className="text-sm text-gray-600">Loading organizer profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-6 text-center">
          <p className="text-sm text-red-600">{error || "Unable to load profile."}</p>
          <Link
            href="/signin"
            className="mt-4 inline-flex rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Go to Sign in
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "Organizer";

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-5">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {user.profile_photo_url ? (
                <img
                  src={user.profile_photo_url}
                  alt={fullName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-700">
                  {fullName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-900">{fullName}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Organizer since {formatDate(user.created_at)}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              Organizer
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Events</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{metrics.totalEvents}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Attendees</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{metrics.totalAttendees}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Upcoming</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {metrics.upcomingEvents.length}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Completed</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {metrics.pastEvents.length}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
            <Link href="/events" className="text-sm font-medium text-violet-700">
              Manage all
            </Link>
          </div>

          {metrics.upcomingEvents.length === 0 ? (
            <p className="rounded-xl bg-gray-50 px-4 py-4 text-sm text-gray-600">
              No upcoming events yet. Create one to start gathering attendees.
            </p>
          ) : (
            <div className="space-y-3">
              {metrics.upcomingEvents.slice(0, 4).map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(event.start_time)} • {event.venue_name || "Online"}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {event._count?.bookings ?? 0} attendees
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
