import { z } from "../../docs/zod-openapi";

export const createBookingSchema = z.object({
  timeslot: z
    .string()
    .datetime({ offset: true })
    .transform((value) => new Date(value))
    .openapi({
      example: "2026-10-01T14:00:00Z",
      description: "ISO-8601 timestamp with an explicit timezone or UTC Z suffix.",
    }),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["confirmed", "completed", "cancelled"]),
});
