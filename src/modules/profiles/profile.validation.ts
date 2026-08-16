import { z } from "../../docs/zod-openapi";

export const updateProfileSchema = z
  .object({
    headline: z.string().min(1).max(255).nullable().optional().openapi({
      example: "Graphics Designer",
    }),
    bio: z.string().min(1).max(2000).nullable().optional().openapi({
      example: "Graphics Designer",
    }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const profileResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
