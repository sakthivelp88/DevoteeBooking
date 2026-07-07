import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// User Pages
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import TempleDetails from "./pages/user/TempleDetails";
import Tickets from "./pages/user/Tickets";
import MyBookings from "./pages/user/MyBookings";
import BookingDetails from "./pages/user/BookingDetails";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTemples from "./pages/admin/AdminTemples";
import AdminDarshanTypes from "./pages/admin/AdminDarshanTypes";
import AdminTicketSlots from "./pages/admin/AdminTicketSlots";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCreateTicket from "./pages/admin/AdminCreateTicket";
import AdminBookingDetails from "./pages/admin/AdminBookingDetails";
import Profile from "./pages/admin/profile/Profile";
import ChangePassword from "./pages/admin/profile/ChangePassword";
import Settings from "./pages/admin/profile/Settings";
import PaymentManagement from "./pages/admin/PaymentManagement";
import ReportsAnalytics from "./pages/admin/AdminReportsAnalytics";
import UserManagement from "./pages/admin/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>

        {/* ================= USER LAYOUT ================= */}
        <Route element={<UserLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/temples/:id"
            element={
              <ProtectedRoute>
                <TempleDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/:templeId/:darshanTypeId"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* ================= ADMIN LAYOUT ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route
            path="temples"
            element={<AdminTemples />}
          />

          <Route
            path="darshan-types"
            element={<AdminDarshanTypes />}
          />

          <Route
            path="ticket-slots"
            element={<AdminTicketSlots />}
          />

          <Route
            path="ticket-slots/create"
            element={<AdminCreateTicket />}
          />

          <Route
            path="ticket-slots/edit/:id"
            element={<AdminCreateTicket />}
          />

          <Route
            path="bookings"
            element={<AdminBookings />}
          />

          <Route
            path="bookings/:id"
            element={<AdminBookingDetails />}
          />

          <Route
            path="payments"
            element={<PaymentManagement />}
          />

          <Route
            path="reports"
            element={<ReportsAnalytics />}
          />

          <Route path="users" element={<UserManagement />} />

          {/* ================= ADMIN DROPDOWN ================= */}
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="settings" element={<Settings />} />

        </Route>

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-4xl font-bold text-red-600">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;