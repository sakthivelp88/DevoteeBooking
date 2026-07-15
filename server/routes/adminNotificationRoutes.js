import express from "express";
import { admin } from "../middleware/admin.js";

import {
    getAllNotifications,
    getNotificationById,
    sendNotification,
    deleteNotification,
} from "../controllers/adminNotificationController.js";

const router = express.Router();

router.get("/", admin, getAllNotifications);

router.get("/:id", admin, getNotificationById);

router.post("/", admin, sendNotification);

router.delete("/:id", admin, deleteNotification);

export default router;