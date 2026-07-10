import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import authRoutes from "./modules/auth/auth.routes";
import profileRoutes from "./modules/profiles/profiles.routes";
import { errorHandler } from "./middleware/error-handler";
import healthRoutes from "./modules/check/health.routes";
import { createGlobalLimiter } from "./middleware/rateLimit.middleware";

const app = express();

app.use(express.json());
app.use(createGlobalLimiter());

app.use("/api/health", healthRoutes);
app.use("/api/auth", toNodeHandler(auth));
//app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use(errorHandler);

export default app;
export function listen(PORT: number, arg1: () => void) {
  throw new Error("Function not implemented.");
}

