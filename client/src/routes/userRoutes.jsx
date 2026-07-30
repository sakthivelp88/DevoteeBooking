import { lazy } from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";

const Home = lazy(() => import("@/features/temples/pages/Home"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const Register = lazy(() => import("@/features/auth/pages/Register"));
const TempleDetails = lazy(() => import("@/features/temples/pages/TempleDetails"));
const Tickets = lazy(() => import("@/features/tickets/pages/Tickets"));
const BookingDetails = lazy(() => import("@/features/booking/pages/BookingDetails"));
const BookingTicket = lazy(() => import("@/features/booking/pages/BookingTicket"));
const BookingSuccess = lazy(() => import("@/features/booking/pages/BookingSuccess"));

const Profile = lazy(() => import("@/features/user/pages/Profile"));
const EditProfile = lazy(() => import("@/features/user/pages/EditProfile"));
const Dashboard = lazy(() => import("@/features/user/pages/Dashboard"));
const MyBookings = lazy(() => import("@/features/booking/pages/MyBookings"));
const ChangePassword = lazy(() => import("@/features/user/pages/ChangePassword"));
const Feedback = lazy(() => import("@/features/user/pages/Feedback"));

const Settings = lazy(() => import("@/features/user/pages/Settings"));
const Appearance = lazy(() => import("@/features/user/pages/Appearance"));
const ReminderSettings = lazy(() => import("@/features/user/pages/ReminderSettings"));
const About = lazy(() => import("@/features/user/pages/About"));

const Notifications = lazy(() => import("@/features/notifications/pages/Notifications"));
const MessageCenter = lazy(() => import("@/features/notifications/pages/MessageCenter"));
const MessageDetails = lazy(() => import("@/features/notifications/pages/MessageDetails"));

export const userRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="dashboard" path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />,
  <Route key="temple-details" path="/temples/:id" element={<ProtectedRoute><TempleDetails /></ProtectedRoute>} />,
  <Route key="tickets" path="/tickets/:templeId/:darshanTypeId" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />,
  <Route key="booking-success" path="/booking-success/:id" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />,
  <Route key="my-bookings" path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />,
  <Route key="booking" path="/booking" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />,
  <Route key="booking-ticket" path="/booking/:id" element={<ProtectedRoute><BookingTicket /></ProtectedRoute>} />,
  <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  <Route key="edit-profile" path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />,
  <Route key="change-password" path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />,
  <Route key="feedback" path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />,
  <Route key="settings" path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />,
  <Route key="settings-notifications" path="/settings/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />,
  <Route key="settings-messages" path="/settings/messages" element={<ProtectedRoute><MessageCenter /></ProtectedRoute>} />,
  <Route key="settings-message-details" path="/settings/messages/:id" element={<ProtectedRoute><MessageDetails /></ProtectedRoute>} />,
  <Route key="settings-appearance" path="/settings/appearance" element={<ProtectedRoute><Appearance /></ProtectedRoute>} />,
  <Route key="settings-reminders" path="/settings/reminders" element={<ProtectedRoute><ReminderSettings /></ProtectedRoute>} />,
  <Route key="settings-about" path="/settings/about" element={<ProtectedRoute><About /></ProtectedRoute>} />,
];

export default userRoutes;
