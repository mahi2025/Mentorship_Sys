import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./db_pool";
import type { DB } from "../database/types";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
});
