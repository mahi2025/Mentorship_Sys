import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("availability")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("service_id", "integer", (col) =>
      col.notNull().references("service.id").onDelete("cascade"),
    )
    .addColumn("day_of_week", "integer", (col) => col.notNull())
    .addColumn("start_time", "time", (col) => col.notNull())
    .addColumn("end_time", "time", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addCheckConstraint(
      "availability_day_of_week_check",
      sql`day_of_week >= 0 AND day_of_week <= 6`,
    )
    .addCheckConstraint("availability_time_check", sql`start_time < end_time`)
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("availability").ifExists().execute();
}
