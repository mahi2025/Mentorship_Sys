import { Kysely } from "kysely";
import type { DB } from "../types";

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

      .addColumn("status", "text", (col) => col.defaultTo("pending").notNull())

      .addColumn("meeting_platform", "text")

      .addColumn("meeting_link", "text")
      // created_at: Generated<Date>;
      //updated_at: Generated<Date>;
      .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
    await db.schema
    .dropTable("booking")
    .execute();
}
