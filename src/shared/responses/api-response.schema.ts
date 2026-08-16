import { z } from "../../docs/zod-openapi";
import { profileResponseSchema } from "../../modules/profiles/profile.validation";

export const updateProfileResponseSchema = z.object({
  success: z.literal(true),

  message: z.string(),

  data: profileResponseSchema,
});
