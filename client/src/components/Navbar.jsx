import { Link, useNavigate, } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      const success = await logout();

      if (success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-orange-600 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Temple Booking
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/temples">Temples</Link>

          {user && (
            <Link to="/my-bookings">
              My Bookings
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full p-2 transition hover:bg-orange-700"
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