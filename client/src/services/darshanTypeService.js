import api from "./api";

/* ==========================
   User APIs
========================== */

// Get darshan types for a specific temple
export const getDarshanTypesByTemple = async (templeId) => {
  const res = await api.get(`/darshan-types/temple/${templeId}`);
  return res.data;
};

// Get a single darshan type
export const getDarshanTypeById = async (id) => {
  const res = await api.get(`/darshan-types/${id}`);
  return res.data;
};

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