import express from "express";
import {
    verifyTicket,
    checkInBooking,
} from "#controllers/admin/adminTicketVerificationController.js";

import { auth } from "#middleware/user/auth.js";
import { admin } from "#middleware/admin/admin.js";

const router = express.Router();

router.post("/verify", auth, admin, verifyTicket);

router.patch("/:id/check-in", auth, admin, checkInBooking);

export default router;