import { Request, Response, NextFunction } from 'express';

export const requireRole = (...allowed: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowed.includes((req.user as any).role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message:  } });
    }
    next();
  };

//For a project this size, a plain role field + your own
//requireRole middleware is the right amount of complexity