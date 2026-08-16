import { auth } from "../auth/auth";

declare global {
  namespace Express {
    interface Request {
      user?: (typeof auth.$Infer.Session)["user"];
    }
  }
}

export {};
