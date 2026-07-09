import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { signUpSchema, signInSchema } from "./auth.validation";
import { ApiResponse } from "../../shared/responses/ApiResponse";

const authService = new AuthService();

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = signUpSchema.parse(req.body);
    const name = input.name ?? input.email.split("@")[0];
    const user = await authService.signUp({
      email: input.email,
      password: input.password,
      name,
    });

    return ApiResponse.created(res, user, "User created successfully");
  } catch (error) {
    next(error);
  }
}
