import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: Number(env.DB_PORT),
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};