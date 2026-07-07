
//session/JWT check
import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth/auth";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
     // Get session token from cookies
    const sessionToken = req.cookies["better-auth-session"];

    if (!sessionToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Validate session with Better Auth
    const session = await auth.api.getSession({
      headers: {
        cookie: `better-auth-session=${sessionToken}`,
      },
    });

    if (!session) {
      return res.status(401).json({ message: "Invalid session" });
    }

    // Attach user to request
    (req as any).user = {
      id: session.user.id,
      email: session.user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}