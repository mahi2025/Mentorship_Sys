import { db } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import type { UpdateProfileInput } from "./profiles.validation";

export class ProfilesService {
  async createDefaultProfile(userId: string) {
    const profile = await db
      .insertInto("profile")
      .values({
        user_id: userId,
        headline: null,
        bio: null,
      })
      .onConflict((oc) => oc.column("user_id").doNothing())
      .returningAll()
      .executeTakeFirst();

    if (profile) {
      return profile;
    }

    return db
      .selectFrom("profile")
      .selectAll()
      .where("user_id", "=", userId)
      .executeTakeFirstOrThrow();
  }

  async getByUserId(userId: string) {
    const profile = await db
      .selectFrom("profile")
      .selectAll()
      .where("user_id", "=", userId)
      .executeTakeFirst();

    if (profile) return profile;

    return this.createDefaultProfile(userId);
  }

  async updateByUserId(userId: string, data: UpdateProfileInput) {
    await this.createDefaultProfile(userId);

    const profile = await db
      .updateTable("profile")
      .set({
        ...data,
      })
      .where("user_id", "=", userId)
      .returningAll()
      .executeTakeFirst();

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    return profile;
  }
}
