import { AppError } from "../../shared/errors/AppError";
import { ServiceRepository } from "./service.repository";

export class ServiceService {
  private serviceRepository = new ServiceRepository();

  async createService(
    mentorId: string,
    data: {
      title: string;
      description: string;
      duration: number;
    },
  ) {
    return this.serviceRepository.create({
      mentor_id: mentorId,
      ...data,
    });
  }

  async getServiceById(id: number) {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    return service;
  }

  async getAllServices() {
    return this.serviceRepository.findAll();
  }

  async getMentorServices(mentorId: string) {
    return this.serviceRepository.findByMentorId(mentorId);
  }

  async updateService(
    serviceId: number,
    mentorId: string,
    data: {
      title?: string;
      description?: string;
      duration?: number;
    },
  ) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.mentor_id !== mentorId) {
      throw new AppError("You can only update your own services", 403);
    }

    return this.serviceRepository.update(serviceId, data);
  }
}
