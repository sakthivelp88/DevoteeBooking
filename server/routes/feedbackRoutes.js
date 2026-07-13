import express from "express";
import { auth } from "../middleware/auth.js";

import {createFeedback,  
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", auth, createFeedback);

export default router;