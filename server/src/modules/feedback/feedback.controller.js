import Feedback from "#models/Feedback.js";

export const createFeedback = async (req, res) => {
    try {
        const { message, rating } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Feedback is required",
            });
        }

        const feedback = await Feedback.create({
            user: req.session.user.id,
            message,
            rating,
        });

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            feedback,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
