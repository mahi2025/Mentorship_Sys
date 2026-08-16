import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("booking")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("mentee_id", "text", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("service_id", "integer", (col) =>
      col.notNull().references("service.id").onDelete("cascade"),
    )
    .addColumn("timeslot", "timestamptz", (col) => col.notNull())
    .addColumn("status", "varchar(20)", (col) =>
      col.notNull().defaultTo("pending"),
    )
    .addColumn("meeting_platform", "varchar(50)")
    .addColumn("meeting_link", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addCheckConstraint(
      "booking_status_check",
      sql`status IN ('pending', 'confirmed', 'completed', 'cancelled')`,
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("booking").ifExists().execute();
}
