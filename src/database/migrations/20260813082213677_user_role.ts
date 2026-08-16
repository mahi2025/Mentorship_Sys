import { Kysely, sql } from "kysely";
import type { DB } from "../schema";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_role")
    .addColumn("user_id", "text", (col) => col.notNull())
    .addColumn("role_id", "integer", (col) => col.notNull())
    .addColumn("assigned_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("assigned_by", "text")
    .addPrimaryKeyConstraint("user_role_pk", ["user_id", "role_id"])
    .addForeignKeyConstraint(
      "user_role_user_fk",
      ["user_id"],
      "user",
      ["id"],
      (fk) => fk.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "user_role_role_fk",
      ["role_id"],
      "role",
      ["id"],
      (fk) => fk.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "user_role_assigned_by_fk",
      ["assigned_by"],
      "user",
      ["id"],
      (fk) => fk.onDelete("set null"),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_role").ifExists().execute();
}
