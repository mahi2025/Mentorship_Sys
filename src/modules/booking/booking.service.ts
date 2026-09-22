import { AppError } from "../../shared/errors/AppError";
import { db } from "../../config/database";
import { BookingRepository } from "./booking.repository";
import type { BookingStatus } from "../../database/schema";
import { UserRoleRepository } from "../user-roles/user-role.repository";
import {
  assertBookingAccess,
  validateBookingStart,
} from "./booking.policy";

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export class BookingService {
  private bookingRepository = new BookingRepository();
  private userRoleRepository = new UserRoleRepository();

  async createBooking(menteeId: string, serviceId: number, timeslot: Date) {
    validateBookingStart(timeslot);

    return db.transaction().execute(async (transaction) => {
      const service = await transaction
        .selectFrom("service")
        .selectAll()
        .where("id", "=", serviceId)
        .forUpdate()
        .executeTakeFirst();

      if (!service) {
        throw new AppError("Service not found", 404);
      }

      const start = new Date(timeslot);
      const end = new Date(start.getTime() + service.duration * 60 * 1000);
      const dayOfWeek = start.getUTCDay();

      const availability = await transaction
        .selectFrom("availability")
        .selectAll()
        .where("service_id", "=", serviceId)
        .where("day_of_week", "=", dayOfWeek)
        .execute();

      if (availability.length === 0) {
        throw new AppError("Service is not available on this day", 400);
      }

      const startMinutes = start.getUTCHours() * 60 + start.getUTCMinutes();
      const endMinutes = end.getUTCHours() * 60 + end.getUTCMinutes();
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

      const existingBookings = await transaction
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

      return this.bookingRepository.create(transaction, {
        mentee_id: menteeId,
        service_id: serviceId,
        timeslot: start,
        status: "pending",
      });
    });
  }

  async updateStatus(
    bookingId: number,
    newStatus: BookingStatus,
    userId: string,
  ) {
    const booking = await this.bookingRepository.findByIdWithServiceOwner(
      bookingId,
    );

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    const roles = await this.userRoleRepository.findRolesByUserId(userId);
    const roleNames = roles.map((role) => role.name);
    assertBookingAccess(booking, roleNames, userId, newStatus);

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
