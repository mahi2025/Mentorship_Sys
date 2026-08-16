import { Router, type IRouter } from "express";

import {
  createAvailability,
  getServiceAvailability,
} from "./availability.controller";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router: IRouter = Router();

router.post(
  "/services/:serviceId/availability",
  authenticate,
  authorize("mentor"),
  createAvailability,
);

router.get(
  "/services/:serviceId/availability",
  authenticate,
  getServiceAvailability,
);

export default router;
