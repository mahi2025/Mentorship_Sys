import type { RequestHandler } from "express";

import { UserRoleService } from "../modules/user-roles/user-role.service";

const userRoleService = new UserRoleService();

export const authorize =
  (...allowedRoles: string[]): RequestHandler =>
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      console.log("AUTH USER:", req.user.id);

      const userRoles = await userRoleService.getUserRoleNames(req.user.id);

      console.log("USER ROLES:", userRoles);
      console.log("ALLOWED ROLES:", allowedRoles);

      const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role),
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission",
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      next(error);
    }
  };
