import type { Request, Response, NextFunction } from "express";

import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";

import { BookingService } from "./booking.service";

const bookingService = new BookingService();

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const serviceId = Number(req.params.serviceId);

    if (Number.isNaN(serviceId)) {
      throw new Error("Invalid service ID");
    }

    const { timeslot } = createBookingSchema.parse(req.body);

    const booking = await bookingService.createBooking(
      req.user!.id,
      serviceId,
      timeslot,
    );

    return res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const bookingId = Number(req.params.bookingId);

    if (Number.isNaN(bookingId)) {
      throw new Error("Invalid booking ID");
    }

    const { status } = updateBookingStatusSchema.parse(req.body);

    const booking = await bookingService.updateStatus(
      bookingId,
      status,
      req.user!.id,
    );

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}