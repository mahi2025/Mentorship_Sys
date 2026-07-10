import { Router } from "express";
import { signUp } from "./auth.controller";
import { createAuthLimiter } from "../../middleware/rateLimit.middleware";

const router = Router();

//router.post("/sign-up", authlimiter, signUp);

//router.post("/login", authenticate, authLimiter, login);

/*
POST   /auth/sign-in
POST   /auth/sign-out
GET    /auth/me 

*/
export default router;
