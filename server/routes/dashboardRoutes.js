import express from "express";
import { auth } from "../middleware/auth.js";
import { userDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/user", auth, userDashboard);

export default router;