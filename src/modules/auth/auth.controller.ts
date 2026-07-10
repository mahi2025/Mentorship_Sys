import logger from "../../config/logger";
import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { signUpSchema } from "./auth.validation";
import { ApiResponse } from "../../shared/responses/ApiResponse";

const authService = new AuthService();

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const input = signUpSchema.parse(req.body);
    const name = input.name ?? input.email.split("@")[0];

    const result = await authService.signUp({
      email: input.email,
      password: input.password,
      name,
    });

    logger.info("user signed up", { userId: result});
    return ApiResponse.created(res, result, "User created successfully");
  } catch (err) {
    next(err); 
  }
}