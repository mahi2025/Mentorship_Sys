import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../auth/auth';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
  }
  req.user = session.user;
  next();
};
