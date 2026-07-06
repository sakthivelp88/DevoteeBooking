import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

export const register = async (userData) => {
  const response = await axios.post(`${API}/register`, userData, {
      withCredentials: true,
    }
  );

  return response.data;
};

export const login = async (emailOrPhone,password) => {
  const response = await axios.post(`${API}/login`, {
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
  const response = await axios.post(
    `${API}/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  localStorage.removeItem("user");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API}/me`, {
    withCredentials: true,
  });

  return response.data.user;
};

export const isAuthenticated = async () => {
  try {
    await axios.get(`${API}/me`, {
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