import { db } from "../../config/kysely";

export class UserRepository {
  async createUser(data: {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
  }) {
    return await db
      .insertInto("users")
      .values(data)
      .returningAll()
      .executeTakeFirst();
  }

  async getUserByEmail(email: string) {
    return await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  }

  async getUserById(id: string) {
    return await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async getAllUsers() {
    return await db.selectFrom("users").selectAll().execute();
  }
}
