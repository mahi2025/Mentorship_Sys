import { z } from "zod";

export const updateProfileSchema = z.object({
  headline: z.string().max(255).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(255).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
