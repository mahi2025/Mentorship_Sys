import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { getMyProfile, updateMyProfile } from "./profile.controller";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);

export default router;
