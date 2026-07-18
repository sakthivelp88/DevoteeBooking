import express from "express";

import { auth } from "#middleware/user/auth.js";

import {
  createOrder,
  verifyPayment,
} from "#controllers/user/paymentController.js";

const router = express.Router();

router.post(
  "/create-order",
  auth,
  createOrder
);

router.post(
  "/verify",
  auth,
  verifyPayment
);

export default router;