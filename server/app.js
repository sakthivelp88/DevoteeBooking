import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";

//User Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import darshanTypeRoutes from "./routes/darshanTypeRoutes.js";

// User DropdownMenu Routes
import feedbackRoutes from "./routes/feedbackRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// Admin Routes
import adminRoutes from "./routes/adminRoutes.js";
import adminPaymentRoutes from "./routes/adminPaymentRoutes.js";
import adminReportRoutes from "./routes/adminReportRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminTicketVerificationRoutes from "./routes/adminTicketVerificationRoutes.js";

// Admin DropdownMenu Routes
import adminFeedbackRoutes from "./routes/adminFeedbackRoutes.js"
import adminNotificationRoutes from "./routes/adminNotificationRoutes.js";

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



