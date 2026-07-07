import Booking from "../models/Booking.js";

// Logged-in user's bookings
export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.session.user.id,
    })
      .populate("temple", "name")
      .populate("darshanType", "name fee")
      .populate("ticket")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully.",
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logged-in user's booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.session.user.id,
    })
      .populate("temple")
      .populate("darshanType")
      .populate("ticket");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};