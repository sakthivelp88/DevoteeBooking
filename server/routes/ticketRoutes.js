import express from "express";

import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

import {
  createTicket,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
  getTickets,
  getTicketById,
} from "../controllers/ticketController.js";

const router = express.Router();

// Public Routes
router.get("/", getTickets);
router.get("/:id", getTicketById);

// Admin Routes
router.post("/", auth, admin, createTicket);
router.put("/:id", auth, admin, updateTicket);
router.patch("/:id/status", auth, admin, updateTicketStatus);
router.delete("/:id", auth, admin, deleteTicket);

export default router;