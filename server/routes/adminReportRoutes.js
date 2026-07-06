import express from "express";
import * as adminReportController from "../controllers/adminReportController.js";

const router = express.Router();

router.get("/summary", adminReportController.getSummary);
router.get("/revenue", adminReportController.getRevenueReport);
router.get("/bookings", adminReportController.getBookingReport);
router.get("/payments", adminReportController.getPaymentReport);
router.get("/analytics", adminReportController.getAnalyticsDashboard);

export default router;