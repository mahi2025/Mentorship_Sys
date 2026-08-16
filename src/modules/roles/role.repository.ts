import { db } from "../../config/database";

export class RoleRepository {
  async findAll() {
    return db.selectFrom("role").selectAll().orderBy("id").execute();
  }

  async findById(id: number) {
    return db
      .selectFrom("role")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findByName(name: string) {
    return db
      .selectFrom("role")
      .selectAll()
      .where("name", "=", name)
      .executeTakeFirst();
  }

  async create(data: { name: string; description?: string | null }) {
    return db
      .insertInto("role")
      .values({
        name: data.name,
        description: data.description ?? null,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
