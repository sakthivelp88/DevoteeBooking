import User from "#models/User.js";
import Temple from "#models/Temple.js";
import DarshanType from "#models/DarshanType.js";
import Ticket from "#models/Ticket.js";
import Booking from "#models/Booking.js";


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