import express from "express";

import { admin } from "#middleware/admin/admin.js";

import {
    getAllAdminNotifications,
    getAdminNotificationById,
    createAdminNotification,
    deleteAdminNotification,
    getAdminNotificationStats,
    updateAdminNotification,
    cancelAdminNotification,
} from "#controllers/admin/adminNotificationController.js";

const router = express.Router();

router.get("/", admin, getAllAdminNotifications);
router.get("/stats", admin, getAdminNotificationStats);
router.get("/:id", admin, getAdminNotificationById);
router.post("/", admin, createAdminNotification);
router.put("/:id", admin, updateAdminNotification);
router.delete("/:id", admin, deleteAdminNotification);
router.patch("/:id/cancel", admin, cancelAdminNotification);

export default router;