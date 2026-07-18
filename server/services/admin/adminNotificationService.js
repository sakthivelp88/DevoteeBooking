import mongoose from "mongoose";
import User from "#models/User.js";
import Notification from "#models/Notification.js";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const VALID_TYPES = [
    "booking",
    "refund",
    "feedback",
    "announcement",
    "remark",
    "general",
];

const VALID_ACTIONS = [
    "draft",
    "send",
    "schedule",
];

const NON_EDITABLE_STATUS = [
    "sent",
    "cancelled",
    "failed",
];

/* -------------------------------------------------------------------------- */
/*                           CREATE NOTIFICATION                              */
/* -------------------------------------------------------------------------- */

export const validateRequest = (data) => {
    const {
        audience,
        title,
        message,
        type = "general",
        action,
        scheduledAt,
    } = data;

    if (action && !VALID_ACTIONS.includes(action)) {
        throw new Error("Invalid action.");
    }

    if (!title?.trim()) {
        throw new Error("Title is required.");
    }

    if (!message?.trim()) {
        throw new Error("Message is required.");
    }

    if (!audience) {
        throw new Error("Audience is required.");
    }

    if (!VALID_TYPES.includes(type)) {
        throw new Error("Invalid notification type.");
    }

    if (action === "schedule") {
        if (!scheduledAt) {
            throw new Error("Schedule date is required.");
        }

        if (new Date(scheduledAt) <= new Date()) {
            throw new Error("Schedule date must be in the future.");
        }
    }
};

/* -------------------------------------------------------------------------- */
/*                          BUILD NOTIFICATION STATE                          */
/* -------------------------------------------------------------------------- */

export const buildNotificationState = ({
    action,
    scheduledAt,
}) => {
    if (action === "draft") {
        return {
            status: "draft",
            deliveryStatus: "pending",
            sentAt: null,
            scheduledAt: null,
        };
    }

    if (action === "schedule") {
        return {
            status: "scheduled",
            deliveryStatus: "pending",
            sentAt: null,
            scheduledAt,
        };
    }

    return {
        status: "sent",
        deliveryStatus: "delivered",
        sentAt: new Date(),
        scheduledAt: null,
    };
};

/* -------------------------------------------------------------------------- */
/*                              FIND RECIPIENTS                               */
/* -------------------------------------------------------------------------- */

export const findRecipients = async (
    audience,
    userId
) => {
    if (audience === "single") {
        if (!userId) {
            throw new Error("User is required.");
        }

        const user = await User.findById(
            userId,
            "_id"
        ).lean();

        return user ? [user] : [];
    }

    const filters = {
        devotees: {
            role: "devotee",
            status: "active",
        },
        admins: {
            role: "admin",
            status: "active",
        },
        all: {
            status: "active",
        },
    };

    if (!filters[audience]) {
        throw new Error("Invalid audience.");
    }

    return User.find(filters[audience], "_id").lean();
};

/* -------------------------------------------------------------------------- */
/*                           BUILD NOTIFICATIONS                              */
/* -------------------------------------------------------------------------- */

export const buildNotifications = (
    users,
    data,
    state,
    createdBy
) => {
    const campaignId =
        new mongoose.Types.ObjectId().toString();

    const payload = {
        title: data.title,
        message: data.message,
        type: data.type,
        audience: data.audience,
        priority: data.priority,
        relatedBooking: data.relatedBooking,
        expiresAt: data.expiresAt,
        deliveryChannel: data.deliveryChannel,
        createdBy,
        campaignId,
        ...state,
    };

    return users.map(({ _id }) => ({
        user: _id,
        ...payload,
    }));
};

/* -------------------------------------------------------------------------- */
/*                              SUCCESS MESSAGE                               */
/* -------------------------------------------------------------------------- */

export const getSuccessMessage = (action) => {
    const messages = {
        draft: "Notification saved as draft.",
        schedule:
            "Notification scheduled successfully.",
        send: "Notification sent successfully.",
    };

    return messages[action] || messages.send;
};

export const getAllNotificationsService = async (query) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        type,
        audience,
        deliveryStatus,
        sortBy = "createdAt",
        order = "desc",
    } = query;

    const filter = {
        isDeleted: false,
    };

    // Dynamic filters
    [
        "status",
        "type",
        "audience",
        "deliveryStatus",
    ].forEach((field) => {
        if (query[field]) {
            filter[field] = query[field];
        }
    });

    // Search
    if (search?.trim()) {
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

    // Pagination
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.min(
        100,
        Math.max(1, Number(limit))
    );

    const skip = (pageNumber - 1) * limitNumber;

    // Sorting
    const sortFields = [
        "createdAt",
        "scheduledAt",
        "priority",
        "status",
        "sentAt",
    ];

    const sort = {
        [sortFields.includes(sortBy)
            ? sortBy
            : "createdAt"]: order === "asc" ? 1 : -1,
    };

    const [notifications, total] =
        await Promise.all([
            Notification.find(filter)
                .populate("createdBy", "name email")
                .populate("user", "name email")
                .sort(sort)
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
            totalPages: Math.ceil(
                total / limitNumber
            ),
        },
        notifications,
    };
};

export const updateNotificationService = async (
    id,
    data
) => {
    const notification = await Notification.findById(id);

    if (!notification) {
        throw new Error("Notification not found.");
    }

    if (notification.isDeleted) {
        throw new Error(
            "Deleted notifications cannot be edited."
        );
    }

    if (
        NON_EDITABLE_STATUS.includes(
            notification.status
        )
    ) {
        throw new Error(
            `${notification.status} notifications cannot be edited.`
        );
    }

    // Validate merged data
    validateRequest({
        ...notification.toObject(),
        ...data,
    });

    // Update editable fields
    const editableFields = [
        "title",
        "message",
        "type",
        "priority",
        "expiresAt",
        "deliveryChannel",
    ];

    editableFields.forEach((field) => {
        if (data[field] !== undefined) {
            notification[field] = data[field];
        }
    });

    // Update schedule
    if (data.scheduledAt) {
        if (new Date(data.scheduledAt) <= new Date()) {
            throw new Error(
                "Schedule date must be in the future."
            );
        }

        notification.scheduledAt = data.scheduledAt;

        // Draft becomes Scheduled
        if (notification.status === "draft") {
            notification.status = "scheduled";
            notification.deliveryStatus = "pending";
        }
    }

    await notification.save();

    return {
        success: true,
        message:
            "Notification updated successfully.",
        notification,
    };
};

export const deleteNotificationService = async (id) => {
    const notification = await Notification.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!notification) {
        throw new Error("Notification not found.");
    }

    Object.assign(notification, {
        isDeleted: true,
        deletedAt: new Date(),
    });

    await notification.save();

    return {
        success: true,
        message: "Notification deleted successfully.",
    };
};

export const processScheduledNotifications = async () => {
    const now = new Date();

    const notifications = await Notification.find({
        status: "scheduled",
        scheduledAt: { $lte: now },
        isDeleted: false,
    }).sort({
        scheduledAt: 1,
    });

    if (!notifications.length) {
        return {
            success: true,
            processed: 0,
        };
    }

    await Promise.all(
        notifications.map(async (notification) => {
            Object.assign(notification, {
                status: "sent",
                deliveryStatus: "delivered",
                sentAt: now,
            });

            await notification.save();
        })
    );

    return {
        success: true,
        processed: notifications.length,
    };
};

export const cancelNotificationService = async (id) => {
    const notification = await Notification.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!notification) {
        throw new Error("Notification not found.");
    }

    if (notification.status !== "scheduled") {
        throw new Error(
            "Only scheduled notifications can be cancelled."
        );
    }

    Object.assign(notification, {
        status: "cancelled",
        deliveryStatus: "cancelled",
    });

    await notification.save();

    return {
        success: true,
        message: "Notification cancelled successfully.",
        notification,
    };
};