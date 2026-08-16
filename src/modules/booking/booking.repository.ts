import { db } from "../../config/database";
import type { BookingStatus } from "../../database/schema";

export class BookingRepository {
  async create(data: {
    mentee_id: string;
    service_id: number;
    timeslot: Date;
    status: "pending";
  }) {
    return db
      .insertInto("booking")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: number) {
    return db
      .selectFrom("booking")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findByService(serviceId: number) {
    return db
      .selectFrom("booking")
      .selectAll()
      .where("service_id", "=", serviceId)
      .orderBy("timeslot", "asc")
      .execute();
  }

  async findByMentee(menteeId: string) {
    return db
      .selectFrom("booking")
      .selectAll()
      .where("mentee_id", "=", menteeId)
      .orderBy("timeslot", "desc")
      .execute();
  }
  async updateStatus(id: number, status: BookingStatus) {
    return db
      .updateTable("booking")
      .set({
        status,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
