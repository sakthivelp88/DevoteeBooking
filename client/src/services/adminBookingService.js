import api from "./api/api";

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