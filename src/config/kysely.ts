import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import { env } from "./env";
import type { Database } from "../database/types";

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    }),
  }),
});
