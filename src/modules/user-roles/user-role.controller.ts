import type { Request, Response, NextFunction } from "express";
import { UserRoleService } from "./user-role.service";

const userRoleService = new UserRoleService();

export interface UserIdParams {
  [key: string]: string;
  userId: string;
}

export interface AssignRoleBody {
  role: string;
}

export async function getUserRoles(
  req: Request<UserIdParams>,
  res: Response,
  next: NextFunction,
) {
  try {
    const roles = await userRoleService.getUserRoles(req.params.userId);

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

export async function assignRole(
  req: Request<UserIdParams, unknown, AssignRoleBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const result = await userRoleService.assignRole(userId, role, req.user!.id);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeRole(
  req: Request<UserIdParams, unknown, AssignRoleBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const result = await userRoleService.removeRole(userId, role);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
