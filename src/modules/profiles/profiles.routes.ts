import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { getMyProfile, updateMyProfile } from "./profiles.controller";

const router = Router();

router.get("/me", authenticate, getMyProfile);

router.patch("/me", authenticate, updateMyProfile);

export default router;
