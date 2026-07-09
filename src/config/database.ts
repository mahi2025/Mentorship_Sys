import { sql, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "./env";
import type { DB } from "../database/schema";

export const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({ pool }),
});

export async function connectDB() {
  try {
    await sql`SELECT 1`.execute(db);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}
