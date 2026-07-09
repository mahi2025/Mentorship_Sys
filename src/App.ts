import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import authRoutes from "./modules/auth/auth.routes";
import profileRoutes from "./modules/profiles/profiles.routes";
import { errorHandler } from "./middleware/error-handler";


const app = express();

app.use(express.json());


app.use("/api/auth", toNodeHandler(auth));
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);


export default app;
