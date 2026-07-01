import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const envSchema = z.object({

  PORT: z.coerce.number().default(5000),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
