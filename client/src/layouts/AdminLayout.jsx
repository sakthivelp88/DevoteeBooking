import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiBookOpen,
  FiCreditCard,
  FiBarChart2,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiLock,
  FiMessageSquare,
} from "react-icons/fi";

import { FaPlaceOfWorship } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);


  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/login");
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <FiHome size={18} />,
      end: true,
    },
    {
      label: "Temple Management",
      path: "/admin/temples",
      icon: <FaPlaceOfWorship size={18} />,
    },
    {
      label: "Darshan Types",
      path: "/admin/darshan-types",
      icon: <FiGrid size={18} />,
    },
    {
      label: "Ticket Slots",
      path: "/admin/ticket-slots",
      icon: <FiCalendar size={18} />,
    },
    {
      label: "Booking Management",
      path: "/admin/bookings",
      icon: <FiBookOpen size={18} />,
    },
    {
      label: "Payment Management",
      path: "/admin/payments",
      icon: <FiCreditCard size={18} />,
    },
    {
      label: "Reports & Analytics",
      path: "/admin/reports",
      icon: <FiBarChart2 size={18} />,
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <FiUsers size={18} />,
    },

    {
      label: "Feedback Management",
      path: "/admin/feedback",
      icon: <FiMessageSquare size={18} />,
    },

    {
      label: "Ticket Scanner",
      path: "/admin/scanner",
      icon: <BsQrCodeScan size={18} />,
    }
  ];

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/temples": "Temple Management",
    "/admin/darshan-types": "Darshan Types",
    "/admin/ticket-slots": "Ticket Slots",
    "/admin/bookings": "Booking Management",
    "/admin/payments": "Payment Management",
    "/admin/reports": "Reports & Analytics",
    "/admin/users": "User Management",
    "/admin/profile": "Profile",
    "/admin/change-password": "Change Password",
    "/admin/settings": "Settings",
    "/admin/feedback": "Feedback Management",
    "/admin/scanner": "Ticket Scanner",
  };

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  const breadcrumb =
    currentPage === "Dashboard"
      ? "Dashboard"
      : `Dashboard > ${currentPage}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 text-white shadow-2xl">

        {/* Logo */}
        <div className="border-b border-slate-800 px-6 py-8">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <FaPlaceOfWorship className="text-orange-400" />
            <span>Temple Admin</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded 
              scrollbar-thumb-orange-400 scrollbar-track-transparent space-y-1 px-4 py-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-orange-300"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* Main Section */}
      <div className="ml-72 flex flex-1 flex-col bg-slate-100">

        {/* Topbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-orange-500 bg-orange-600 px-8 py-5 text-white shadow-lg backdrop-blur">

          <div>
            <p className="text-sm text-orange-100">
              {breadcrumb}
            </p>

            <h2 className="text-2xl font-bold">
              {currentPage}
            </h2>
          </div>

          <div
            ref={profileMenuRef}
            className="relative"
          >
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 rounded-xl border border-orange-400/30 bg-orange-500/20 px-4 py-2 transition-all duration-300 hover:bg-orange-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <FiUser size={20} />
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold">
                  {user?.name}
                </p>

                <p className="text-xs text-orange-100">
                  Administrator
                </p>
              </div>

              <FiChevronDown
                size={18}
                className={`transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                {/* User Info */}
                <div className="border-b bg-gray-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
                      <FiUser size={24} />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {user?.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="py-2">

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/admin/profile");
                    }}
                    className="flex w-full items-center gap-3 px-5 py-1 text-md font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    <FiUser size={18} />
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/admin/change-password");
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-md font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    <FiLock size={18} />
                    Change Password
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/admin/settings");
                    }}
                    className="flex w-full items-center gap-3 px-5 py-2 text-md font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    <FiSettings size={18} />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-md font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>

              </div>
            )}
          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}