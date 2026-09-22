import { z } from "../../docs/zod-openapi";
import { registry } from "../../docs/registry";

const createBookingRequestSchema = z.object({
  timeslot: z.string().datetime({ offset: true }).openapi({
    example: "2026-10-01T14:00:00Z",
    description: "ISO-8601 timestamp with an explicit timezone or UTC Z suffix.",
  }),
});

const updateBookingStatusRequestSchema = z.object({
  status: z.enum(["confirmed", "completed", "cancelled"]),
});

const bookingResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    mentee_id: z.string(),
    service_id: z.number(),
    timeslot: z.string().datetime(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  }),
});

registry.registerPath({
  method: "post",
  path: "/api/services/{serviceId}/bookings",
  tags: ["Bookings"],
  summary: "Create a booking",
  parameters: [
    {
      name: "serviceId",
      in: "path",
      required: true,
      schema: { type: "integer", minimum: 1 },
    },
  ],
  request: {
    body: {
      content: {
        "application/json": { schema: createBookingRequestSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Pending booking created",
      content: { "application/json": { schema: bookingResponseSchema } },
    },
    400: { description: "Invalid time, ID, or availability" },
    409: { description: "The time slot is already booked" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/bookings/{bookingId}/status",
  tags: ["Bookings"],
  summary: "Change booking status",
  parameters: [
    {
      name: "bookingId",
      in: "path",
      required: true,
      schema: { type: "integer", minimum: 1 },
    },
  ],
  request: {
    body: {
      content: {
        "application/json": { schema: updateBookingStatusRequestSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Booking status updated",
      content: { "application/json": { schema: bookingResponseSchema } },
    },
    400: { description: "Invalid ID or status transition" },
    403: { description: "User does not own or manage this booking" },
  },
});