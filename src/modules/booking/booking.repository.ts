import { db } from "../../config/database";
import type { Kysely } from "kysely";
import type { DB } from "../../database/schema";
import type { BookingStatus } from "../../database/schema";

export class BookingRepository {
  async create(
    database: Kysely<DB>,
    data: {
    mentee_id: string;
    service_id: number;
    timeslot: Date;
    status: "pending";
    },
  ) {
    return database
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

  async findByIdWithServiceOwner(id: number) {
    return db
      .selectFrom("booking")
      .innerJoin("service", "service.id", "booking.service_id")
      .select([
        "booking.id",
        "booking.mentee_id",
        "booking.service_id",
        "booking.status",
        "service.mentor_id",
      ])
      .where("booking.id", "=", id)
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
