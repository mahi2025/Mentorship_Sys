import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {

    const role = (req.user as any)?.role;

    if (!role|| !allowedRoles.includes(role)) {
      return res.status(403).json({
         error: "Forbidden"
       });
    }
    next();
  };
