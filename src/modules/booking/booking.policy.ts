import { AppError } from "../../shared/errors/AppError";
import type { BookingStatus } from "../../database/schema";

export const BOOKING_MIN_NOTICE_MINUTES = 15;

export function validateBookingStart(
  timeslot: Date,
  now = new Date(),
): void {
  if (Number.isNaN(timeslot.getTime())) {
    throw new AppError("Invalid booking time", 400);
  }

  const earliestAllowed = new Date(
    now.getTime() + BOOKING_MIN_NOTICE_MINUTES * 60 * 1000,
  );

  if (timeslot < earliestAllowed) {
    throw new AppError(
      `Bookings must be at least ${BOOKING_MIN_NOTICE_MINUTES} minutes in the future`,
      400,
    );
  }
}

export type BookingAuthorizationRecord = {
  mentee_id: string;
  mentor_id: string;
};

export function assertBookingAccess(
  booking: BookingAuthorizationRecord,
  roleNames: string[],
  userId: string,
  newStatus: BookingStatus,
): void {
  const isAdmin = roleNames.includes("admin");
  const isMenteeOwner = booking.mentee_id === userId;
  const isMentorOwner = booking.mentor_id === userId;

  if (!isAdmin && !isMenteeOwner && !isMentorOwner) {
    throw new AppError("You do not have access to this booking", 403);
  }

  if (
    !isAdmin &&
    isMenteeOwner &&
    !isMentorOwner &&
    newStatus !== "cancelled"
  ) {
    throw new AppError("Mentees can only cancel their own bookings", 403);
  }

  if (!isAdmin && isMentorOwner && !roleNames.includes("mentor")) {
    throw new AppError("Only mentors can manage service bookings", 403);
  }
}