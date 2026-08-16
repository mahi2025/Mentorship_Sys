import { db } from "../config/database";

export async function seedAdmin() {
  const email = "admin@gmail.com";

  const user = await db
    .selectFrom("user")
    .select("id")
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user) {
    throw new Error(`User ${email} not found`);
  }

  const role = await db
    .selectFrom("role")
    .select("id")
    .where("name", "=", "admin")
    .executeTakeFirst();

  if (!role) {
    throw new Error("Admin role not found");
  }

  await db
    .insertInto("user_role")
    .values({
      user_id: user.id,
      role_id: role.id,
      assigned_by: null,
    })
    .onConflict((oc) => oc.columns(["user_id", "role_id"]).doNothing())
    .execute();

  console.log(`Admin role assigned to ${email}`);
}

seedAdmin()
  .catch(console.error)
  .finally(() => db.destroy());
