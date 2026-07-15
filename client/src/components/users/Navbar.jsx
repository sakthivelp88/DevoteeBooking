import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../notification/NotificationBell";

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

  const activeClass = "font-semibold border-b-2 border-white pb-1";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // cleanup method
    };
  }, []);

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/");
    }
  };

  return (
    <nav className="bg-orange-600 text-white shadow">
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
            >
              <button
                onClick={() => setOpen(!open)}
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
                <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50">

                  {/* User Info */}
                  <div className="px-4 py-4 bg-gray-50 border-b">
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiUser />
                    Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiHome />
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/my-bookings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiCalendar />
                    My Bookings
                  </NavLink>

                  <NavLink
                    to="/change-password"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiLock />
                    Change Password
                  </NavLink>

                  <NavLink
                    to="/feedback"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiMessageSquare />
                    Feedback
                  </NavLink>

                  <NavLink
                    to="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiSettings />
                    Settings
                  </NavLink>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer"
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