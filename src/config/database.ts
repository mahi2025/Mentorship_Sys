import { sql } from "kysely";
import { db } from "./kysely";


export async function connectDB() {
  try {
    await sql`SELECT 1`.execute(db);

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

