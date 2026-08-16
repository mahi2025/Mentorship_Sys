import { db } from "../../config/database";

export class ServiceRepository {
  async create(data: {
    mentor_id: string;
    title: string;
    description: string;
    duration: number;
  }) {
    return db
      .insertInto("service")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: number) {
    return db
      .selectFrom("service")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findByMentorId(mentorId: string) {
    return db
      .selectFrom("service")
      .selectAll()
      .where("mentor_id", "=", mentorId)
      .orderBy("created_at", "desc")
      .execute();
  }

  async findAll() {
    return db
      .selectFrom("service")
      .selectAll()
      .orderBy("created_at", "desc")
      .execute();
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      duration?: number;
    },
  ) {
    return db
      .updateTable("service")
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }

  async delete(id: number) {
    return db.deleteFrom("service").where("id", "=", id).executeTakeFirst();
  }
}
