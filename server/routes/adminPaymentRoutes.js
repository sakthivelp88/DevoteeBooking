import express from "express";

import {
    getPayments,
    getPaymentById,
} from "../controllers/adminPaymentController.js";

const router = express.Router();

router.get("/", getPayments);

router.get("/:id", getPaymentById);

export default router;