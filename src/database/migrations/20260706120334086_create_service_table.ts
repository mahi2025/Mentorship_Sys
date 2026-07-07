import { Kysely, sql } from "kysely";
import type { DB } from "../types";

export async function up(db: Kysely<DB>): Promise<void> {
    await db.schema

      .createTable("service")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("mentor_id", "text", (col) =>
        col.notNull().references("user.id").onDelete("cascade"),
      )
      .addColumn("title", "text", (col) => col.notNull())
      .addColumn("description", "text", (col) => col.notNull())
      //  type: "free" | "paid";
      .addColumn("duration", "integer", (col) => col.notNull())
      .addColumn("price", "numeric", (col) => col.notNull())
      //  created_at: Generated<Date>;
      //updated_at: Generated<Date>;
      .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
await db.schema
      .dropTable("service")
      .execute();

}
