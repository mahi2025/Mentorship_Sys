import type { Request, Response, NextFunction } from "express";
import { ProfileService } from "./profile.service";
import { updateProfileSchema } from "./profile.validation";
import { AppError } from "../../shared/errors/AppError";

const profileService = new ProfileService();

export async function getMyProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);

    const profile = await profileService.getProfile(userId);
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
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
    if (!userId) throw new AppError("Unauthorized", 401);

    const payload = updateProfileSchema.parse(req.body);

    await profileService.updateProfile(userId, payload);
    const updated = await profileService.getProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}
