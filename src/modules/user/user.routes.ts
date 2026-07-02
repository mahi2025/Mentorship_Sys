import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

const controller = new UserController();

router.post("/", controller.createUser.bind(controller));
router.get("/", controller.getAllUsers.bind(controller));
router.get("/:id", controller.getUser.bind(controller));

export default router;
