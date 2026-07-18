import Notification from "#models/Notification.js";

/**
 * Get logged-in user's notifications
 */
export const getUserNotificationsService = async (
    userId,
    query
) => {

    const {
        page = 1,
        limit = 10,
        search,
        isRead,
    } = query;

    const filter = {
        user: userId,
        isDeleted: false,
    };

    if (typeof isRead !== "undefined") {
        filter.isRead = isRead === "true";
    }

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                message: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [notifications, total] = await Promise.all([
        Notification.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean(),

        Notification.countDocuments(filter),
    ]);

    return {
        success: true,

        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        },

        notifications,
    };

};

/**
 * Get notification by ID
 */
export const getNotificationByIdService = async (
    userId,
    notificationId
) => {

    const notification = await Notification.findOne({
        _id: notificationId,
        user: userId,
        isDeleted: false,
    }).lean();

    if (!notification) {
        throw new Error("Notification not found.");
    }

    return {
        success: true,
        notification,
    };

};

/**
 * Mark notification as read
 */
export const markNotificationAsReadService = async (
    userId,
    notificationId
) => {

    const notification =
        await Notification.findOneAndUpdate(
            {
                _id: notificationId,
                user: userId,
                isDeleted: false,
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date(),
                },
            },
            {
                new: true,
            }
        ).lean();

    if (!notification) {
        throw new Error("Notification not found.");
    }

    return {
        success: true,
        message: "Notification marked as read.",
        notification,
    };

};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsReadService = async (
    userId
) => {

    const result =
        await Notification.updateMany(
            {
                user: userId,
                isRead: false,
                isDeleted: false,
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date(),
                },
            }
        );

    return {
        success: true,
        message: "All notifications marked as read.",
        modifiedCount: result.modifiedCount,
    };

};

/**
 * Get unread notification count
 */
export const getUnreadNotificationCountService = async (
    userId
) => {

    const count =
        await Notification.countDocuments({
            user: userId,
            isRead: false,
            isDeleted: false,
        });

    return {
        success: true,
        count,
    };

};