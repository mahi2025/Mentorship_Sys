import { Router, type IRouter } from "express";
import { getMyProfile, updateMyProfile } from "./profile.controller";

import { authenticate } from "../../middleware/authenticate";

const router: IRouter = Router();

router.get("/me", authenticate, getMyProfile);

router.patch("/me", authenticate, updateMyProfile);

export default router;
