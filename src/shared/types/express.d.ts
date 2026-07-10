import { auth } from "../auth/auth";
import type { AuthenticatedUser } from "./auth";

declare global {
  namespace Express {
    interface Request {
      user?: (typeof auth.$Infer.Session)["user"];
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}