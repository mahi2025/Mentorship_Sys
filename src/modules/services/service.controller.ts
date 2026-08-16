import type { Request, Response, NextFunction } from "express";
import { ServiceService } from "./service.service";
import { createServiceSchema, updateServiceSchema } from "./service.validation";

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
    const service = await serviceService.getServiceById(Number(req.params.id));

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
      Number(req.params.id),
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
