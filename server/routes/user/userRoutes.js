import express from "express";
import { auth } from "#middleware/user/auth.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  } from "#controllers/user/userController.js";

import upload from "#middleware/user/uploadUserProfile.js";

const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, upload.single("profileImage"), updateProfile);
router.put("/change-password", auth, changePassword);


export default router;