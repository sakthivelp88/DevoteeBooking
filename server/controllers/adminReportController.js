import * as reportService from "../services/adminReportService.js";

export const getSummary = async (req, res) => {
    try {
        const summary = await reportService.getSummary(req.query);

        res.status(200).json({
            success: true,
            data: summary,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getRevenueReport = async (req, res) => {
    try {
        const report = await reportService.getRevenueReport(req.query);

        res.status(200).json({
            success: true,
            data: report,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBookingReport = async (req, res) => {
    try {
        const report = await reportService.getBookingReport(req.query);

        res.status(200).json({
            success: true,
            data: report,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPaymentReport = async (req, res) => {
    try {
        const report = await reportService.getPaymentReport(req.query);

        res.status(200).json({
            success: true,
            data: report,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAnalyticsDashboard = async (req, res) => {
    try {
        const analytics = await reportService.getAnalyticsDashboard(req.query);

        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};