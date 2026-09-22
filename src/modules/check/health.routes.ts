import { Router, type IRouter } from "express";
import { healthCheck, readinessCheck } from "./health.controller";

const router: IRouter = Router();

router.get("/", healthCheck);
router.get("/ready", readinessCheck);

export default router;
