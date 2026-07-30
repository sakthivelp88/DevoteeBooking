import api from "@services/api/api";

const BASE_URL = "/admin/notifications";

// Get all notifications
export const getAdminNotifications = async (params = {}) => {
	const { data } = await api.get(BASE_URL, {
		params,
		withCredentials: true,
	});

	return data;
};

// Get notification by ID
export const getAdminNotificationById = async (id) => {
	const { data } = await api.get(`${BASE_URL}/${id}`, {
		withCredentials: true,
	});

	return data;
};

// Create notification
export const createAdminNotification = async (payload) => {
	const { data } = await api.post(BASE_URL, payload, {
		withCredentials: true,
	});

	return data;
};

// Update notification
export const updateAdminNotification = async (
	id,
	payload
) => {
	const { data } = await api.put(
		`${BASE_URL}/${id}`,
		payload,
		{
			withCredentials: true,
		}
	);

	return data;
};

// Delete notification
export const deleteAdminNotification = async (id) => {
	const { data } = await api.delete(
		`${BASE_URL}/${id}`,
		{
			withCredentials: true,
		}
	);

	return data;
};

// Cancel scheduled notification
export const cancelAdminNotification = async (id) => {
	const { data } = await api.patch(
		`${BASE_URL}/${id}/cancel`,
		{},
		{
			withCredentials: true,
		}
	);

	return data;
};

// Get notification statistics
export const getAdminNotificationStats = async () => {
	const { data } = await api.get(
		`${BASE_URL}/stats`,
		{
			withCredentials: true,
		}
	);

	return data;
};
