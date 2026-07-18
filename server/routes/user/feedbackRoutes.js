import express from "express";

import { auth } from "#middleware/user/auth.js";

import {createFeedback,  
} from "#controllers/user/feedbackController.js";

const router = express.Router();

router.post("/", auth, createFeedback);

export default router;