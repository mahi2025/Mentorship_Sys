import type { RequestHandler } from "express";
import { auth } from "../auth/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AppError } from "../shared/errors/AppError";
import { UserRoleRepository } from "../modules/user-roles/user-role.repository";

const userRoleRepository = new UserRoleRepository();

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new AppError("Unauthorized", 401));
    }

    const roles = await userRoleRepository.findRolesByUserId(session.user.id);

    req.user = {
      ...session.user,
      roles: roles.map((role) => role.name),
    };

    next();
  } catch (error) {
    next(new AppError("Unauthorized", 401));
  }
};
