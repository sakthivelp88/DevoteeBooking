import api from "@services/api/api";

/* ============================================================
                    Get All Users
============================================================ */

export const getUsers = async (params = {}) => {
  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

/* ============================================================
                    Get User By ID
============================================================ */

export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);

  return response.data;
};

/* ============================================================
                    Update User
============================================================ */

export const updateUser = async (id, data) => {
  const response = await api.put(
    `/admin/users/${id}`,
    data
  );

  return response.data;
};

/* ============================================================
                Update User Status
============================================================ */

export const updateUserStatus = async (id, status) => {
  const response = await api.patch(
    `/admin/users/${id}/status`,
    { status }
  );

  return response.data;
};

/* ============================================================
                    Delete User
============================================================ */

export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};
