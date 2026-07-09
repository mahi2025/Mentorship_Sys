import { z } from "zod";

export const updateProfileSchema = z
  .object({
    headline: z.string().min(1).max(255).nullable().optional(),

    bio: z.string().min(1).max(2000).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
