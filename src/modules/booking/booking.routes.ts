import { Router, type IRouter } from "express";

import { createBooking, updateBookingStatus } from "./booking.controller";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router: IRouter = Router();
router.post(
  "/services/:serviceId/bookings",
  authenticate,
  authorize("mentee"),
  createBooking,
);

router.patch("/bookings/:bookingId/status", authenticate, updateBookingStatus);

export default router;
