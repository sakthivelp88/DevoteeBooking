import Notification from "../models/Notification.js";
import User from "../models/User.js";

// Send notification to a single user
export const sendNotification = async (req, res) => {
    try {
        const {
            userId,
            title,
            message,
            type,
            relatedBooking,
        } = req.body;

        // Validate required fields
        const validTypes = [
            "booking",
            "refund",
            "feedback",
            "announcement",
            "remark",
            "general",
        ];

        if (!validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid notification type.",
            });
        }

        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Create notification
        const notification = await Notification.create({
            user: userId,
            title,
            message,
            type,
            relatedBooking: relatedBooking || null,
        });

        res.status(201).json({
            success: true,
            message: "Notification sent successfully.",
            notification,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send notification.",
        });

    }
};

/**
 * Get all notifications
 */
export const getAllNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications.",
        });

    }
};

/**
 * Get notification by ID
 */
export const getNotificationById = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id)
            .populate("user", "name email");

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notification.",
        });
    }
};

/**
 * Delete notification
 */
export const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete notification.",
        });

    }

};