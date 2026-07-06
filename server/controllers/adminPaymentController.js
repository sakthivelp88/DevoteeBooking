import * as adminPaymentService from "../services/adminPaymentService.js";

export const getPayments = async (req, res) => {
    try {
        const payments = await adminPaymentService.getPayments();

        res.status(200).json({
            success: true,
            count: payments.length,
            payments,
        });
    } catch (error) {
        console.error("Get Payments Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch payments.",
        });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await adminPaymentService.getPaymentById(id);

        res.status(200).json({
            success: true,
            payment,
        });
    } catch (error) {
        console.error("Get Payment Details Error:", error);

        if (error.message === "Payment not found.") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to fetch payment details.",
        });
    }
};