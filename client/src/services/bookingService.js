import api from "./api";

/* =======================
   User APIs
======================= */

export const bookTicket = async (ticketId, quantity) => {
  const { data } = await api.post("/bookings", {
    ticketId,
    quantity,
  });

  return data;
};

export const getBookingById = async (id) => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await api.get("/bookings/my");

  return data;
};

/* =======================
   Admin APIs
======================= */

export const getAdminBookings = async (params) => {
  const { data } = await api.get("/bookings/admin", {
    params,
  });

  return data;
};

export const getAdminBookingById = async (id) => {
  const { data } = await api.get(`/bookings/admin/${id}`);

  return data;
};

export const updateBookingStatus = async (id, payload) => {
  const { data } = await api.patch(
    `/bookings/admin/${id}/status`,
    payload
  );

  return data;
};