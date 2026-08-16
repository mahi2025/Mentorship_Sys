import { z } from "../../docs/zod-openapi";

export const createBookingSchema = z.object({
  timeslot: z.coerce.date(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["confirmed", "completed", "cancelled"]),
});
