import { Router, type IRouter } from "express";
import { listUsers } from "./user.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router:IRouter = Router();

router.get("/", authenticate, authorize("admin"), listUsers);

export default router;
