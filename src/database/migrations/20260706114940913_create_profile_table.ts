import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("profile")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.notNull().unique().references("user.id").onDelete("cascade"),
    )
    .addColumn("headline", "text")
    .addColumn("bio", "text")

    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("profile").execute();
}
