import type { Request, Response, NextFunction } from "express";

import { ProfilesService } from "./profile.service";

const profilesService = new ProfilesService();

export async function getMyProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const profile = await profilesService.getProfile(req.user!.id);

    return res.status(200).json({
      success: true,
      data: profile,
    });
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
    const profile = await profilesService.updateProfile(req.user!.id, req.body);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}