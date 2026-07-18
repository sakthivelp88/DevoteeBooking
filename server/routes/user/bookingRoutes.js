import express from "express";

import { auth } from "#middleware/user/auth.js";
import { admin } from "#middleware/admin/admin.js";

import {
  getAdminBookings,
  getAdminBookingById,
  updateAdminBookingStatus, processRefund
} from "#controllers/admin/adminBookingController.js";

import {
  myBookings,
  getBookingById, cancelBooking, downloadTicket
} from "#controllers/user/bookingController.js";

const router = express.Router();

/* ================= Admin ================= */

router.get("/admin", auth, admin, getAdminBookings);

router.get("/admin/:id", auth, admin, getAdminBookingById);

router.patch("/admin/:id/status", auth, admin, updateAdminBookingStatus);

router.patch("/admin/:id/refund", auth, admin, processRefund);

/* ================= User ================= */

router.get("/my", auth, myBookings);

router.get("/:id", auth, getBookingById);

router.patch("/:id/cancel", auth, cancelBooking);

router.get("/:id/pdf", auth, downloadTicket);

export default router;