import Booking from "#models/Booking.js";
import User from "#models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const user = await User.findById(userId).select(
      "name profileImage email"
    );

    const bookings = await Booking.find({ user: userId })
      .populate("temple", "name image city state slug")
      .populate("ticket", "date slotStart slotEnd")
      .sort({ createdAt: -1 });

    const validBookings = bookings.filter(
      (booking) => booking.ticket && booking.temple
    );

    const stats = {
      totalBookings: validBookings.length,

      confirmed: validBookings.filter(
        (booking) => booking.bookingStatus === "Confirmed"
      ).length,

      completed: validBookings.filter(
        (booking) => booking.bookingStatus === "Completed"
      ).length,

      cancelled: validBookings.filter(
        (booking) => booking.bookingStatus === "Cancelled"
      ).length,

      totalAmountPaid: validBookings
        .filter((booking) => booking.paymentStatus === "Paid")
        .reduce((sum, booking) => sum + booking.totalAmount, 0),
    };

    const nextBooking =
      validBookings.find(
        (booking) =>
          booking.bookingStatus === "Confirmed" &&
          !booking.isVisited
      ) || null;

    res.status(200).json({
      success: true,
      user,
      stats,
      nextBooking,
      recentBookings: validBookings.slice(0, 5),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};