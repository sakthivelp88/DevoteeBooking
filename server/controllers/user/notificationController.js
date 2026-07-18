import {
    getUserNotificationsService,
    getNotificationByIdService,
    markNotificationAsReadService,
    markAllNotificationsAsReadService,
    getUnreadNotificationCountService,
} from "#services/user/notificationService.js";

/**
 * Get logged-in user's notifications
 */
export const getUserNotifications = async (req, res) => {

    try {

        const result =
            await getUserNotificationsService(
                req.session.user.id,
                req.query
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

/**
 * Get notification by ID
 */
export const getNotificationById = async (req, res) => {

    try {

        const result =
            await getNotificationByIdService(
                req.session.user.id,
                req.params.id
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (req, res) => {

    try {

        const result =
            await markNotificationAsReadService(
                req.session.user.id,
                req.params.id
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (req, res) => {

    try {

        const result =
            await markAllNotificationsAsReadService(
                req.session.user.id,
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

/**
 * Get unread notification count
 */
export const getUnreadNotificationCount = async (req, res) => {

    try {

        const result =
            await getUnreadNotificationCountService(
                req.session.user.id,
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};