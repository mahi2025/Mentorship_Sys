import { db } from "../../config/kysely";

export class ProfileService {
  async createProfile(userId: string) {
    return await db
      .insertInto("profile")
      .values({
        user_id: userId,
        headline: "",
        bio: "",
        location: "",
      })
      .execute();
  }

  async getProfile(userId: string) {
    return await db
      .selectFrom("profile")
      .where("user_id", "=", userId)
      .selectAll()
      .executeTakeFirst();
  }

  async updateProfile(userId: string, data: any) {
    return await db
      .updateTable("profile")
      .set(data)
      .where("user_id", "=", userId)
      .execute();
  }
}
