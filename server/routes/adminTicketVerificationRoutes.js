import express from "express";
import {
    verifyTicket,
    checkInBooking,
} from "../controllers/adminTicketVerificationController.js";

import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.post("/verify", auth, admin, verifyTicket);

router.patch("/:id/check-in", auth, admin, checkInBooking);

export default router;