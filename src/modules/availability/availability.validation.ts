import { z } from "../../docs/zod-openapi";
export const createAvailabilitySchema = z.object({
  day_of_week: z.number().int().min(0).max(6),

  start_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time"),

  end_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time"),
});
