import express from "express";
import { auth } from "#middleware/user/auth.js";

import {
  getTheme,
  updateTheme,
} from "#controllers/user/appearanceController.js";

const router = express.Router();

router.get("/appearance", auth, getTheme);

router.put("/appearance", auth, updateTheme);

export default router;