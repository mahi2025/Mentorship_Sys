import express, { type Express } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import healthRoutes from "./modules/check/health.routes";
import { createGlobalLimiter } from "./middleware/rateLimit.middleware";

import roleRoutes from "./modules/roles/role.routes";
import userRoleRoutes from "./modules/user-roles/user-role.routes";
import userRoutes from "./modules/users/user.routes";

import profileRoutes from "./modules/profiles/profile.routes";
import serviceRoutes from "./modules/services/service.routes";
import availabilityRoutes from "./modules/availability/availability.routes";
import bookingRoutes from "./modules/booking/booking.routes";

import swaggerUi from "swagger-ui-express";
import { openapi } from "./docs/openapi";

export function createApp(): Express {
  const app: Express = express();

  const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.all("/api/auth/*splat", toNodeHandler(auth));

  app.use(express.json());
  app.use(createGlobalLimiter());

  app.use("/api/health", healthRoutes);
  app.use("/api/roles", roleRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/user-roles", userRoleRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/services", serviceRoutes);
  app.use("/api", availabilityRoutes);
  app.use("/api", bookingRoutes);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

  app.use(errorHandler);

  return app;
}
