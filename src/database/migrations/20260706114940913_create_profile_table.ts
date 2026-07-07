import { Kysely } from "kysely";
import type { DB } from "../types";

export async function up(db: Kysely<DB>): Promise<void> {
    await db.schema

      .createTable("profile")

      .addColumn("id", "serial", (col) => col.primaryKey())

      .addColumn("user_id", "text", (col) =>
        col
          .notNull()

          .references("user.id")

          .onDelete("cascade"),
      )

      .addColumn("headline", "text")

      .addColumn("bio", "text")

      .addColumn("location", "text")
      // created_at: Generated<Date>;
  //updated_at: Generated<Date>;

      .execute();

}

export async function down(db: Kysely<DB>): Promise<void> {
    await db.schema
      .dropTable("profile")
      .execute();
}
