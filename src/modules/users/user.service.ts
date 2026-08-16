import { db } from "../../config/database";

export async function getAllUsers() {
  return db
    .selectFrom("user")
    .select([
      "id",
      "name",
      "email",
      "emailVerified",
      "image",
      "createdAt",
      "updatedAt",
    ])
    .orderBy("createdAt", "desc")
    .execute();
}
