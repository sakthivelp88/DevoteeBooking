import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";

//User Routes
import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/users/user.routes.js";
import ticketRoutes from "./src/modules/tickets/ticket.routes.js";
import bookingRoutes from "./src/modules/bookings/booking.routes.js";
import paymentRoutes from "./src/modules/payments/payment.routes.js";
import dashboardRoutes from "./src/modules/dashboard/dashboard.routes.js";
import templeRoutes from "./src/modules/temples/temple.routes.js";
import darshanTypeRoutes from "./src/modules/darshan-types/darshan-type.routes.js";

// User DropdownMenu Routes
import feedbackRoutes from "./src/modules/feedback/feedback.routes.js";
import notificationRoutes from "./src/modules/notifications/notification.routes.js";
import appearanceRoutes from "./src/modules/appearance/appearance.routes.js";

// Admin Routes
import adminRoutes from "./src/modules/admin/admin.routes.js";
import adminPaymentRoutes from "./src/modules/admin/adminPayment.routes.js";
import adminReportRoutes from "./src/modules/admin/adminReport.routes.js";
import adminUserRoutes from "./src/modules/admin/adminUser.routes.js";
import adminTicketVerificationRoutes from "./src/modules/admin/adminTicketVerification.routes.js";

// Admin DropdownMenu Routes
import adminFeedbackRoutes from "./src/modules/admin/adminFeedback.routes.js"
import adminNotificationRoutes from "./src/modules/admin/adminNotification.routes.js";
import adminAppearanceRoutes from "./src/modules/admin/adminAppearance.routes.js";

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
const SESSION_IDLE_TIMEOUT =
  Number(process.env.SESSION_IDLE_TIMEOUT_MS) ||
  60 * 60 * 1000; // 1 hour by default

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: SESSION_IDLE_TIMEOUT / 1000,
    }),
    name: "connect.sid",
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_IDLE_TIMEOUT,
    },
  })
);

app.use((req, res, next) => {
  if (req.session) {
    const now = Date.now();
    const lastActivity = req.session.lastActivity || now;

    if (now - lastActivity > SESSION_IDLE_TIMEOUT) {
      return req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
        });
        next();
      });
    }

    req.session.lastActivity = now;
  }

  next();
});

//  Admin Middleware
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);
app.use("/api/admin/reports", adminReportRoutes);
app.use("/api/admin/bookings", adminTicketVerificationRoutes);
app.use("/api/admin/feedback", adminFeedbackRoutes);
app.use("/api/admin/notifications", adminNotificationRoutes);
app.use("/api/admin/settings", adminAppearanceRoutes);

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
app.use("/api/user/settings", appearanceRoutes);

// Image Uploads Middleware
app.use("/uploads", express.static("uploads"));

export default app;



