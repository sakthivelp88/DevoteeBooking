import express from "express";
import { auth } from "#middleware/user/auth.js";

import { getAllFeedback, updateFeedbackStatus, 
    deleteFeedback} from "#controllers/admin/adminFeedbackController.js";

const router = express.Router();

router.get("/", auth, getAllFeedback);

router.put("/:id/review", auth, updateFeedbackStatus);

router.put("/:id/review", auth, updateFeedbackStatus);

router.delete("/:id", auth, deleteFeedback);

export default router;