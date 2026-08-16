import { Router, type IRouter } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
} from "./service.controller";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router:IRouter = Router();

router.get("/", getServices);

router.get("/:id", getServiceById);

router.post("/", authenticate, authorize("mentor"), createService);

router.patch("/:id", authenticate, authorize("mentor"), updateService);

export default router;
