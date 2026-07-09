import { Router } from "express";
import { signUp } from "./auth.controller";

const router = Router();

router.post("/sign-up", signUp);
/*
POST   /auth/sign-in
POST   /auth/sign-out
GET    /auth/me 

*/
export default router;
