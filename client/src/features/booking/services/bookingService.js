import api from "@/services/api/api";

/* ============================
	 User Booking APIs
============================ */

export const createBooking = async (ticketId, quantity) => {
	const { data } = await api.post("/bookings", {
		ticketId,
		quantity,
	});

	return data;
};

export const getBookingById = async (bookingId) => {
	const { data } = await api.get(`/bookings/${bookingId}`);

	return data;
};

export const getMyBookings = async () => {
	const { data } = await api.get("/bookings/my");

	return data;
};

export const cancelBooking = async (id, reason) => {
	const { data } = await api.patch(`/bookings/${id}/cancel`, { reason, });
	return data;
};

/* ============================
	 Admin Booking APIs
============================ */

export const getAdminBookings = async (params = {}) => {
	const { data } = await api.get("/bookings/admin", {
		params,
	});

	return data;
};

export const getAdminBookingById = async (bookingId) => {
	const { data } = await api.get(`/bookings/admin/${bookingId}`);

	return data;
};

export const updateBookingStatus = async (
	bookingId,
	payload
) => {
	const { data } = await api.patch(
		`/bookings/admin/${bookingId}/status`,
		payload
	);

	return data;
};

export const processRefund = async (id) => {
	const { data } = await api.patch(
		`/bookings/admin/${id}/refund`
	);

	return data;
};
