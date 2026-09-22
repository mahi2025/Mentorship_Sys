import type { Request, Response, NextFunction } from "express";

import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";

import { BookingService } from "./booking.service";
import { parsePositiveInt } from "../../shared/validation/params";

const bookingService = new BookingService();

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const serviceId = parsePositiveInt(req.params.serviceId, "service ID");

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
    const bookingId = parsePositiveInt(req.params.bookingId, "booking ID");

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