import { db } from "../../config/database";

export class ProfileRepository {
  async findByUserId(userId: string) {
    return db
      .selectFrom("profile")
      .selectAll()
      .where("user_id", "=", userId)
      .executeTakeFirst();
  }

  async create(userId: string) {
    return db
      .insertInto("profile")
      .values({
        user_id: userId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    userId: string,
    data: {
      headline?: string | null;
      bio?: string | null;
    },
  ) {
    return db
      .updateTable("profile")
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where("user_id", "=", userId)
      .returningAll()
      .executeTakeFirst();
  }
}
