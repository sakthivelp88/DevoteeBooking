import api from "../api/api"; // localhost path directory

export const register = async (userData) => {
  const response = await api.post(`auth/register`, userData, {
      withCredentials: true,
    }
  );

  return response.data;
};

export const login = async (emailOrPhone,password) => {
  const response = await api.post(`auth/login`, {
      emailOrPhone,
      password,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success) {
    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data.user
      )
    );
  }

  return response.data;
};

export const logout = async () => {
  const response = await api.post(
    `auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  localStorage.removeItem("user");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(`auth/me`, {
    withCredentials: true,
  });

  return response.data.user;
};

export const isAuthenticated = async () => {
  try {
    await api.get(`auth/me`, {
      withCredentials: true,
    });

    return true;
  } catch {
    return false;
  }
};

export const isAdmin = async () => {
  try {
    const user = await getCurrentUser();
    return user.role === "admin";
  } catch {
    return false;
  }
};