import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await sql`
    CREATE TYPE payment_status AS ENUM (
      'pending',
      'paid',
      'failed',
      'refunded'
    );
  `.execute(db);

  await db.schema
    .createTable("payment")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("booking_id", "integer", (col) =>
      col.notNull().references("booking.id").onDelete("cascade"),
    )
    .addColumn("amount", "numeric", (col) => col.notNull())
    .addColumn("method", "text", (col) => col.notNull())
    .addColumn("status", sql`payment_status`, (col) =>
      col.notNull().defaultTo("pending"),
    )
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("payment").execute();

  await sql`
    DROP TYPE payment_status;
  `.execute(db);
}
