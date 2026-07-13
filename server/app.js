import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

//User Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import darshanTypeRoutes from "./routes/darshanTypeRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

//Admin Routes
import adminRoutes from "./routes/adminRoutes.js";
import adminPaymentRoutes from "./routes/adminPaymentRoutes.js";
import adminReportRoutes from "./routes/adminReportRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminFeedbackRoutes from "./routes/adminFeedbackRoutes.js"
import adminTicketVerificationRoutes from "./routes/adminTicketVerificationRoutes.js";


const app = express();

import path from "path";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
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

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tickets", ticketRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin/payments", adminPaymentRoutes);

app.use("/api/admin/reports", adminReportRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/temples", templeRoutes);

app.use("/api/darshan-types", darshanTypeRoutes);

app.use("/api/admin/users", adminUserRoutes);

app.use("/api/admin/bookings", adminTicketVerificationRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/feedback", feedbackRoutes);

app.use("/api/feedback/admin", adminFeedbackRoutes);



export default app;



