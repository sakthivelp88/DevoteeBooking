import express from "express";

import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

import {
  myBookings,
  getAdminBookings,
  getAdminBookingById,
  updateAdminBookingStatus,
} from "../controllers/adminBookingController.js";

const router = express.Router();

/* ================= User ================= */

router.get("/my", auth, myBookings);

/* ================= Admin ================= */

router.get(
  "/admin",
  auth,
  admin,
  getAdminBookings
);

router.get(
  "/admin/:id",
  auth,
  admin,
  getAdminBookingById
);

router.patch(
  "/admin/:id/status",
  auth,
  admin,
  updateAdminBookingStatus
);

export default router;