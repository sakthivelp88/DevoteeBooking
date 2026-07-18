import express from "express";

import {
  getDarshanTypes,
  getDarshanTypesByTemple,
  getDarshanTypeById,
  createDarshanType,
  updateDarshanType,
  deleteDarshanType,
} from "#controllers/user/darshanTypeController.js";

import { auth } from "#middleware/user/auth.js";
import { admin } from "#middleware/admin/admin.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// All darshan types (Admin listing)
router.get("/", getDarshanTypes);

// Darshan types of one temple
router.get("/temple/:templeId", getDarshanTypesByTemple);

// Single darshan type
router.get("/:id", getDarshanTypeById);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post("/", auth, admin, createDarshanType);

router.put("/:id", auth, admin, updateDarshanType);

router.delete("/:id", auth, admin, deleteDarshanType);

export default router;