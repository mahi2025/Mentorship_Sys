import type { Request, Response, NextFunction } from "express";
import { AvailabilityService } from "./availability.service";
import { createAvailabilitySchema } from "./availability.validation";

const availabilityService = new AvailabilityService();

export async function createAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const serviceId = Number(req.params.serviceId);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const data = createAvailabilitySchema.parse(req.body);

    const availability = await availabilityService.create(
      serviceId,
      req.user!.id,
      data,
    );

    return res.status(201).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const serviceId = Number(req.params.serviceId);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const availability = await availabilityService.getByService(serviceId);

    return res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    next(error);
  }
}
