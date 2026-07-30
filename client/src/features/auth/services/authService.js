import api from "@/services/api/api"; // localhost path directory

export const register = async (userData) => {
  const response = await api.post(`auth/register`, userData, {
      withCredentials: true,
    }
  );

  return response.data;
};

export const login = async (emailOrPhone, password) => {
  const response = await api.post("/auth/login", {
      emailOrPhone: emailOrPhone?.toString().trim(),
      password: password?.toString() ?? "",
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
  // Avoid unnecessary /auth/me calls when no local session marker exists.
  if (
    typeof window !== "undefined" &&
    !localStorage.getItem("user")
  ) {
    return null;
  }

  try {
    const response = await api.get(`auth/me`, {
      withCredentials: true,
    });

    return response.data.user;
  } catch (error) {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      return null;
    }

    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    return !!(await getCurrentUser());
  } catch {
    return false;
  }
};

export const isAdmin = async () => {
  try {
    const user = await getCurrentUser();
    return user?.role === "admin";
  } catch {
    return false;
  }
};