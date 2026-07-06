import { Pool } from "pg";
import { env } from "../config/env";
/*
export const pool = new Pool({   connectionString: "postgresql://postgres:password@localhost:5432/database",
 });

 */
export const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: Number(env.DB_PORT),
});
/*
, import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({   connectionString: "postgresql://postgres:password@localhost:5432/database",
 });

 */


 