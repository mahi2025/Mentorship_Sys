import express from "express";
import { auth } from "./auth/auth";
import { toNodeHandler } from "better-auth/node";
import { errorHandler } from "./shared/errors/errorHandler";


export const app = express();

app.use(express.json());
app.use("/api/auth/{*path}", toNodeHandler(auth));

//app.use("/", Routes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use(errorHandler);

