import api from "./api/api"

export const getProfile = () =>
  api.get("/users/profile");

export const updateProfile = async (formData) => {
  return api.put("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const changePassword = (data) =>
  api.put("/users/change-password", data);
