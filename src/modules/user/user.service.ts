import { db } from "../../config/kysely";

export class UserService {
  async getAllUsers() {
    return await db.selectFrom("user").selectAll().execute();
  }

  async getUserById(id: string) {
    return await db
      .selectFrom("user")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
  }
}