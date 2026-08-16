import type { Request, Response, NextFunction } from "express";
import { getAllUsers } from "./user.service";

export async function listUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}
