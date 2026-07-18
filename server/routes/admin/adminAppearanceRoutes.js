import express from "express";
import { admin } from "../../middleware/admin/admin.js";

import {
    getTheme,
    updateTheme,
} from "#controllers/admin/adminAppearanceController.js";

const router = express.Router();

router.get("/appearance", admin, getTheme);

router.put("/appearance", admin, updateTheme);

export default router;