import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await sql`
    CREATE TYPE booking_status AS ENUM (
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    );
  `.execute(db);

  await db.schema
    .createTable("booking")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("mentee_id", "text", (col) => col.notNull())
    .addColumn("service_id", "integer", (col) =>
      col.notNull().references("service.id").onDelete("cascade"),
    )
    .addColumn("timeslot", "timestamptz", (col) => col.notNull())
    .addColumn("status", sql`booking_status`, (col) =>
      col.notNull().defaultTo("pending"),
    )
    .addColumn("meeting_platform", "text")
    .addColumn("meeting_link", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("booking").execute();

  await sql`
    DROP TYPE booking_status;
  `.execute(db);
}
