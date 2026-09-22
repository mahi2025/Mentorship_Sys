import type { Request, Response, NextFunction } from "express";
import { AvailabilityService } from "./availability.service";
import { createAvailabilitySchema } from "./availability.validation";
import { parsePositiveInt } from "../../shared/validation/params";

const availabilityService = new AvailabilityService();

export async function createAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const serviceId = parsePositiveInt(req.params.serviceId, "service ID");

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
    const serviceId = parsePositiveInt(req.params.serviceId, "service ID");

    const availability = await availabilityService.getByService(serviceId);

    return res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    next(error);
  }
}
