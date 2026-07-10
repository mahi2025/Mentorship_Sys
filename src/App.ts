import requestlogger from "./middleware/Logger";
import { errorHandler } from "./middleware/error-handler";
import express from "express";
import healthRoutes from "./modules/check/health.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import profileRoutes from "./modules/profiles/profiles.routes";
import { createGlobalLimiter } from "./middleware/rateLimit.middleware";
import { createAuthLimiter } from "./middleware/rateLimit.middleware";

const app = express();


app.use(express.json());
app.use(requestlogger);

app.use(createGlobalLimiter());

app.use("/api/health", healthRoutes);
app.use(createAuthLimiter());
app.use("/api/auth", toNodeHandler(auth));
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

export default app;
export function listen(PORT: number, arg1: () => void) {
  throw new Error("Function not implemented.");
}

