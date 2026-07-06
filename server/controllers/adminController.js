import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

import User from "../models/User.js";
import Temple from "../models/Temple.js";
import DarshanType from "../models/DarshanType.js";
import Ticket from "../models/Ticket.js";
import Booking from "../models/Booking.js";


/* ============================================================
                        Dashboard
============================================================ */

export const adminDashboard = async (req, res) => {
  try {
    /* ---------- Dashboard Statistics ---------- */

    const [
      totalUsers,
      totalTemples,
      totalDarshanTypes,
      totalTickets,
      totalBookings,
      paidBookings,
      pendingBookings,
    ] = await Promise.all([
      User.countDocuments(),
      Temple.countDocuments(),
      DarshanType.countDocuments(),
      Ticket.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ paymentStatus: "Paid" }),
      Booking.countDocuments({ paymentStatus: "Pending" }),
    ]);

    /* ---------- Today's Statistics ---------- */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [
      todayBookings,
      todayPayments,
      todayUsers,
      todayRevenueResult,
    ] = await Promise.all([
      Booking.countDocuments({
        createdAt: { $gte: today },
      }),

      Booking.countDocuments({
        paymentStatus: "Paid",
        createdAt: { $gte: today },
      }),

      User.countDocuments({
        createdAt: { $gte: today },
      }),

      Booking.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
            createdAt: {
              $gte: today,
            },
          },
        },
        {
          $group: {
            _id: null,
            revenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    const todayRevenue =
      todayRevenueResult[0]?.revenue || 0;

    /* ---------- Revenue ---------- */

    const revenueResult = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const revenue = revenueResult[0]?.revenue || 0;

    /* ---------- Recent Bookings ---------- */

    const recentBookings = await Booking.find()
      .populate("user", "name")
      .populate("temple", "name")
      .sort({ createdAt: -1 })
      .limit(5);
    /* ---------- Recent Payments ---------- */

    const recentPayments = await Booking.find({
      paymentStatus: "Paid",
    })
      .populate("user", "name")
      .sort({ updatedAt: -1 })
      .limit(5);

    /* ---------- Monthly Revenue ---------- */

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueChart = monthlyRevenue.map((item) => ({
      month: monthNames[item._id.month],
      revenue: item.revenue,
    }));

    /* ---------- Booking Status Distribution ---------- */

    const bookingStatusResult = await Booking.aggregate([
      {
        $group: {
          _id: "$bookingStatus",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const bookingStatusChart = bookingStatusResult.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    /* ---------- Temple-wise Bookings ---------- */

    const templeBookings = await Booking.aggregate([
      {
        $group: {
          _id: "$temple",
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "temples",
          localField: "_id",
          foreignField: "_id",
          as: "temple",
        },
      },
      {
        $unwind: "$temple",
      },
      {
        $project: {
          _id: 0,
          temple: "$temple.name",
          bookings: 1,
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
    ]);

    /* ---------- Darshan Type Popularity ---------- */

    const darshanPopularity = await Booking.aggregate([
      {
        $group: {
          _id: "$darshanType",
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "darshantypes",
          localField: "_id",
          foreignField: "_id",
          as: "darshanType",
        },
      },
      {
        $unwind: "$darshanType",
      },
      {
        $project: {
          _id: 0,
          darshanType: "$darshanType.name",
          bookings: 1,
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
    ]);

    /* ---------- Payment Status Distribution ---------- */

    const paymentStatusResult = await Booking.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const paymentStatusChart = paymentStatusResult.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    /* ---------- Low Seat Alerts ---------- */

    const lowSeatTickets = await Ticket.find({
      availableSeats: {
        $gt: 0,
        $lte: 10,
      },
    })
      .populate("temple", "name")
      .populate("darshanType", "name")
      .sort({
        availableSeats: 1,
      })
      .limit(5);

    /* ---------- Upcoming Ticket Slots ---------- */

    const upcomingTickets = await Ticket.find({
      date: {
        $gte: new Date(),
      },
    })
      .populate("temple", "name")
      .populate("darshanType", "name")
      .sort({
        date: 1,
        slotStart: 1,
      })
      .limit(5);

    /* ---------- Top Revenue Temples ---------- */

    const topRevenueTemples = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: "$temple",
          revenue: {
            $sum: "$totalAmount",
          },
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "temples",
          localField: "_id",
          foreignField: "_id",
          as: "temple",
        },
      },
      {
        $unwind: "$temple",
      },
      {
        $project: {
          _id: 0,
          temple: "$temple.name",
          revenue: 1,
          bookings: 1,
        },
      },
      {
        $sort: {
          revenue: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    /* ---------- Recent Registered Users ---------- */

    const recentUsers = await User.find()
      .select("name email createdAt")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    /* ---------- Recent System Activity ---------- */

    const bookingActivities = recentBookings.map((booking) => ({
      type: "Booking",
      title: `Booking ${booking.bookingNumber}`,
      description: `${booking.user?.name} booked ${booking.temple?.name}`,
      createdAt: booking.createdAt,
    }));

    const userActivities = recentUsers.map((user) => ({
      type: "User",
      title: "New User Registered",
      description: `${user.name} joined the system`,
      createdAt: user.createdAt,
    }));

    const recentActivity = [
      ...bookingActivities,
      ...userActivities,
    ].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 8);

    /* ---------- Response ---------- */

    res.json({
      cards: {
        totalUsers,
        totalTemples,
        totalDarshanTypes,
        totalTickets,
        totalBookings,
        revenue,
        paidBookings,
        pendingBookings,
      },

      todayStats: {
        bookings: todayBookings,
        revenue: todayRevenue,
        payments: todayPayments,
        users: todayUsers,
      },

      recentBookings,
      recentPayments,
      revenueChart,
      bookingStatusChart,
      templeBookings,
      darshanPopularity,
      paymentStatusChart,
      lowSeatTickets,
      upcomingTickets,
      topRevenueTemples,
      recentUsers,
      recentActivity,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================================================
                    Booking Management
============================================================ */

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("ticket");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================================================
                        Profile
============================================================ */

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    user.name = name;
    user.phone = phone;

    await user.save();

    req.session.user = {
      ...req.session.user,
      name: user.name,
      phone: user.phone,
    };

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
                    Change Password
============================================================ */

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
                    Profile Photo
============================================================ */

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (user.profileImage) {
      const oldImagePath = path.join(
        process.cwd(),
        user.profileImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    user.profileImage = `/uploads/profile/${req.file.filename}`;

    await user.save();

    req.session.user = {
      ...req.session.user,
      profileImage: user.profileImage,
    };

    res.json({
      success: true,
      message: "Profile photo uploaded successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (user.profileImage) {
      const imagePath = path.join(
        process.cwd(),
        user.profileImage
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    user.profileImage = "";

    await user.save();

    req.session.user = {
      ...req.session.user,
      profileImage: "",
    };

    res.json({
      success: true,
      message: "Profile photo removed successfully.",
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};