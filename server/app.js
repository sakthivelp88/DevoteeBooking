import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import 'module-alias/register';

//User Routes
import authRoutes from "./routes/user/authRoutes.js";
import userRoutes from "./routes/user/userRoutes.js";
import ticketRoutes from "./routes/user/ticketRoutes.js";
import bookingRoutes from "./routes/user/bookingRoutes.js";
import paymentRoutes from "./routes/user/paymentRoutes.js";
import dashboardRoutes from "./routes/user/dashboardRoutes.js";
import templeRoutes from "./routes/user/templeRoutes.js";
import darshanTypeRoutes from "./routes/user/darshanTypeRoutes.js";

// User DropdownMenu Routes
import feedbackRoutes from "./routes/user/feedbackRoutes.js";
import notificationRoutes from "./routes/user/notificationRoutes.js";

// Admin Routes
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminPaymentRoutes from "./routes/admin/adminPaymentRoutes.js";
import adminReportRoutes from "./routes/admin/adminReportRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminTicketVerificationRoutes from "./routes/admin/adminTicketVerificationRoutes.js";

// Admin DropdownMenu Routes
import adminFeedbackRoutes from "./routes/admin/adminFeedbackRoutes.js"
import adminNotificationRoutes from "./routes/admin/adminNotificationRoutes.js";

const app = express();

app.use(express.json());

// Cors Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Session-Cookie Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//  Admin Middleware
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);
app.use("/api/admin/reports", adminReportRoutes);
app.use("/api/admin/bookings", adminTicketVerificationRoutes);
app.use("/api/admin/feedback", adminFeedbackRoutes);
app.use("/api/admin/notifications", adminNotificationRoutes);

// User Middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/darshan-types", darshanTypeRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);

// Image Uploads Middleware
app.use("/uploads", express.static("uploads"));

export default app;



