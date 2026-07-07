import express from "express";
import { auth } from "./auth/auth";
import { toNodeHandler } from "better-auth/node";
import { errorHandler } from "./shared/errors/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import profileRoutes from "./modules/profile/profile.routes";


export const app = express();

app.use(express.json());

app.get("/health", healthRouter);
app.use("/api/auth/{*path}", toNodeHandler(auth));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profiles", profileRouter);

app.use(errorHandler);

