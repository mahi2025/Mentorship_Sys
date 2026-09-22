import type { Request, Response, NextFunction } from "express";
import { ServiceService } from "./service.service";
import { createServiceSchema, updateServiceSchema } from "./service.validation";
import { parsePositiveInt } from "../../shared/validation/params";

const serviceService = new ServiceService();

export async function createService(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createServiceSchema.parse(req.body);

    const service = await serviceService.createService(req.user!.id, data);

    return res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
}

export async function getServices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const services = await serviceService.getAllServices();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const service = await serviceService.getServiceById(
      parsePositiveInt(req.params.id, "service ID"),
    );

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateService(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = updateServiceSchema.parse(req.body);

    const service = await serviceService.updateService(
      parsePositiveInt(req.params.id, "service ID"),
      req.user!.id,
      data,
    );

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
}
