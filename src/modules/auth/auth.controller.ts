import type { Request, Response, NextFunction } from "express";
import { auth } from "../../auth/auth";
import { ProfileService } from "../profile/profile.service";
import { signUpSchema } from "./auth.validation";

const profileService = new ProfileService();

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = signUpSchema.parse(req.body);

    const resolvedName = name ?? email.split("@")[0];

    const result = await auth.api.signUpEmail({
      body: {
        name: resolvedName,
        email,
        password,
      },
    });

    await profileService.createProfile(result.user.id);

    return res.status(201).json({
      message: "User created successfully",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}
