import api from "./api/api";

// Get all notifications
export const getAdminNotifications = async () => {
  const response = await api.get("/admin/notifications", {
    withCredentials: true,
  });

  return response.data;
};

// Get notification by id
export const getAdminNotificationById = async (id) => {
  const response = await api.get(`/admin/notifications/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

// Create notification
export const createNotification = async (data) => {
  const response = await api.post(
    "/admin/notifications",
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(
    `/admin/notifications/${id}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};