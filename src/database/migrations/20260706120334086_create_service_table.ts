import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await sql`
    CREATE TYPE service_type AS ENUM ('free', 'paid');
  `.execute(db);

  await db.schema
    .createTable("service")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("mentor_id", "text", (col) => col.notNull())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("type", sql`service_type`, (col) =>
      col.notNull().defaultTo("free"),
    )
    .addColumn("duration", "integer", (col) => col.notNull())
    .addColumn("price", "numeric", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("service").execute();

  await sql`
    DROP TYPE service_type;
  `.execute(db);
}
