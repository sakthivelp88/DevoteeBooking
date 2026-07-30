import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as authService from "@services/auth/authService";

const AuthContext = createContext();

const SESSION_IDLE_TIMEOUT_MS =
  Number(import.meta.env.VITE_SESSION_IDLE_TIMEOUT_MS) ||
  30 * 60 * 1000;
const SESSION_IDLE_WARNING_MS =
  Number(import.meta.env.VITE_SESSION_IDLE_WARNING_MS) ||
  5 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);

  useEffect(() => {
    checkSession();
  }, []);

  const clearIdleTimers = () => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const handleIdleLogout = async () => {
    toast.error("Logged out due to inactivity");
    await logout();
  };

  const startIdleTimers = () => {
    clearIdleTimers();

    if (!user) return;

    const warningDelay = Math.max(
      0,
      SESSION_IDLE_TIMEOUT_MS - SESSION_IDLE_WARNING_MS
    );

    warningTimerRef.current = window.setTimeout(() => {
      toast(
        "Your session will expire soon due to inactivity. Please interact to stay logged in.",
        { duration: 8000 }
      );
    }, warningDelay);

    logoutTimerRef.current = window.setTimeout(
      handleIdleLogout,
      SESSION_IDLE_TIMEOUT_MS
    );
  };

  const resetIdleTimers = () => {
    if (!user) return;
    startIdleTimers();
  };

  const activityHandler = useCallback(() => {
    if (user) {
      resetIdleTimers();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      clearIdleTimers();
      return;
    }

    startIdleTimers();

    const events = [
      "click",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, activityHandler)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, activityHandler)
      );
      clearIdleTimers();
    };
  }, [user, activityHandler]);

  const checkSession = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrPhone, password) => {
    const response = await authService.login(
      emailOrPhone,
      password
    );

    setUser(response.user);

    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      clearIdleTimers();
      localStorage.removeItem("user");
      setUser(null);
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};