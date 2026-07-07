import express from "express";
import { signUp } from "./auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);
//router.post("/profile",);

export default router;
