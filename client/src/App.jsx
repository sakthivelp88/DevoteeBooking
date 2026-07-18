import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts Routes
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Auth Routes
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";

// User Pages Routes
import Home from "@/pages/user/Home";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import TempleDetails from "@/pages/user/TempleDetails";
import Tickets from "@/pages/user/Tickets";
import BookingDetails from "@/pages/user/BookingDetails";
import BookingTicket from "@/pages/user/BookingTicket";
import BookingSuccess from "@/pages/user/BookingSuccess";

// User Profile Routes
import Profile from "@/pages/user/dropdownMenu/profile/Profile";
import EditProfile from "@/pages/user/dropdownMenu/profile/EditProfile";
import Dashboard from "@/pages/user/dropdownMenu/Dashboard";
import MyBookings from "@/pages/user/dropdownMenu/MyBookings"
import ChangePassword from "@/pages/user/dropdownMenu/ChangePassword";
import Feedback from "@/pages/user/dropdownMenu/Feedback";

// User Settings Routes
import Settings from "@/pages/user/dropdownMenu/settings/Settings";
import Notifications from "@/pages/user/dropdownMenu/settings/Notifications";
import Appearance from "@/pages/user/dropdownMenu/settings/Appearance";
import ReminderSettings from "@/pages/user/dropdownMenu/settings/ReminderSettings";
import About from "@/pages/user/dropdownMenu/settings/About";

import MessageCenter from "@/pages/user/dropdownMenu/settings/notifications/MessageCenter";
import MessageDetails from "@/pages/user/dropdownMenu/settings/notifications/MessageDetails";

// Admin Pages Routes
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminTemples from "@/pages/admin/AdminTemples";
import AdminDarshanTypes from "@/pages/admin/AdminDarshanTypes";
import AdminTicketSlots from "@/pages/admin/AdminTicketSlots";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminCreateTicket from "@/pages/admin/AdminCreateTicket";
import AdminBookingDetails from "@/pages/admin/AdminBookingDetails";
import PaymentManagement from "@/pages/admin/PaymentManagement";
import ReportsAnalytics from "@/pages/admin/AdminReportsAnalytics";
import UserManagement from "@/pages/admin/UserManagement";
import AdminTicketScanner from "@/pages/admin/AdminTicketScanner";

// Admin Profile Routes
import AdminProfile from "@/pages/admin/dropdownMenu/profile/Profile";
import AdminChangePassword from "@/pages/admin/dropdownMenu/ChangePassword";

// Admin Feedback Routes
import AdminFeedback from "@/pages/admin/AdminFeedback";

// Admin Settings Routes
import AdminSettings from "@/pages/admin/dropdownMenu/settings/AdminSettings";

import AdminAppearanceSettings from "@/pages/admin/dropdownMenu/settings/appearance/AppearanceSettings";
import AdminReminderSettings from "@/pages/admin/dropdownMenu/settings/reminder/ReminderSettings";
import AdminAboutSettings from "@/pages/admin/dropdownMenu/settings/about/AboutSettings";

// Under AdminNotification Settings
import AdminNotificationSettings from "@/pages/admin/dropdownMenu/settings/notification/NotificationSettings";
import AdminNotificationManagement from "@/pages/admin/dropdownMenu/settings/notification/NotificationManagement";
import AdminNotificationForm from "@/pages/admin/dropdownMenu/settings/notification/NotificationForm";
import AdminNotificationDetails from "@/pages/admin/dropdownMenu/settings/notification/NotificationDetails";

function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* ================= USER LAYOUT ================= */}

        <Route element={<UserLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />}
          />
          <Route path="/login" element={<Login />}
          />
          <Route path="/register" element={<Register />}
          />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/temples/:id" element={
            <ProtectedRoute>
              <TempleDetails />
            </ProtectedRoute>
          }
          />
          <Route path="/tickets/:templeId/:darshanTypeId" element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
          />
          <Route path="/booking-success/:id" element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
          />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
          />
          <Route path="/booking" element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
          />
          <Route path="/booking/:id" element={
            <ProtectedRoute>
              <BookingTicket />
            </ProtectedRoute>
          }
          />

          {/* ================= USER DROPDOWN ================= */}

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          />
          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
          />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
          />
          <Route path="/feedback" element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
          />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/messages" element={
            <ProtectedRoute>
              <MessageCenter />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/messages/:id" element={
            <ProtectedRoute>
              <MessageDetails />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/appearance" element={
            <ProtectedRoute>
              <Appearance />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/reminders" element={
            <ProtectedRoute>
              <ReminderSettings />
            </ProtectedRoute>
          }
          />
          <Route path="/settings/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
          />

        </Route>

        {/* ================= ADMIN LAYOUT ================= */}

        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
        >
          <Route index element={<AdminDashboard />}
          />
          <Route path="temples" element={<AdminTemples />}
          />
          <Route path="darshan-types" element={<AdminDarshanTypes />}
          />
          <Route path="ticket-slots" element={<AdminTicketSlots />}
          />
          <Route path="ticket-slots/create" element={<AdminCreateTicket />}
          />
          <Route path="ticket-slots/edit/:id" element={<AdminCreateTicket />}
          />
          <Route path="bookings" element={<AdminBookings />}
          />
          <Route path="bookings/:id" element={<AdminBookingDetails />}
          />
          <Route path="payments" element={<PaymentManagement />}
          />
          <Route path="reports" element={<ReportsAnalytics />}
          />
          <Route path="users" element={<UserManagement />}
          />
          <Route path="feedback" element={<AdminFeedback />}
          />
          <Route path="scanner" element={<AdminTicketScanner />}
          />

          {/* ================= ADMIN DROPDOWN ================= */}

          <Route path="profile" element={<AdminProfile />}
          />
          <Route path="change-password" element={<AdminChangePassword />}
          />
          <Route path="settings" element={<AdminSettings />}
          />
          <Route path="settings/notifications" element={<AdminNotificationSettings />}
          />
          <Route path="settings/appearance" element={<AdminAppearanceSettings />}
          />
          <Route path="settings/reminders" element={<AdminReminderSettings />}
          />
          <Route path="settings/about" element={<AdminAboutSettings />}
          />
          
          // Under AdminNotification Settings
          <Route path="settings/notifications/manage" element={<AdminNotificationManagement />}
          />
          <Route path="settings/notifications/create" element={<AdminNotificationForm />}
          />
          <Route path="settings/notifications/edit/:id" element={<AdminNotificationForm />}
          />
          <Route path="settings/notifications/:id" element={<AdminNotificationDetails />}
          />

        </Route>

        {/* ================= 404 PAGE ================= */}

        <Route path="*" element={
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