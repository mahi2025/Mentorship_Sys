import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("service")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("mentor_id", "text", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("title", "varchar(100)", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("duration", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("service").ifExists().execute();
}
