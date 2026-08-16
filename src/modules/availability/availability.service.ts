import { AvailabilityRepository } from "./availability.repository";
import { AppError } from "../../shared/errors/AppError";
import { db } from "../../config/database";

const availabilityRepository = new AvailabilityRepository();

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export class AvailabilityService {
  async create(
    serviceId: number,
    mentorId: string,
    data: {
      day_of_week: number;
      start_time: string;
      end_time: string;
    },
  ) {
    const service = await db
      .selectFrom("service")
      .select(["id", "mentor_id"])
      .where("id", "=", serviceId)
      .executeTakeFirst();

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.mentor_id !== mentorId) {
      throw new AppError(
        "You can only configure availability for your own service",
        403,
      );
    }

    const start = timeToMinutes(data.start_time);
    const end = timeToMinutes(data.end_time);

    if (end <= start) {
      throw new AppError("End time must be after start time", 400);
    }

    return availabilityRepository.create({
      service_id: serviceId,
      ...data,
    });
  }

  async getByService(serviceId: number) {
    const service = await db
      .selectFrom("service")
      .select("id")
      .where("id", "=", serviceId)
      .executeTakeFirst();

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    return availabilityRepository.findByServiceId(serviceId);
  }
}
