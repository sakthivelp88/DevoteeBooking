import express from "express";
import {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
} from "#controllers/user/templeController.js";

import { auth } from "#middleware/user/auth.js";
import { admin } from "#middleware/admin/admin.js";
import upload from "#middleware/uploadTemple.js";

const router = express.Router();

router.get("/", getTemples);

router.get("/:id", getTempleById);

// router.post("/", auth, admin, createTemple);

router.post("/", auth, admin, upload.single("image"), createTemple);

router.put("/:id", auth, admin, upload.single("image"), updateTemple);

// router.put("/:id", auth, admin, updateTemple);

router.delete("/:id", auth, admin, deleteTemple);

export default router;