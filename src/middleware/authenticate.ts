import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/auth";
import { AppError } from "../shared/errors/AppError";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = session.user;
    next();
  } catch {
    return next(new AppError("Unauthorized", 401));
  }
}
