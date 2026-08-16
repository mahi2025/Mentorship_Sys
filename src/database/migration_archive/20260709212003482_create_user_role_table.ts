import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_role")

    .addColumn("user_id", "uuid", (col) => col.notNull())

    .addColumn("role_id", "integer", (col) => col.notNull())

    .addColumn("assigned_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )

    .addColumn("assigned_by", "uuid")

    .addPrimaryKeyConstraint("user_role_pk", ["user_id", "role_id"])

    .addForeignKeyConstraint(
      "user_role_user_fk",
      ["user_id"],
      "user",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )

    .addForeignKeyConstraint(
      "user_role_role_fk",
      ["role_id"],
      "role",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )

    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_role").execute();
}
