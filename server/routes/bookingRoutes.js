import express from "express";

import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

import {
  getAdminBookings,
  getAdminBookingById,
  updateAdminBookingStatus,
} from "../controllers/adminBookingController.js";

import {
  myBookings,
  getBookingById,
} from "../controllers/bookingController.js";

import { downloadTicket } from "../controllers/bookingController.js";


const router = express.Router();

/* ================= User ================= */

router.get("/my", auth, myBookings);

/* ================= Admin ================= */

router.get("/admin", auth, admin, getAdminBookings);

router.get("/admin/:id", auth, admin, getAdminBookingById);

router.patch("/admin/:id/status", auth, admin, updateAdminBookingStatus);

/* ================= User ================= */

router.get("/:id", auth, getBookingById);
router.get("/:id/pdf", auth, downloadTicket);

export default router;