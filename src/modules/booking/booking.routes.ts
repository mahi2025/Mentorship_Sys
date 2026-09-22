import { Router, type IRouter } from "express";

import { createBooking, updateBookingStatus } from "./booking.controller";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { createBookingLimiter } from "../../middleware/rateLimit.middleware";

const router: IRouter = Router();
router.post(
  "/services/:serviceId/bookings",
  createBookingLimiter(),
  authenticate,
  authorize("mentee"),
  createBooking,
);

router.patch(
  "/bookings/:bookingId/status",
  authenticate,
  authorize("admin", "mentor", "mentee"),
  updateBookingStatus,
);

export default router;
