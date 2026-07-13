import api from "./api/api";

export const getProfile = async () => {
  const response = await api.get("/admin/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/admin/profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put("/admin/change-password", data);
  return response.data;
};

export const uploadProfilePhoto = async (formData) => {
  const response = await api.put(
    "/admin/profile/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const removeProfilePhoto = async () => {
  const response = await api.delete(
    "/admin/profile/photo",
    {
      withCredentials: true,
    }
  );

  return response.data;
};