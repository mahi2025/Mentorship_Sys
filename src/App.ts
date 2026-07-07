import express from "express";
import { auth } from "./auth/auth";
import { toNodeHandler } from "better-auth/node";
import { errorHandler } from "./shared/errors/errorHandler";
//import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import profileRoutes from "./modules/profile/profile.routes";


export const app = express();

app.use(express.json());
app.use("/api/auth/{*path}", toNodeHandler(auth));

//app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use(errorHandler);

