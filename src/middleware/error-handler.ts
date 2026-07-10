import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/errors/AppError";
import logger from "../config/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    logger.warn(err.message, { path: req.path, method: req.method });
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (err instanceof ZodError) {
    logger.warn("validation failed", { path: req.path, issues: err.issues });
    return res
      .status(400)
      .json({
        success: false,
        message: "Validation failed",
        errors: err.issues,
      });
  }

  logger.error(err.message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
}