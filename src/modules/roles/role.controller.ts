import type { Request, Response, NextFunction } from "express";
import { RoleService } from "./role.service";
import { parsePositiveInt } from "../../shared/validation/params";

const roleService = new RoleService();

export async function getRoles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const roles = await roleService.getRoles();

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRoleById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parsePositiveInt(req.params.id, "role ID");

    const role = await roleService.getRoleById(id);

    return res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    next(error);
  }
}
