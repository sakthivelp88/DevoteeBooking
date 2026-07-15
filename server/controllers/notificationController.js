import Notification from "../models/Notification.js";

/**
 * Get all notifications of logged-in user
 */
export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.session.user.id,
        }).sort({ createdAt: -1 });

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
 * Get unread notification count
 */
export const getUnreadNotificationCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            user: req.session.user.id,
            isRead: false,
        });

        res.status(200).json({
            success: true,
            count,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch unread notification count.",
        });
    }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                user: req.session.user.id,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                },
            }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read.",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to mark all notifications as read.",
        });
    }
};

/**
 * Get a single notification
 */
export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findOne({
            _id: req.params.id,
            user: req.session.user.id,
        });

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
            message: "Something went wrong.",
        });

    }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (req, res) => {

    try {

        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.session.user.id,
            },
            {
                isRead: true,
            },
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            notification,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update notification.",
        });

    }
};