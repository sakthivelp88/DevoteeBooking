import Notification from "#models/Notification.js";

import {
    validateRequest,
    buildNotificationState,
    findRecipients,
    buildNotifications,
    getSuccessMessage,
    getAllNotificationsService,
    updateNotificationService,
    deleteNotificationService,
    cancelNotificationService,
} from "#services/admin/adminNotificationService.js";

export const createAdminNotification = async (req, res) => {
    try {
        const createdBy = req.session.user._id;

        validateRequest(req.body);

        const state = buildNotificationState(req.body);

        const recipients = await findRecipients(
            req.body.audience,
            req.body.user
        );

        if (!recipients.length) {
            return res.status(404).json({
                success: false,
                message: "No recipients found.",
            });
        }

        const notifications = buildNotifications(
            recipients,
            req.body,
            state,
            createdBy
        );

        await Notification.insertMany(notifications);

        return res.status(201).json({
            success: true,
            message: getSuccessMessage(req.body.action),
            count: notifications.length,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get all notifications
 */
export const getAllAdminNotifications = async (req, res) => {

    try {
        const result =
            await getAllNotificationsService(req.query);
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
export const getAdminNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findOne({
            _id: req.params.id,
            isDeleted: false,
        })
            .populate("user", "name email")
            .populate("createdBy", "name email");

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }
        res.json({
            success: true,
            notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateAdminNotification = async (req, res) => {
    try {
        const result =
            await updateNotificationService(
                req.params.id,
                req.body
            );
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Delete notification
 */
export const deleteAdminNotification = async (req, res) => {
    try {
        const result =
            await deleteNotificationService(
                req.params.id
            );
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelAdminNotification = async (req, res) => {
    try {
        const result =
            await cancelNotificationService(
                req.params.id
            );
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdminNotificationStats = async ( req, res) => {
    try {
        const stats = await Notification.aggregate([
                {
                    $match: {
                        isDeleted: false,
                    },
                },
                {
                    $group: {
                        _id: "$status",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);
        const result = {
            total: 0,
            draft: 0,
            scheduled: 0,
            sent: 0,
            failed: 0,
            cancelled: 0,
        };
        stats.forEach(({ _id, count }) => {
            result[_id] = count;
            result.total += count;
        });
        res.json({
            success: true,
            stats: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



