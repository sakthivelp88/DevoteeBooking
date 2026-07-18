import api from "@/services/api/api";

export const getTemples = async () => {
  const res = await api.get("/temples");
  return res.data;
};

export const getTempleById = async (id) => {
  const { data } = await api.get(`/temples/${id}`);
  return data;
};

export const createTemple = async (temple) => {
  const res = await api.post("/temples", temple, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateTemple = async (id, temple) => {
  const res = await api.put(`/temples/${id}`, temple, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteTemple = async (id) => {
  const res = await api.delete(`/temples/${id}`);
  return res.data;
};