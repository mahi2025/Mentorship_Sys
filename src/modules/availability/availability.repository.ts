import { db } from "../../config/database";

export class AvailabilityRepository {
  async create(data: {
    service_id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
  }) {
    return db
      .insertInto("availability")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findByServiceId(serviceId: number) {
    return db
      .selectFrom("availability")
      .selectAll()
      .where("service_id", "=", serviceId)
      .orderBy("day_of_week", "asc")
      .orderBy("start_time", "asc")
      .execute();
  }

  async findById(id: number) {
    return db
      .selectFrom("availability")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async delete(id: number) {
    return db
      .deleteFrom("availability")
      .where("id", "=", id)
      .executeTakeFirst();
  }
}
