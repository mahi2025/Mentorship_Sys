import express from "express";
import { auth } from "./lib/auth";


import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";


import { errorHandler } from "./shared/errors/errorHandler";
const app = express();

app.use(express.json());

app.use("/api/auth/", auth.handler);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;