import { Router, type IRouter } from "express";
import { healthCheck } from "./health.controller";

const router: IRouter = Router();

router.get("/", healthCheck);

export default router;
