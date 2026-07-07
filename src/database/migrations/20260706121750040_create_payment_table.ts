import { Kysely } from "kysely";
import type { DB } from "../types";

export async function up(db: Kysely<DB>): Promise<void> {
    await db.schema
      .createTable("payment")
      .addColumn("id", "serial", (col) => col.primaryKey())

      .addColumn("booking_id", "integer", (col) =>
        col.notNull().references("booking.id").onDelete("cascade"),
      )

      .addColumn("amount", "numeric", (col) => col.notNull())

      .addColumn("method", "text", (col) => col.notNull())

      .addColumn("status", "text", (col) => col.defaultTo("pending").notNull())
      // created_at: Generated<Date>;
      //updated_at: Generated<Date>;
      .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
    await db.schema
    .dropTable("payment")
    .execute();
}
