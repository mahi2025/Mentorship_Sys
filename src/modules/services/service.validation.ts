import { z } from "../../docs/zod-openapi";

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),

  description: z.string().min(10, "Description must be at least 10 characters"),

  duration: z.number().int().positive(),
});

export const updateServiceSchema = createServiceSchema.partial();
