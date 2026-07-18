import api from "@/services/api/api";

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
