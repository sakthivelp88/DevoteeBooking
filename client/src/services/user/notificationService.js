import api from "@/services/api/api";

/* -------------------- GET -------------------- */

// Get logged-in user's notifications
export const getNotifications = async (params = {}) => {
    const response = await api.get("/notifications", {
        params,
        withCredentials: true,
    });

    return response.data;
};

// Get notification by ID
export const getNotification = async (id) => {
    const response = await api.get(
        `/notifications/${id}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// Get unread notification count
export const getUnreadCount = async () => {
    const response = await api.get(
        "/notifications/unread-count",
        {
            withCredentials: true,
        }
    );

    return response.data;
};

/* -------------------- PATCH -------------------- */

// Mark notification as read
export const markAsRead = async (id) => {
    const response = await api.patch(
        `/notifications/${id}/read`,
        {},
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
    const response = await api.patch(
        "/notifications/read-all",
        {},
        {
            withCredentials: true,
        }
    );

    return response.data;
};

/* -------------------- DELETE -------------------- */

// Delete notification
export const deleteUserNotification = async (id) => {
    const response = await api.delete(
        `/notifications/${id}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};