import Feedback from "../models/Feedback.js";

// Admin Feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            feedback,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateFeedbackStatus = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found",
            });
        }

        feedback.status = "Reviewed";

        await feedback.save();

        res.json({
            success: true,
            message: "Feedback reviewed successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found",
            });
        }

        await feedback.deleteOne();

        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};