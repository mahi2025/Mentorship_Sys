import { Router, type IRouter } from "express";
import { getRoles, getRoleById } from "./role.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router:IRouter = Router();

router.get("/", authenticate, authorize("admin"), getRoles);

router.get("/:id", authenticate, authorize("admin"), getRoleById);

export default router;
