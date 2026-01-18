import prisma from "../config/database.config";

interface CreateEventInput {
  organizer_id: string;
  title: string;
  description?: string;
  event_type?: string;
  category?: string;
  start_time: Date;
  end_time: Date;
  timezone?: string;
  venue_name?: string;
  venue_address?: string;
  venue_latitude?: number;
  venue_longitude?: number;
  max_in_person_capacity?: number;
  max_virtual_capacity?: number;
  banner_image_url?: string;
  ticket_types: Array<{
    name: string;
    description?: string;
    attendance_mode: string;
    price: number;
    quantity_available: number;
    sale_start_time?: Date;
    sale_end_time?: Date;
  }>;
}

interface UpdateEventInput {
  title?: string;
  description?: string;
  event_type?: string;
  category?: string;
  start_time?: Date;
  end_time?: Date;
  timezone?: string;
  venue_name?: string;
  venue_address?: string;
  venue_latitude?: number;
  venue_longitude?: number;
  max_in_person_capacity?: number;
  max_virtual_capacity?: number;
  banner_image_url?: string;
  status?: string;
  is_featured?: boolean;
}

interface EventFilters {
  category?: string;
  event_type?: string;
  status?: string;
  start_date?: Date;
  end_date?: Date;
  search?: string;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  location?: string;
  limit?: number;
  offset?: number;
}

export const createEvent = async (input: CreateEventInput) => {
  const { ticket_types, ...eventData } = input;

  const event = await prisma.event.create({
    data: {
      ...eventData,
      ticket_types: {
        create: ticket_types,
      },
    },
    include: {
      ticket_types: true,
      organizer: {
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          profile_photo_url: true,
        },
      },
    },
  });

  return event;
};

export const getEvents = async (filters: EventFilters = {}) => {
  const {
    category,
    event_type,
    status = "published",
    start_date,
    end_date,
    search,
    is_featured,
    min_price,
    max_price,
    location,
    limit = 20,
    offset = 0,
  } = filters;

  const where: any = {
    status,
  };

  if (category) {
    where.category = category;
  }

  if (event_type) {
    where.event_type = event_type;
  }

  if (is_featured !== undefined) {
    where.is_featured = is_featured;
  }

  if (start_date || end_date) {
    where.start_time = {};
    if (start_date) {
      where.start_time.gte = start_date;
    }
    if (end_date) {
      where.start_time.lte = end_date;
    }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  if (location) {
    where.OR = where.OR || [];
    where.OR.push(
      { venue_name: { contains: location, mode: "insensitive" } },
      { venue_address: { contains: location, mode: "insensitive" } },
    );
  }

  if (min_price !== undefined || max_price !== undefined) {
    where.ticket_types = {
      some: {
        price: {},
      },
    };

    if (min_price !== undefined) {
      where.ticket_types.some.price.gte = min_price;
    }

    if (max_price !== undefined) {
      where.ticket_types.some.price.lte = max_price;
    }
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        ticket_types: true,
        organizer: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            profile_photo_url: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: [{ is_featured: "desc" }, { start_time: "asc" }],
      take: limit,
      skip: offset,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events,
    total,
    limit,
    offset,
  };
};

export const getEventById = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      ticket_types: true,
      organizer: {
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          profile_photo_url: true,
        },
      },
      _count: {
        select: {
          bookings: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

export const updateEvent = async (
  eventId: string,
  userId: string,
  input: UpdateEventInput,
) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizer_id !== userId) {
    throw new Error("Unauthorized: You can only update your own events");
  }

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: input,
    include: {
      ticket_types: true,
      organizer: {
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          profile_photo_url: true,
        },
      },
    },
  });

  return updatedEvent;
};

export const deleteEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizer_id !== userId) {
    throw new Error("Unauthorized: You can only delete your own events");
  }

  await prisma.event.delete({
    where: { id: eventId },
  });

  return {
    message: "Event deleted successfully",
  };
};

export const getOrganizerEvents = async (organizerId: string) => {
  const events = await prisma.event.findMany({
    where: { organizer_id: organizerId },
    include: {
      ticket_types: true,
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return events;
};

export const getFeaturedEvents = async (limit: number = 6) => {
  const events = await prisma.event.findMany({
    where: {
      is_featured: true,
      status: "published",
      start_time: {
        gte: new Date(),
      },
    },
    include: {
      ticket_types: true,
      organizer: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          profile_photo_url: true,
        },
      },
    },
    orderBy: {
      start_time: "asc",
    },
    take: limit,
  });

  return events;
};
