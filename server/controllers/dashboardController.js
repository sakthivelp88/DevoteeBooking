import Booking from "../models/Booking.js";

export const userDashboard =
  async (req, res) => {

  try {

    const bookings =
      await Booking.find({
        userId: req.session.user.id,
      });

    const totalBookings =
      bookings.length;

    const totalSpent =
      bookings.reduce(
        (sum, booking) =>
          sum + booking.amount,
        0
      );

    res.json({
      user: req.session.user,
      totalBookings,
      totalSpent,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};