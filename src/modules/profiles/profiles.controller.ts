import type { Request, Response, NextFunction } from "express";

import { ProfilesService } from "./profiles.service";
import { updateProfileSchema } from "./profiles.validation";
import { ApiResponse } from "../../shared/responses/ApiResponse";
import { AppError } from "../../shared/errors/AppError";
import { auth } from "../../auth/auth";

const profilesService = new ProfilesService();

export async function getMyProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const profile = await profilesService.getByUserId(userId);

    return ApiResponse.success(res, profile, "Profile retrieved successfully");
  } catch (error) {
      console.error("PROFILE ERROR:", error);

    next(error);
  }
}

export async function updateMyProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const payload = updateProfileSchema.parse(req.body);

    const profile = await profilesService.updateByUserId(userId, payload);

    return ApiResponse.success(res, profile, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
}
