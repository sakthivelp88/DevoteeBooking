import { lazy } from "react";
import { Route } from "react-router-dom";

const AdminDashboard = lazy(() => import("@/features/admin/pages/AdminDashboard"));
const AdminTemples = lazy(() => import("@/features/admin/pages/AdminTemples"));
const AdminDarshanTypes = lazy(() => import("@/features/admin/pages/AdminDarshanTypes"));
const AdminTicketSlots = lazy(() => import("@/features/admin/pages/AdminTicketSlots"));
const AdminBookings = lazy(() => import("@/features/admin/pages/AdminBookings"));
const AdminCreateTicket = lazy(() => import("@/features/admin/pages/AdminCreateTicket"));
const AdminBookingDetails = lazy(() => import("@/features/admin/pages/AdminBookingDetails"));
const PaymentManagement = lazy(() => import("@/features/admin/pages/PaymentManagement"));
const ReportsAnalytics = lazy(() => import("@/features/admin/pages/AdminReportsAnalytics"));
const UserManagement = lazy(() => import("@/features/admin/pages/UserManagement"));
const AdminTicketScanner = lazy(() => import("@/features/admin/pages/AdminTicketScanner"));
const AdminProfile = lazy(() => import("@/features/admin/pages/AdminProfile"));
const AdminChangePassword = lazy(() => import("@/features/admin/pages/AdminChangePassword"));
const AdminFeedback = lazy(() => import("@/features/admin/pages/AdminFeedback"));
const AdminSettings = lazy(() => import("@/features/admin/pages/AdminSettings"));
const AdminAppearanceSettings = lazy(() => import("@/features/admin/pages/AdminAppearanceSettings"));
const AdminReminderSettings = lazy(() => import("@/features/admin/pages/AdminReminderSettings"));
const AdminAboutSettings = lazy(() => import("@/features/admin/pages/AdminAboutSettings"));
const AdminNotificationSettings = lazy(() => import("@/features/admin/pages/AdminNotificationSettings"));
const AdminNotificationManagement = lazy(() => import("@/features/admin/pages/AdminNotificationManagement"));
const AdminNotificationForm = lazy(() => import("@/features/admin/pages/AdminNotificationForm"));
const AdminNotificationDetails = lazy(() => import("@/features/admin/pages/AdminNotificationDetails"));

export const adminRoutes = [
  <Route key="admin-dashboard" index element={<AdminDashboard />} />,
  <Route key="admin-temples" path="temples" element={<AdminTemples />} />,
  <Route key="admin-darshan" path="darshan-types" element={<AdminDarshanTypes />} />,
  <Route key="admin-ticket-slots" path="ticket-slots" element={<AdminTicketSlots />} />,
  <Route key="admin-create-ticket" path="ticket-slots/create" element={<AdminCreateTicket />} />,
  <Route key="admin-edit-ticket" path="ticket-slots/edit/:id" element={<AdminCreateTicket />} />,
  <Route key="admin-bookings" path="bookings" element={<AdminBookings />} />,
  <Route key="admin-booking-details" path="bookings/:id" element={<AdminBookingDetails />} />,
  <Route key="admin-payments" path="payments" element={<PaymentManagement />} />,
  <Route key="admin-reports" path="reports" element={<ReportsAnalytics />} />,
  <Route key="admin-users" path="users" element={<UserManagement />} />,
  <Route key="admin-feedback" path="feedback" element={<AdminFeedback />} />,
  <Route key="admin-scanner" path="scanner" element={<AdminTicketScanner />} />,
  <Route key="admin-profile" path="profile" element={<AdminProfile />} />,
  <Route key="admin-change-password" path="change-password" element={<AdminChangePassword />} />,
  <Route key="admin-settings" path="settings" element={<AdminSettings />} />,
  <Route key="admin-notification-settings" path="settings/notifications" element={<AdminNotificationSettings />} />,
  <Route key="admin-appearance-settings" path="settings/appearance" element={<AdminAppearanceSettings />} />,
  <Route key="admin-reminder-settings" path="settings/reminders" element={<AdminReminderSettings />} />,
  <Route key="admin-about-settings" path="settings/about" element={<AdminAboutSettings />} />,
  <Route key="admin-notification-manage" path="settings/notifications/manage" element={<AdminNotificationManagement />} />,
  <Route key="admin-notification-create" path="settings/notifications/create" element={<AdminNotificationForm />} />,
  <Route key="admin-notification-edit" path="settings/notifications/edit/:id" element={<AdminNotificationForm />} />,
  <Route key="admin-notification-details" path="settings/notifications/:id" element={<AdminNotificationDetails />} />,
];

export default adminRoutes;
