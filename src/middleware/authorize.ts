import { Request, Response, NextFunction } from "express";

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles;


  if (!userRoles) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const allowed = allowedRoles.some((role) => userRoles.includes(role));

   if (!allowed) {
     return res.status(403).json({
       message: "You don't have permission",
     });
   }

   next();
  };
