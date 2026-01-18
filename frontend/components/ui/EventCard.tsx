import React from "react";
import Link from "next/link";

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

interface EventCardProps {
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
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  start_time,
  event_type,
  category,
  venue_name,
  venue_address,
  banner_image_url,
  ticket_types,
  organizer,
  is_featured,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getLowestPrice = () => {
    if (ticket_types.length === 0) return null;
    const prices = ticket_types.map((t) => Number(t.price));
    const minPrice = Math.min(...prices);
    return minPrice === 0 ? "Free" : `₦${minPrice.toLocaleString()}`;
  };

  const getEventTypeColor = () => {
    switch (event_type) {
      case "hybrid":
        return "bg-[#6366F1] text-white";
      case "virtual":
        return "bg-[#3B82F6] text-white";
      case "in-person":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Link href={`/events/${id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
        {/* Banner Image */}
        <div className="relative h-48 bg-linear-to-br from-[#6366F1] to-[#3B82F6] overflow-hidden">
          {banner_image_url ? (
            <img
              src={banner_image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-50"
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
            </div>
          )}

          {/* Event Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getEventTypeColor()}`}
            >
              {event_type}
            </span>
          </div>

          {/* Featured Badge */}
          {is_featured && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          {category && (
            <p className="text-sm text-[#6366F1] font-semibold mb-2">
              {category}
            </p>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6366F1] transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Date and Time */}
          <div className="flex items-center gap-2 text-gray-700 mb-3">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">
              {formatDate(start_time)} • {formatTime(start_time)}
            </span>
          </div>

          {/* Location */}
          {(venue_name || venue_address) && (
            <div className="flex items-center gap-2 text-gray-700 mb-4">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm line-clamp-1">
                {venue_name || venue_address}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Organizer */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {organizer.profile_photo_url ? (
                  <img
                    src={organizer.profile_photo_url}
                    alt={`${organizer.first_name} ${organizer.last_name}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-600">
                    {organizer.first_name?.[0]}
                    {organizer.last_name?.[0]}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {organizer.first_name} {organizer.last_name}
              </span>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-lg font-bold text-[#6366F1]">
                {getLowestPrice()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
