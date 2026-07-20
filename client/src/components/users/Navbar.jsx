import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/components/notification/NotificationBell";

import {
  FiUser,
  FiHome,
  FiCalendar,
  FiSettings,
  FiLock,
  FiLogOut,
  FiChevronDown,
  FiMessageSquare,
} from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const closeMenuTimeout = useRef(null);

  const activeClass = "font-semibold border-b-2 border-white pb-1";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);

      if (closeMenuTimeout.current) {
        clearTimeout(closeMenuTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [user?._id, user?.email]);

  const clearCloseTimer = () => {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current);
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeMenuTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };

  const handleToggleMenu = () => {
    if (!user) return;
    clearCloseTimer();
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/");
    }
  };

  return (
    <nav className="border-b border-orange-500/20 bg-orange-600 text-white shadow transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-1xl font-bold">
          Temple Darshan Booking
        </div>

        {/* Left Menu */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : ""
            }
          >
            Home
          </NavLink>
        </div>

        {/* Right Menu */}
        {!user ? (
          <div className="flex items-center gap-5">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">

            {/* Notification Bell */}
            <NotificationBell />

            {/* Profile Menu */}
            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={handleToggleMenu}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold">
                    {user.name}
                  </p>
                </div>

                <FiChevronDown
                  className={`transition-transform ${open ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white text-gray-800 shadow-xl z-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={scheduleClose}
                >

                  {/* User Info */}
                  <div className="border-b border-slate-200 bg-gray-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-700">
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500 dark:text-slate-300">
                      {user.email}
                    </p>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiUser />
                    Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiHome />
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/my-bookings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiCalendar />
                    My Bookings
                  </NavLink>

                  <NavLink
                    to="/change-password"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiLock />
                    Change Password
                  </NavLink>

                  <NavLink
                    to="/feedback"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiMessageSquare />
                    Feedback
                  </NavLink>

                  <NavLink
                    to="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiSettings />
                    Settings
                  </NavLink>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-orange-600 transition-colors hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-slate-700"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;