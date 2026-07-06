import express from "express";

import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import uploadProfile from "../middleware/uploadProfile.js";
import {
  adminDashboard,
  getBookings,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
  removeProfilePhoto,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", auth, admin, adminDashboard);

router.get("/bookings", auth, admin, getBookings);

router.put("/profile", auth, admin, updateProfile);

router.put("/profile/photo", auth, admin, uploadProfile.single("profileImage"),
  uploadProfilePhoto
);

router.delete("/profile/photo", auth, admin, removeProfilePhoto);

router.put("/change-password", auth, admin, changePassword);

export default router;