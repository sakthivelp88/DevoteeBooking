import express from "express";

import { auth } from "#middleware/user/auth.js";
import { admin } from "#middleware/admin/admin.js";

import {
    getUsers,
    getUserById,
    updateUser,
    updateUserStatus,
    deleteUser,
} from "#controllers/admin/adminUserController.js";

const router = express.Router();

router.get("/", auth, admin, getUsers);
router.get("/:id", auth, admin, getUserById);
router.put("/:id", auth, admin, updateUser);
router.patch("/:id/status", auth, admin, updateUserStatus);
router.delete("/:id", auth, admin, deleteUser);

export default router;