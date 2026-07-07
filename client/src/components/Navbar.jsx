import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/login");
    }
  };

  const activeClass =
    "font-semibold border-b-2 border-white pb-1";

  return (
    <nav className="bg-orange-600 text-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-2xl font-bold select-none">
          Temple Booking
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : ""
            }
          >
            Home
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  isActive ? activeClass : ""
                }
              >
                My Bookings
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeClass : ""
                }
              >
                Dashboard
              </NavLink>
            </>
          )}

        </div>

        {/* User */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/register">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="font-medium">
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full p-2 hover:bg-orange-700 transition"
                title="Logout"
              >
                <FiLogOut size={22} />
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;