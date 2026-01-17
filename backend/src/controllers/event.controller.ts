import { Request, Response } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
  getFeaturedEvents,
} from "../services/event.service";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      event_type,
      category,
      start_time,
      end_time,
      timezone,
      venue_name,
      venue_address,
      venue_latitude,
      venue_longitude,
      max_in_person_capacity,
      max_virtual_capacity,
      banner_image_url,
      ticket_types,
    } = req.body;

    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Please login to create events",
      });
      return;
    }

    if (!title || !start_time || !end_time) {
      res.status(400).json({
        success: false,
        message: "Title, start time, and end time are required",
      });
      return;
    }

    if (!ticket_types || ticket_types.length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one ticket type is required",
      });
      return;
    }

    const event = await createEvent({
      organizer_id: userId,
      title,
      description,
      event_type,
      category,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      timezone,
      venue_name,
      venue_address,
      venue_latitude,
      venue_longitude,
      max_in_person_capacity,
      max_virtual_capacity,
      banner_image_url,
      ticket_types,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create event";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      event_type,
      status,
      start_date,
      end_date,
      search,
      is_featured,
      limit,
      offset,
    } = req.query;

    const filters: any = {};

    if (category) filters.category = category as string;
    if (event_type) filters.event_type = event_type as string;
    if (status) filters.status = status as string;
    if (search) filters.search = search as string;
    if (is_featured !== undefined) filters.is_featured = is_featured === "true";
    if (limit) filters.limit = parseInt(limit as string);
    if (offset) filters.offset = parseInt(offset as string);
    if (start_date) filters.start_date = new Date(start_date as string);
    if (end_date) filters.end_date = new Date(end_date as string);

    const result = await getEvents(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch events";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await getEventById(id);

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch event";
    const statusCode = errorMessage === "Event not found" ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Please login to update events",
      });
      return;
    }

    const updateData = req.body;

    if (updateData.start_time) {
      updateData.start_time = new Date(updateData.start_time);
    }
    if (updateData.end_time) {
      updateData.end_time = new Date(updateData.end_time);
    }

    const event = await updateEvent(id, userId, updateData);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update event";
    const statusCode = errorMessage.includes("Unauthorized") ? 403 : 400;
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Please login to delete events",
      });
      return;
    }

    const result = await deleteEvent(id, userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete event";
    const statusCode = errorMessage.includes("Unauthorized") ? 403 : 400;
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const getMyEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Please login to view your events",
      });
      return;
    }

    const events = await getOrganizerEvents(userId);

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch your events";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const getFeatured = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit } = req.query;
    const limitNumber = limit ? parseInt(limit as string) : 6;

    const events = await getFeaturedEvents(limitNumber);

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch featured events";
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
