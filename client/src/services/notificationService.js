import api from "./api/api";

// Get all notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications", {
    withCredentials: true,
  });

  return response.data;
};

// Get notification by ID
export const getNotification = async (id) => {
  const response = await api.get(`/notifications/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

// Get unread notification count
export const getUnreadCount = async () => {
  const response = await api.get("/notifications/unread-count", {
    withCredentials: true,
  });

  return response.data;
};

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

// Delete a notification (optional)
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`, {
    withCredentials: true,
  });

  return response.data;
};