import express from "express";

import {
  getUserNotifications,
  getNotificationById,
  markNotificationAsRead,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
} from "#controllers/user/notificationController.js";

import { auth } from "#middleware/user/auth.js";

const router = express.Router();

router.get("/", auth, getUserNotifications);

router.get("/unread-count", auth, getUnreadNotificationCount);

router.get("/:id", auth, getNotificationById);

router.patch("/:id/read", auth, markNotificationAsRead);

router.patch("/read-all", auth, markAllNotificationsAsRead);

export default router;