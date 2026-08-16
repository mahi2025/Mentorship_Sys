import { AppError } from "../../shared/errors/AppError";
import { db } from "../../config/database";
import { BookingRepository } from "./booking.repository";
import type { BookingStatus } from "../../database/schema";

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export class BookingService {
  private bookingRepository = new BookingRepository();

  async createBooking(menteeId: string, serviceId: number, timeslot: Date) {
    // 1. Find service
    const service = await db
      .selectFrom("service")
      .selectAll()
      .where("id", "=", serviceId)
      .executeTakeFirst();

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    // 2. Calculate booking end
    const start = new Date(timeslot);

    const end = new Date(start.getTime() + service.duration * 60 * 1000);

    // 3. Determine day of week
    const dayOfWeek = start.getDay();

    // 4. Get service availability
    const availability = await db
      .selectFrom("availability")
      .selectAll()
      .where("service_id", "=", serviceId)
      .where("day_of_week", "=", dayOfWeek)
      .execute();

    if (availability.length === 0) {
      throw new AppError("Service is not available on this day", 400);
    }

    // 5. Check whether the complete duration fits
    const startMinutes = start.getHours() * 60 + start.getMinutes();

    const endMinutes = end.getHours() * 60 + end.getMinutes();

    const fitsAvailability = availability.some((slot) => {
      const availabilityStart = timeToMinutes(slot.start_time);

      const availabilityEnd = timeToMinutes(slot.end_time);

      return startMinutes >= availabilityStart && endMinutes <= availabilityEnd;
    });

    if (!fitsAvailability) {
      throw new AppError(
        "Selected time is outside the mentor's availability",
        400,
      );
    }

    // 6. Check conflicting bookings
    const existingBookings = await db
      .selectFrom("booking")
      .selectAll()
      .where("service_id", "=", serviceId)
      .where("status", "in", ["pending", "confirmed"])
      .execute();

    const hasConflict = existingBookings.some((booking) => {
      const existingStart = new Date(booking.timeslot);

      const existingEnd = new Date(
        existingStart.getTime() + service.duration * 60 * 1000,
      );

      return start < existingEnd && end > existingStart;
    });

    if (hasConflict) {
      throw new AppError("This time slot is already booked", 409);
    }

    // 7. Create pending booking
    return this.bookingRepository.create({
      mentee_id: menteeId,
      service_id: serviceId,
      timeslot: start,
      status: "pending",
    });
}
  async updateStatus(
    bookingId: number,
    newStatus: BookingStatus,
    userId: string,
  ) {
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    /*
     * Status lifecycle:
     *
     * pending
     *    ├── confirmed
     *    └── cancelled
     *
     * confirmed
     *    ├── completed
     *    └── cancelled
     */

    if (booking.status === "pending") {
      if (newStatus !== "confirmed" && newStatus !== "cancelled") {
        throw new AppError("Invalid booking status transition", 400);
      }
    }

    if (booking.status === "confirmed") {
      if (newStatus !== "completed" && newStatus !== "cancelled") {
        throw new AppError("Invalid booking status transition", 400);
      }
    }

    if (booking.status === "completed" || booking.status === "cancelled") {
      throw new AppError("Booking can no longer be changed", 400);
    }

    return this.bookingRepository.updateStatus(bookingId, newStatus);
  }
}
