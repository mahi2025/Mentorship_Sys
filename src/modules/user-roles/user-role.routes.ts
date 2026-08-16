import { Router, type IRouter } from "express";
import { getUserRoles, assignRole, removeRole } from "./user-role.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router:IRouter = Router();

router.get("/admin-test", authenticate, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "You have admin access",
    user: req.user,
  });
});

router.get("/:userId", authenticate, authorize("admin"), getUserRoles);

router.post("/:userId", authenticate, authorize("admin"), assignRole);

router.delete("/:userId", authenticate, authorize("admin"), removeRole);

export default router;
