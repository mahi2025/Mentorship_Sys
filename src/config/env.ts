import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string().url(),

  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string().min(1).optional(),

  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);
