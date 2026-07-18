import api from "@services/api/api";

/* ==========================
   Admin APIs
========================== */

// Get all darshan types
export const getDarshanTypes = async () => {
  const res = await api.get("/darshan-types");
  return res.data;
};

// Create
export const createDarshanType = async (data) => {
  const res = await api.post("/darshan-types", data);
  return res.data;
};

// Update
export const updateDarshanType = async (id, data) => {
  const res = await api.put(`/darshan-types/${id}`, data);
  return res.data;
};

// Delete
export const deleteDarshanType = async (id) => {
  const res = await api.delete(`/darshan-types/${id}`);
  return res.data;
};