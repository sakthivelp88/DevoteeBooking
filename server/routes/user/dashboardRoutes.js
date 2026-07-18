import express from "express";
import { auth } from "#middleware/user/auth.js";
import { getDashboard } from "#controllers/user/dashboardController.js";

const router = express.Router();

router.get("/user", auth, getDashboard);

export default router;